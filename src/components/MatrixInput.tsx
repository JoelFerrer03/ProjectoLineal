
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Grid3X3, Play, Loader2 } from 'lucide-react';

interface MatrixInputProps {
  matrix: number[][];
  objective: 'minimize' | 'maximize';
  onMatrixChange: (row: number, col: number, value: number) => void;
  onSolve: () => void;
  isCalculating: boolean;
}

export const MatrixInput: React.FC<MatrixInputProps> = ({
  matrix,
  objective,
  onMatrixChange,
  onSolve,
  isCalculating
}) => {
  const handleInputChange = (row: number, col: number, value: string) => {
    const numValue = parseFloat(value) || 0;
    onMatrixChange(row, col, numValue);
  };

  return (
    <Card className="mb-6 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Grid3X3 className="h-5 w-5" />
          Matriz de {objective === 'minimize' ? 'Costos' : 'Beneficios'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <div className="overflow-x-auto">
            <div className="inline-block min-w-full">
              {/* Column headers */}
              <div className="flex mb-2">
                <div className="w-16"></div>
                {matrix[0]?.map((_, colIndex) => (
                  <div
                    key={colIndex}
                    className="w-20 text-center text-sm font-medium text-gray-600 mr-2"
                  >
                    T{colIndex + 1}
                  </div>
                ))}
              </div>

              {/* Matrix rows */}
              {matrix.map((row, rowIndex) => (
                <div key={rowIndex} className="flex items-center mb-2">
                  {/* Row header */}
                  <div className="w-16 text-sm font-medium text-gray-600 text-right pr-2">
                    R{rowIndex + 1}
                  </div>
                  
                  {/* Row inputs */}
                  {row.map((value, colIndex) => (
                    <div key={colIndex} className="mr-2">
                      <Input
                        type="number"
                        value={value || ''}
                        onChange={(e) => handleInputChange(rowIndex, colIndex, e.target.value)}
                        className="w-20 text-center"
                        step="0.01"
                      />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="text-sm text-gray-600 mb-4">
          <p><strong>R</strong> = Recursos (trabajadores, máquinas, etc.)</p>
          <p><strong>T</strong> = Tareas (trabajos, asignaciones, etc.)</p>
          <p>
            {objective === 'minimize' 
              ? 'Ingresa los costos de asignar cada recurso a cada tarea.'
              : 'Ingresa los beneficios de asignar cada recurso a cada tarea.'
            }
          </p>
        </div>

        <Button
          onClick={onSolve}
          disabled={isCalculating}
          className="w-full bg-blue-600 hover:bg-blue-700"
          size="lg"
        >
          {isCalculating ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Calculando...
            </>
          ) : (
            <>
              <Play className="mr-2 h-4 w-4" />
              Resolver Problema de Asignación
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
};
