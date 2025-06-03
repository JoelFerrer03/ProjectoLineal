import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { MatrixInput } from '@/components/MatrixInput';
import { SolutionDisplay } from '@/components/SolutionDisplay';
import { solveHungarian } from '@/utils/hungarianAlgorithm';
import { Calculator, Target, Minimize2, Maximize2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';

const Index = () => {
  const [matrixSize, setMatrixSize] = useState(3);
  const [matrix, setMatrix] = useState<number[][]>([]);
  const [objective, setObjective] = useState<'minimize' | 'maximize'>('minimize');
  const [solution, setSolution] = useState<any>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const navigate = useNavigate();

  const initializeMatrix = (size: number) => {
    const newMatrix = Array(size).fill(null).map(() => Array(size).fill(0));
    setMatrix(newMatrix);
    setSolution(null);
  };

  const handleSizeChange = (size: string) => {
    const newSize = parseInt(size);
    setMatrixSize(newSize);
    initializeMatrix(newSize);
  };

  const handleMatrixChange = (row: number, col: number, value: number) => {
    const newMatrix = [...matrix];
    newMatrix[row][col] = value;
    setMatrix(newMatrix);
  };

  const solveProblem = async () => {
    if (matrix.length === 0) {
      toast({
        title: "Error",
        description: "Por favor, inicializa la matriz primero",
        variant: "destructive"
      });
      return;
    }

    // Validate matrix has all numeric values
    const hasInvalidValues = matrix.some(row => 
      row.some(value => isNaN(value) || value === null || value === undefined)
    );

    if (hasInvalidValues) {
      toast({
        title: "Error de validación",
        description: "Todos los valores de la matriz deben ser números válidos",
        variant: "destructive"
      });
      return;
    }

    setIsCalculating(true);
    
    try {
      const result = solveHungarian(matrix, objective);
      setSolution(result);
      
      toast({
        title: "¡Problema resuelto!",
        description: `Solución óptima encontrada con costo total: ${result.totalCost}`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Error al resolver el problema de asignación",
        variant: "destructive"
      });
    } finally {
      setIsCalculating(false);
    }
  };

  const loadExample = () => {
    const exampleMatrix = [
      [82, 83, 69, 92],
      [77, 37, 49, 92],
      [11, 69, 5, 86],
      [8, 9, 98, 23]
    ];
    setMatrixSize(4);
    setMatrix(exampleMatrix);
    setSolution(null);
  };

  const handleCalculatorClick = () => {
    navigate('/documentation');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Calculator 
              className="h-10 w-10 text-blue-600 cursor-pointer hover:text-blue-800 transition-colors" 
              onClick={handleCalculatorClick}
            />
            <h1 className="text-4xl font-bold text-gray-900">
              Método Húngaro
            </h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Resuelve problemas de asignación óptima usando el algoritmo húngaro. 
            Ingresa tu matriz de costos o beneficios y encuentra la asignación óptima.
          </p>
        </div>

        {/* Configuration Panel */}
        <Card className="mb-6 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Configuración del Problema
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Tamaño de la matriz (n×n)
                </label>
                <Select value={matrixSize.toString()} onValueChange={handleSizeChange}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[2, 3, 4, 5, 6].map(size => (
                      <SelectItem key={size} value={size.toString()}>
                        {size}×{size}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Objetivo
                </label>
                <Select value={objective} onValueChange={(value: 'minimize' | 'maximize') => setObjective(value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="minimize">
                      <div className="flex items-center gap-2">
                        <Minimize2 className="h-4 w-4" />
                        Minimizar costos
                      </div>
                    </SelectItem>
                    <SelectItem value="maximize">
                      <div className="flex items-center gap-2">
                        <Maximize2 className="h-4 w-4" />
                        Maximizar beneficios
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-2">
                <Button
                  onClick={() => initializeMatrix(matrixSize)}
                  variant="outline"
                  className="flex-1"
                >
                  Inicializar Matriz
                </Button>
                <Button
                  onClick={loadExample}
                  variant="outline"
                  className="flex-1"
                >
                  Cargar Ejemplo
                </Button>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-2">
              <Badge variant={objective === 'minimize' ? 'default' : 'secondary'}>
                {objective === 'minimize' ? 'Minimización' : 'Maximización'}
              </Badge>
              <Badge variant="outline">
                Matriz {matrixSize}×{matrixSize}
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Matrix Input */}
        {matrix.length > 0 && (
          <MatrixInput
            matrix={matrix}
            objective={objective}
            onMatrixChange={handleMatrixChange}
            onSolve={solveProblem}
            isCalculating={isCalculating}
          />
        )}

        {/* Solution Display */}
        {solution && (
          <SolutionDisplay 
            solution={solution} 
            originalMatrix={matrix}
            objective={objective}
          />
        )}
      </div>
    </div>
  );
};

export default Index;
