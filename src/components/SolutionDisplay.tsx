
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, TrendingUp, TrendingDown, ArrowRight, Table, Calculator } from 'lucide-react';

interface Assignment {
  resource: number;
  task: number;
  cost: number;
}

interface Solution {
  assignments: Assignment[];
  totalCost: number;
  steps: string[];
  intermediateMatrices?: {
    matrix: number[][];
    description: string;
    selectedCells?: [number, number][];
  }[];
}

interface SolutionDisplayProps {
  solution: Solution;
  originalMatrix: number[][];
  objective: 'minimize' | 'maximize';
}

export const SolutionDisplay: React.FC<SolutionDisplayProps> = ({
  solution,
  originalMatrix,
  objective
}) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('es-ES', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  };

  // Sort assignments by task number (column) from left to right
  const sortedAssignments = [...solution.assignments].sort((a, b) => a.task - b.task);

  return (
    <div className="space-y-6">
      {/* Solution Summary */}
      <Card className="shadow-lg border-green-200">
        <CardHeader className="bg-green-50">
          <CardTitle className="flex items-center gap-2 text-green-800">
            <CheckCircle className="h-6 w-6" />
            Solución Óptima Encontrada
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                {objective === 'minimize' ? (
                  <TrendingDown className="h-5 w-5 text-red-500" />
                ) : (
                  <TrendingUp className="h-5 w-5 text-green-500" />
                )}
                {objective === 'minimize' ? 'Costo Mínimo Total' : 'Beneficio Máximo Total'}
              </h3>
              <div className="text-3xl font-bold text-blue-600">
                {formatCurrency(solution.totalCost)}
              </div>
              <Badge 
                variant={objective === 'minimize' ? 'destructive' : 'default'} 
                className="mt-2"
              >
                {objective === 'minimize' ? 'Minimizado' : 'Maximizado'}
              </Badge>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">Asignaciones Óptimas</h3>
              <div className="space-y-2">
                {sortedAssignments.map((assignment, index) => (
                  <div 
                    key={index}
                    className="flex items-center justify-between p-3 bg-blue-50 rounded-lg"
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-medium">
                        Tarea {assignment.task + 1}
                      </span>
                      <ArrowRight className="h-4 w-4 text-gray-400" />
                      <span className="font-medium">
                        Recurso {assignment.resource + 1}
                      </span>
                    </div>
                    <Badge variant="outline">
                      {formatCurrency(assignment.cost)}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Final Matrix with Solution - MOVED UP */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Table className="h-5 w-5" />
            Tabla Final con Asignaciones Óptimas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="border border-gray-300 p-2 bg-gray-50"></th>
                  {originalMatrix[0]?.map((_, colIndex) => (
                    <th key={colIndex} className="border border-gray-300 p-2 bg-gray-50 font-medium">
                      Tarea {colIndex + 1}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {originalMatrix.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    <td className="border border-gray-300 p-2 bg-gray-50 font-medium">
                      Recurso {rowIndex + 1}
                    </td>
                    {row.map((value, colIndex) => {
                      const isAssigned = solution.assignments.some(
                        assignment => assignment.resource === rowIndex && assignment.task === colIndex
                      );
                      
                      return (
                        <td 
                          key={colIndex}
                          className={`border border-gray-300 p-2 text-center transition-colors ${
                            isAssigned 
                              ? 'bg-green-100 border-green-300 font-bold text-green-800' 
                              : 'hover:bg-gray-50'
                          }`}
                        >
                          {formatCurrency(value)}
                          {isAssigned && (
                            <div className="text-xs text-green-600 mt-1">
                              ✓ Asignado
                            </div>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Intermediate Matrices - NEW SECTION */}
      {solution.intermediateMatrices && solution.intermediateMatrices.length > 0 && (
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="h-5 w-5" />
              Tablas Intermedias del Proceso
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {solution.intermediateMatrices.map((step, stepIndex) => (
                <div key={stepIndex} className="border rounded-lg p-4 bg-gray-50">
                  <h4 className="font-semibold mb-3 text-gray-800">
                    {step.description}
                  </h4>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr>
                          <th className="border border-gray-300 p-2 bg-white text-xs"></th>
                          {step.matrix[0]?.map((_, colIndex) => (
                            <th key={colIndex} className="border border-gray-300 p-2 bg-white font-medium text-xs">
                              T{colIndex + 1}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {step.matrix.map((row, rowIndex) => (
                          <tr key={rowIndex}>
                            <td className="border border-gray-300 p-2 bg-white font-medium text-xs">
                              R{rowIndex + 1}
                            </td>
                            {row.map((value, colIndex) => {
                              const isSelected = step.selectedCells?.some(
                                ([r, c]) => r === rowIndex && c === colIndex
                              );
                              
                              return (
                                <td 
                                  key={colIndex}
                                  className={`border border-gray-300 p-2 text-center text-sm transition-colors ${
                                    isSelected 
                                      ? 'bg-blue-100 border-blue-300 font-bold text-blue-800' 
                                      : value === 0 
                                        ? 'bg-yellow-50 text-yellow-800 font-medium'
                                        : 'bg-white'
                                  }`}
                                >
                                  {formatCurrency(value)}
                                  {isSelected && (
                                    <div className="text-xs text-blue-600 mt-1">
                                      ● Seleccionado
                                    </div>
                                  )}
                                </td>
                              );
                            })}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Algorithm Steps */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Pasos del Algoritmo Húngaro</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {solution.steps.map((step, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium">
                  {index + 1}
                </div>
                <div className="flex-1 pt-1">
                  <p className="text-gray-700">{step}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
