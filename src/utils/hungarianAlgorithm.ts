
interface Assignment {
  resource: number;
  task: number;
  cost: number;
}

interface IntermediateMatrix {
  matrix: number[][];
  description: string;
  selectedCells?: [number, number][];
}

interface Solution {
  assignments: Assignment[];
  totalCost: number;
  steps: string[];
  intermediateMatrices: IntermediateMatrix[];
}

export function solveHungarian(matrix: number[][], objective: 'minimize' | 'maximize'): Solution {
  const steps: string[] = [];
  const intermediateMatrices: IntermediateMatrix[] = [];
  let workingMatrix = matrix.map(row => [...row]);
  const n = matrix.length;

  console.log('Matriz original:', matrix);

  // Add original matrix
  intermediateMatrices.push({
    matrix: matrix.map(row => [...row]),
    description: 'Matriz Original'
  });

  // Step 1: Convert maximization to minimization if needed
  if (objective === 'maximize') {
    const maxValue = Math.max(...matrix.flat());
    workingMatrix = matrix.map(row => row.map(value => maxValue - value));
    steps.push(`Paso 1: Convertir problema de maximización a minimización restando cada elemento del valor máximo (${maxValue})`);
    console.log('Matriz después de conversión:', workingMatrix);
    
    intermediateMatrices.push({
      matrix: workingMatrix.map(row => [...row]),
      description: `Paso 1: Matriz convertida (máximo ${maxValue} - cada elemento)`
    });
  } else {
    steps.push('Paso 1: Problema de minimización - usar matriz original');
  }

  // Step 2: Subtract row minimums
  const rowMins = workingMatrix.map(row => Math.min(...row));
  const rowMinCells: [number, number][] = [];
  
  // Find cells with row minimums
  workingMatrix.forEach((row, i) => {
    const minVal = rowMins[i];
    const minIndex = row.findIndex(val => val === minVal);
    if (minIndex !== -1) {
      rowMinCells.push([i, minIndex]);
    }
  });

  workingMatrix = workingMatrix.map((row, i) => row.map(val => val - rowMins[i]));
  steps.push(`Paso 2: Restar el mínimo de cada fila. Mínimos: [${rowMins.join(', ')}]`);
  console.log('Matriz después de restar mínimos de filas:', workingMatrix);

  intermediateMatrices.push({
    matrix: workingMatrix.map(row => [...row]),
    description: `Paso 2: Después de restar mínimos de filas`,
    selectedCells: rowMinCells
  });

  // Step 3: Subtract column minimums
  const colMins = Array(n).fill(0).map((_, j) => 
    Math.min(...workingMatrix.map(row => row[j]))
  );
  
  const colMinCells: [number, number][] = [];
  
  // Find cells with column minimums
  colMins.forEach((minVal, j) => {
    const rowIndex = workingMatrix.findIndex(row => row[j] === minVal);
    if (rowIndex !== -1) {
      colMinCells.push([rowIndex, j]);
    }
  });

  workingMatrix = workingMatrix.map(row => 
    row.map((val, j) => val - colMins[j])
  );
  steps.push(`Paso 3: Restar el mínimo de cada columna. Mínimos: [${colMins.join(', ')}]`);
  console.log('Matriz después de restar mínimos de columnas:', workingMatrix);

  intermediateMatrices.push({
    matrix: workingMatrix.map(row => [...row]),
    description: `Paso 3: Después de restar mínimos de columnas`,
    selectedCells: colMinCells
  });

  // Step 4: Find optimal assignment using proper Hungarian method
  const assignment = findOptimalAssignmentImproved(workingMatrix, steps, intermediateMatrices);
  console.log('Asignación encontrada:', assignment);

  // Verify the assignment is valid
  const isValidAssignment = verifyAssignment(assignment, n);
  if (!isValidAssignment) {
    console.error('Asignación inválida detectada');
    steps.push('ERROR: Asignación inválida - reintentando con método alternativo');
    // Fallback to greedy approach for safety
    const fallbackAssignment = findGreedyAssignment(workingMatrix);
    return createSolution(fallbackAssignment, matrix, steps, objective, intermediateMatrices);
  }

  // Calculate total cost using original matrix
  const assignments: Assignment[] = assignment.map(([row, col]) => ({
    resource: row,
    task: col,
    cost: matrix[row][col]
  }));

  const totalCost = assignments.reduce((sum, assignment) => sum + assignment.cost, 0);
  console.log('Costo total calculado:', totalCost);

  steps.push(`Paso final: Costo total calculado usando matriz original: ${totalCost}`);
  steps.push(`Verificación: Asignación válida - cada recurso asignado a exactamente una tarea`);

  return {
    assignments,
    totalCost,
    steps,
    intermediateMatrices
  };
}

function createSolution(assignment: [number, number][], originalMatrix: number[][], steps: string[], objective: 'minimize' | 'maximize', intermediateMatrices: IntermediateMatrix[]) {
  const assignments: Assignment[] = assignment.map(([row, col]) => ({
    resource: row,
    task: col,
    cost: originalMatrix[row][col]
  }));

  const totalCost = assignments.reduce((sum, assignment) => sum + assignment.cost, 0);

  return {
    assignments,
    totalCost,
    steps,
    intermediateMatrices
  };
}

function findOptimalAssignmentImproved(matrix: number[][], steps: string[], intermediateMatrices: IntermediateMatrix[]): [number, number][] {
  const n = matrix.length;
  let iteration = 0;
  const maxIterations = 10;

  while (iteration < maxIterations) {
    iteration++;
    console.log(`Iteración ${iteration}:`);
    
    // Try to find a complete assignment with current zeros
    const assignment = findAssignmentFromZeros(matrix);
    console.log(`Asignación encontrada en iteración ${iteration}:`, assignment);
    
    if (assignment.length === n) {
      steps.push(`Paso 4.${iteration}: Asignación completa encontrada después de ${iteration} iteración(es)`);
      
      // Add final matrix with assignments
      const assignmentCells = assignment.map(([r, c]) => [r, c] as [number, number]);
      intermediateMatrices.push({
        matrix: matrix.map(row => [...row]),
        description: `Paso 4.${iteration}: Asignación óptima encontrada`,
        selectedCells: assignmentCells
      });
      
      return assignment;
    }

    // If not complete, we need to create more zeros
    steps.push(`Paso 4.${iteration}: Asignación incompleta (${assignment.length}/${n}), creando más ceros`);
    
    // Find minimum lines to cover all zeros
    const { coveredRows, coveredCols } = findMinimumLinesCover(matrix);
    console.log('Líneas de cobertura:', { coveredRows, coveredCols });
    
    const totalLines = coveredRows.filter(Boolean).length + coveredCols.filter(Boolean).length;
    
    if (totalLines === n) {
      // We have optimal assignment but need to extract it properly
      const optimalAssignment = extractOptimalAssignment(matrix, coveredRows, coveredCols);
      if (optimalAssignment.length === n) {
        steps.push(`Paso 4.${iteration}: Asignación óptima extraída usando ${totalLines} líneas de cobertura`);
        
        const assignmentCells = optimalAssignment.map(([r, c]) => [r, c] as [number, number]);
        intermediateMatrices.push({
          matrix: matrix.map(row => [...row]),
          description: `Paso 4.${iteration}: Asignación óptima con ${totalLines} líneas de cobertura`,
          selectedCells: assignmentCells
        });
        
        return optimalAssignment;
      }
    }

    // Find minimum uncovered element
    let minUncovered = Infinity;
    const uncoveredCells: [number, number][] = [];
    
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        if (!coveredRows[i] && !coveredCols[j]) {
          if (matrix[i][j] < minUncovered) {
            minUncovered = matrix[i][j];
            uncoveredCells.length = 0;
            uncoveredCells.push([i, j]);
          } else if (matrix[i][j] === minUncovered) {
            uncoveredCells.push([i, j]);
          }
        }
      }
    }

    if (minUncovered === Infinity) {
      console.log('No hay elementos descubiertos, terminando');
      break;
    }

    console.log('Elemento mínimo descubierto:', minUncovered);

    // Add intermediate matrix before adjustment
    intermediateMatrices.push({
      matrix: matrix.map(row => [...row]),
      description: `Paso 4.${iteration}: Antes del ajuste (elemento mínimo descubierto: ${minUncovered})`,
      selectedCells: uncoveredCells
    });

    // Adjust matrix: subtract from uncovered, add to doubly covered
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        if (!coveredRows[i] && !coveredCols[j]) {
          matrix[i][j] -= minUncovered;
        } else if (coveredRows[i] && coveredCols[j]) {
          matrix[i][j] += minUncovered;
        }
      }
    }

    console.log('Matriz ajustada:', matrix.map(row => [...row]));
    
    // Add matrix after adjustment
    intermediateMatrices.push({
      matrix: matrix.map(row => [...row]),
      description: `Paso 4.${iteration}: Después del ajuste de matriz`
    });
  }

  // Fallback: return best assignment found
  const finalAssignment = findAssignmentFromZeros(matrix);
  console.log('Asignación final (fallback):', finalAssignment);
  
  if (finalAssignment.length < n) {
    // Complete with greedy approach for missing assignments
    const used = new Set(finalAssignment.map(([r, c]) => `${r}-${c}`));
    const usedRows = new Set(finalAssignment.map(([r]) => r));
    const usedCols = new Set(finalAssignment.map(([, c]) => c));
    
    for (let i = 0; i < n; i++) {
      if (!usedRows.has(i)) {
        for (let j = 0; j < n; j++) {
          if (!usedCols.has(j)) {
            finalAssignment.push([i, j]);
            usedRows.add(i);
            usedCols.add(j);
            break;
          }
        }
      }
    }
  }

  return finalAssignment;
}

function findAssignmentFromZeros(matrix: number[][]): [number, number][] {
  const n = matrix.length;
  const assignment: [number, number][] = [];
  const usedRows = new Set<number>();
  const usedCols = new Set<number>();

  // Find zeros and make assignments
  // First pass: assign zeros in rows/columns with only one zero
  let changed = true;
  while (changed) {
    changed = false;

    // Check rows with only one zero
    for (let i = 0; i < n; i++) {
      if (usedRows.has(i)) continue;
      
      const zeros = [];
      for (let j = 0; j < n; j++) {
        if (!usedCols.has(j) && matrix[i][j] === 0) {
          zeros.push(j);
        }
      }
      
      if (zeros.length === 1) {
        assignment.push([i, zeros[0]]);
        usedRows.add(i);
        usedCols.add(zeros[0]);
        changed = true;
      }
    }

    // Check columns with only one zero
    for (let j = 0; j < n; j++) {
      if (usedCols.has(j)) continue;
      
      const zeros = [];
      for (let i = 0; i < n; i++) {
        if (!usedRows.has(i) && matrix[i][j] === 0) {
          zeros.push(i);
        }
      }
      
      if (zeros.length === 1) {
        assignment.push([zeros[0], j]);
        usedRows.add(zeros[0]);
        usedCols.add(j);
        changed = true;
      }
    }
  }

  // Second pass: assign remaining zeros greedily
  for (let i = 0; i < n; i++) {
    if (usedRows.has(i)) continue;
    
    for (let j = 0; j < n; j++) {
      if (!usedCols.has(j) && matrix[i][j] === 0) {
        assignment.push([i, j]);
        usedRows.add(i);
        usedCols.add(j);
        break;
      }
    }
  }

  return assignment;
}

function findMinimumLinesCover(matrix: number[][]): {
  coveredRows: boolean[];
  coveredCols: boolean[];
} {
  const n = matrix.length;
  const assignment = findAssignmentFromZeros(matrix);
  
  const coveredRows = Array(n).fill(false);
  const coveredCols = Array(n).fill(false);
  
  const assignedRows = new Set(assignment.map(([r]) => r));
  const assignedCols = new Set(assignment.map(([, c]) => c));

  // Mark unassigned rows
  for (let i = 0; i < n; i++) {
    if (!assignedRows.has(i)) {
      coveredRows[i] = true;
    }
  }

  let changed = true;
  while (changed) {
    changed = false;

    // Mark columns that have zeros in marked rows
    for (let i = 0; i < n; i++) {
      if (coveredRows[i]) {
        for (let j = 0; j < n; j++) {
          if (matrix[i][j] === 0 && !coveredCols[j]) {
            coveredCols[j] = true;
            changed = true;
          }
        }
      }
    }

    // Mark rows that have assignments in marked columns
    for (const [row, col] of assignment) {
      if (coveredCols[col] && !coveredRows[row]) {
        coveredRows[row] = true;
        changed = true;
      }
    }
  }

  // The covering lines are: unmarked rows + marked columns
  return {
    coveredRows: coveredRows.map(x => !x),
    coveredCols
  };
}

function extractOptimalAssignment(matrix: number[][], coveredRows: boolean[], coveredCols: boolean[]): [number, number][] {
  return findAssignmentFromZeros(matrix);
}

function findGreedyAssignment(matrix: number[][]): [number, number][] {
  const n = matrix.length;
  const assignment: [number, number][] = [];
  const usedRows = new Set<number>();
  const usedCols = new Set<number>();

  // Create list of all zero positions
  const zeros: [number, number, number][] = [];
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (matrix[i][j] === 0) {
        zeros.push([i, j, matrix[i][j]]);
      }
    }
  }

  // Sort by value (zeros first)
  zeros.sort((a, b) => a[2] - b[2]);

  // Assign greedily
  for (const [row, col] of zeros) {
    if (!usedRows.has(row) && !usedCols.has(col)) {
      assignment.push([row, col]);
      usedRows.add(row);
      usedCols.add(col);
    }
  }

  // Fill remaining with best available
  for (let i = 0; i < n; i++) {
    if (!usedRows.has(i)) {
      let bestCol = -1;
      let bestValue = Infinity;
      
      for (let j = 0; j < n; j++) {
        if (!usedCols.has(j) && matrix[i][j] < bestValue) {
          bestValue = matrix[i][j];
          bestCol = j;
        }
      }
      
      if (bestCol !== -1) {
        assignment.push([i, bestCol]);
        usedCols.add(bestCol);
      }
    }
  }

  return assignment;
}

function verifyAssignment(assignment: [number, number][], n: number): boolean {
  if (assignment.length !== n) {
    console.log(`Asignación incompleta: ${assignment.length}/${n}`);
    return false;
  }

  const usedRows = new Set<number>();
  const usedCols = new Set<number>();

  for (const [row, col] of assignment) {
    if (row < 0 || row >= n || col < 0 || col >= n) {
      console.log(`Índices fuera de rango: [${row}, ${col}]`);
      return false;
    }

    if (usedRows.has(row)) {
      console.log(`Fila ${row} usada múltiples veces`);
      return false;
    }

    if (usedCols.has(col)) {
      console.log(`Columna ${col} usada múltiples veces`);
      return false;
    }

    usedRows.add(row);
    usedCols.add(col);
  }

  console.log('Asignación verificada como válida');
  return true;
}
