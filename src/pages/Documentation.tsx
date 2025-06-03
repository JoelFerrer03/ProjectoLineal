
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, BookOpen, Code, Calculator, Lightbulb, Target, TrendingDown, TrendingUp, 
         CheckCircle, XCircle, Minimize2, Maximize2, Grid3X3, Play, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const Documentation = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50 p-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link to="/">
            <Button variant="outline" className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver a la Aplicación
            </Button>
          </Link>
          
          <div className="flex items-center gap-3 mb-4">
            <BookOpen className="h-10 w-10 text-blue-600" />
            <h1 className="text-4xl font-bold text-gray-900">
              Documentación Completa
            </h1>
          </div>
          <p className="text-lg text-gray-600">
            Guía exhaustiva del Método Húngaro: teoría, implementación y funcionamiento de la aplicación
          </p>
        </div>

        {/* Índice */}
        <Card className="mb-8 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Grid3X3 className="h-5 w-5" />
              Índice de Contenidos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold mb-2">Teoría y Fundamentos</h4>
                <ul className="space-y-1 text-sm">
                  <li>• ¿Qué es el Método Húngaro?</li>
                  <li>• Problemas de Asignación</li>
                  <li>• Minimización vs Maximización</li>
                  <li>• Teoría Matemática</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Implementación Técnica</h4>
                <ul className="space-y-1 text-sm">
                  <li>• Arquitectura de la Aplicación</li>
                  <li>• Algoritmo Paso a Paso</li>
                  <li>• Código y Funciones</li>
                  <li>• Interface de Usuario</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Sección 1: ¿Qué es el Método Húngaro? */}
        <Card className="mb-8 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-6 w-6 text-blue-600" />
              1. ¿Qué es el Método Húngaro?
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              El <strong>Método Húngaro</strong> es un algoritmo de optimización combinatoria desarrollado por 
              Harold Kuhn en 1955, basado en trabajos previos de los matemáticos húngaros Dénes Kőnig y Jenő Egerváry. 
              Su propósito es resolver problemas de asignación óptima de manera eficiente.
            </p>

            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-blue-600" />
                Problema que Resuelve
              </h4>
              <p>
                Dado un conjunto de <em>n</em> recursos y <em>n</em> tareas, donde cada recurso puede realizar 
                cualquier tarea con un costo específico, encuentra la asignación que minimiza (o maximiza) 
                el costo total, asignando exactamente una tarea a cada recurso.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-green-50 p-4 rounded-lg">
                <h5 className="font-semibold mb-2 flex items-center gap-2">
                  <TrendingDown className="h-5 w-5 text-green-600" />
                  Minimización
                </h5>
                <p className="text-sm">
                  Encuentra la asignación con el menor costo total. Útil para problemas de costos, 
                  tiempos, distancias, etc.
                </p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <h5 className="font-semibold mb-2 flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-purple-600" />
                  Maximización
                </h5>
                <p className="text-sm">
                  Encuentra la asignación con el mayor beneficio total. Útil para problemas de 
                  utilidades, ganancias, calificaciones, etc.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Sección 2: Ejemplos Prácticos */}
        <Card className="mb-8 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="h-6 w-6 text-green-600" />
              2. Ejemplos Prácticos de Aplicación
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3 text-green-700">Problemas de Minimización</h4>
                <div className="space-y-3">
                  <div className="bg-green-50 p-3 rounded">
                    <strong>Asignación de Trabajadores:</strong>
                    <p className="text-sm mt-1">
                      Asignar empleados a tareas minimizando el tiempo total de completado.
                    </p>
                  </div>
                  <div className="bg-green-50 p-3 rounded">
                    <strong>Distribución de Vehículos:</strong>
                    <p className="text-sm mt-1">
                      Asignar vehículos a rutas minimizando la distancia total recorrida.
                    </p>
                  </div>
                  <div className="bg-green-50 p-3 rounded">
                    <strong>Asignación de Máquinas:</strong>
                    <p className="text-sm mt-1">
                      Asignar trabajos a máquinas minimizando el costo de operación.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-3 text-purple-700">Problemas de Maximización</h4>
                <div className="space-y-3">
                  <div className="bg-purple-50 p-3 rounded">
                    <strong>Asignación de Vendedores:</strong>
                    <p className="text-sm mt-1">
                      Asignar vendedores a territorios maximizando las ventas totales.
                    </p>
                  </div>
                  <div className="bg-purple-50 p-3 rounded">
                    <strong>Selección de Equipos:</strong>
                    <p className="text-sm mt-1">
                      Asignar jugadores a posiciones maximizando la efectividad del equipo.
                    </p>
                  </div>
                  <div className="bg-purple-50 p-3 rounded">
                    <strong>Inversión de Recursos:</strong>
                    <p className="text-sm mt-1">
                      Asignar capital a proyectos maximizando el retorno de inversión.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Sección 3: Algoritmo Paso a Paso */}
        <Card className="mb-8 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Code className="h-6 w-6 text-orange-600" />
              3. Algoritmo Húngaro - Paso a Paso
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-orange-50 p-4 rounded-lg">
              <p className="font-semibold text-orange-800 mb-2">
                El algoritmo funciona transformando el problema en uno donde la solución óptima 
                consiste en encontrar ceros en la matriz de costos.
              </p>
            </div>

            <div className="space-y-6">
              {/* Paso 0 */}
              <div className="border-l-4 border-blue-500 pl-4">
                <h4 className="font-semibold text-blue-700 mb-2">
                  Paso 0: Preparación de la Matriz
                </h4>
                <p className="mb-2">
                  Si el problema es de maximización, convertimos a minimización restando cada 
                  elemento del valor máximo de la matriz.
                </p>
                <div className="bg-blue-50 p-3 rounded text-sm">
                  <strong>Conversión:</strong> nuevo_valor = máximo - valor_original
                </div>
              </div>

              {/* Paso 1 */}
              <div className="border-l-4 border-green-500 pl-4">
                <h4 className="font-semibold text-green-700 mb-2">
                  Paso 1: Reducción por Filas
                </h4>
                <p className="mb-2">
                  Restamos el valor mínimo de cada fila a todos los elementos de esa fila.
                </p>
                <div className="bg-green-50 p-3 rounded text-sm">
                  Para cada fila i: nuevo_valor[i][j] = valor[i][j] - min(fila_i)
                </div>
              </div>

              {/* Paso 2 */}
              <div className="border-l-4 border-purple-500 pl-4">
                <h4 className="font-semibold text-purple-700 mb-2">
                  Paso 2: Reducción por Columnas
                </h4>
                <p className="mb-2">
                  Restamos el valor mínimo de cada columna a todos los elementos de esa columna.
                </p>
                <div className="bg-purple-50 p-3 rounded text-sm">
                  Para cada columna j: nuevo_valor[i][j] = valor[i][j] - min(columna_j)
                </div>
              </div>

              {/* Paso 3 */}
              <div className="border-l-4 border-red-500 pl-4">
                <h4 className="font-semibold text-red-700 mb-2">
                  Paso 3: Búsqueda de Asignación Óptima
                </h4>
                <p className="mb-2">
                  Intentamos encontrar una asignación completa usando solo los ceros de la matriz.
                </p>
                <div className="bg-red-50 p-3 rounded text-sm space-y-1">
                  <p><strong>3a.</strong> Buscar filas/columnas con un solo cero y asignar</p>
                  <p><strong>3b.</strong> Si no hay asignación completa, continuar al paso 4</p>
                </div>
              </div>

              {/* Paso 4 */}
              <div className="border-l-4 border-yellow-500 pl-4">
                <h4 className="font-semibold text-yellow-700 mb-2">
                  Paso 4: Creación de Nuevos Ceros (Iterativo)
                </h4>
                <p className="mb-2">
                  Si no podemos hacer una asignación completa, creamos más ceros:
                </p>
                <div className="bg-yellow-50 p-3 rounded text-sm space-y-1">
                  <p><strong>4a.</strong> Cubrir todos los ceros con el mínimo número de líneas</p>
                  <p><strong>4b.</strong> Encontrar el menor elemento no cubierto</p>
                  <p><strong>4c.</strong> Restarlo de elementos no cubiertos</p>
                  <p><strong>4d.</strong> Sumarlo a elementos doblemente cubiertos</p>
                  <p><strong>4e.</strong> Repetir hasta encontrar asignación completa</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Sección 4: Arquitectura de la Aplicación */}
        <Card className="mb-8 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Code className="h-6 w-6 text-indigo-600" />
              4. Arquitectura de la Aplicación
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              La aplicación está construida con React, TypeScript y Tailwind CSS, siguiendo una 
              arquitectura modular y componente-basada.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3">Estructura de Archivos</h4>
                <div className="bg-gray-50 p-4 rounded font-mono text-sm">
                  <div>src/</div>
                  <div className="ml-2">├── components/</div>
                  <div className="ml-4">├── MatrixInput.tsx</div>
                  <div className="ml-4">└── SolutionDisplay.tsx</div>
                  <div className="ml-2">├── pages/</div>
                  <div className="ml-4">├── Index.tsx</div>
                  <div className="ml-4">└── Documentation.tsx</div>
                  <div className="ml-2">└── utils/</div>
                  <div className="ml-4">└── hungarianAlgorithm.ts</div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-3">Componentes Principales</h4>
                <div className="space-y-2">
                  <Badge variant="outline">Index.tsx - Página principal</Badge>
                  <Badge variant="outline">MatrixInput.tsx - Entrada de datos</Badge>
                  <Badge variant="outline">SolutionDisplay.tsx - Resultados</Badge>
                  <Badge variant="outline">hungarianAlgorithm.ts - Lógica central</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Sección 5: Funcionamiento del Código */}
        <Card className="mb-8 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="h-6 w-6 text-teal-600" />
              5. Funcionamiento Detallado del Código
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            
            <div className="bg-teal-50 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Función Principal: solveHungarian()</h4>
              <p className="text-sm mb-3">
                Esta es la función principal que coordina todo el proceso del algoritmo húngaro.
              </p>
              <div className="bg-white p-3 rounded border font-mono text-xs overflow-x-auto">
                <div>function solveHungarian(matrix: number[][], objective: &apos;minimize&apos; | &apos;maximize&apos;)</div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="border rounded-lg p-4">
                <h5 className="font-semibold mb-2 text-blue-700">1. Inicialización y Validación</h5>
                <ul className="text-sm space-y-1 ml-4">
                  <li>• Crea copias de trabajo de la matriz original</li>
                  <li>• Inicializa arrays para almacenar pasos y matrices intermedias</li>
                  <li>• Guarda la matriz original para mostrar en los resultados</li>
                </ul>
              </div>

              <div className="border rounded-lg p-4">
                <h5 className="font-semibold mb-2 text-green-700">2. Conversión de Maximización</h5>
                <p className="text-sm mb-2">Si el objetivo es maximizar:</p>
                <div className="bg-gray-50 p-3 rounded font-mono text-xs">
                  const maxValue = Math.max(...matrix.flat());<br/>
                  workingMatrix = matrix.map(row =&gt; row.map(value =&gt; maxValue - value));
                </div>
              </div>

              <div className="border rounded-lg p-4">
                <h5 className="font-semibold mb-2 text-purple-700">3. Reducción por Filas</h5>
                <div className="bg-gray-50 p-3 rounded font-mono text-xs">
                  const rowMins = workingMatrix.map(row =&gt; Math.min(...row));<br/>
                  workingMatrix = workingMatrix.map((row, i) =&gt; row.map(val =&gt; val - rowMins[i]));
                </div>
              </div>

              <div className="border rounded-lg p-4">
                <h5 className="font-semibold mb-2 text-red-700">4. Reducción por Columnas</h5>
                <div className="bg-gray-50 p-3 rounded font-mono text-xs">
                  const colMins = Array(n).fill(0).map((_, j) =&gt; <br/>
                  &nbsp;&nbsp;Math.min(...workingMatrix.map(row =&gt; row[j])));<br/>
                  workingMatrix = workingMatrix.map(row =&gt; <br/>
                  &nbsp;&nbsp;row.map((val, j) =&gt; val - colMins[j]));
                </div>
              </div>

              <div className="border rounded-lg p-4">
                <h5 className="font-semibold mb-2 text-orange-700">5. Búsqueda de Asignación Óptima</h5>
                <p className="text-sm mb-2">Proceso iterativo que incluye:</p>
                <ul className="text-sm space-y-1 ml-4">
                  <li>• <strong>findAssignmentFromZeros():</strong> Busca asignaciones usando solo ceros</li>
                  <li>• <strong>findMinimumLinesCover():</strong> Encuentra líneas mínimas para cubrir ceros</li>
                  <li>• <strong>Matrix adjustment:</strong> Ajusta la matriz para crear nuevos ceros</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Sección 6: Funciones Auxiliares */}
        <Card className="mb-8 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Code className="h-6 w-6 text-cyan-600" />
              6. Funciones Auxiliares Clave
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            
            <div className="grid grid-cols-1 gap-4">
              <div className="border rounded-lg p-4 bg-cyan-50">
                <h5 className="font-semibold mb-2">findAssignmentFromZeros()</h5>
                <p className="text-sm mb-2">
                  Encuentra asignaciones válidas usando solo los ceros de la matriz.
                </p>
                <div className="bg-white p-3 rounded text-xs">
                  <strong>Estrategia:</strong> Primero asigna ceros únicos en filas/columnas, 
                  luego completa con asignación voraz.
                </div>
              </div>

              <div className="border rounded-lg p-4 bg-blue-50">
                <h5 className="font-semibold mb-2">findMinimumLinesCover()</h5>
                <p className="text-sm mb-2">
                  Implementa el algoritmo de cobertura mínima para determinar líneas que cubren todos los ceros.
                </p>
                <div className="bg-white p-3 rounded text-xs">
                  <strong>Propósito:</strong> Identifica si tenemos suficientes ceros para una asignación completa.
                </div>
              </div>

              <div className="border rounded-lg p-4 bg-green-50">
                <h5 className="font-semibold mb-2">verifyAssignment()</h5>
                <p className="text-sm mb-2">
                  Valida que la asignación encontrada sea correcta (una tarea por recurso).
                </p>
                <div className="bg-white p-3 rounded text-xs">
                  <strong>Verificaciones:</strong> Longitud correcta, índices válidos, no duplicados.
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Sección 7: Interface de Usuario */}
        <Card className="mb-8 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Grid3X3 className="h-6 w-6 text-pink-600" />
              7. Interface de Usuario y Componentes
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            
            <div className="space-y-4">
              <div className="border rounded-lg p-4">
                <h5 className="font-semibold mb-2 text-blue-700">MatrixInput Component</h5>
                <p className="text-sm mb-2">Maneja la entrada de datos de la matriz:</p>
                <ul className="text-sm space-y-1 ml-4">
                  <li>• Input numérico para cada celda de la matriz</li>
                  <li>• Etiquetas de filas (R1, R2...) y columnas (T1, T2...)</li>
                  <li>• Validación en tiempo real de valores numéricos</li>
                  <li>• Botón para resolver el problema</li>
                </ul>
              </div>

              <div className="border rounded-lg p-4">
                <h5 className="font-semibold mb-2 text-green-700">SolutionDisplay Component</h5>
                <p className="text-sm mb-2">Muestra los resultados de manera comprehensiva:</p>
                <ul className="text-sm space-y-1 ml-4">
                  <li>• <strong>Resumen de la solución:</strong> Costo total y tipo de optimización</li>
                  <li>• <strong>Tabla final:</strong> Matriz original con asignaciones destacadas</li>
                  <li>• <strong>Matrices intermedias:</strong> Cada paso del algoritmo visualizado</li>
                  <li>• <strong>Lista de pasos:</strong> Explicación textual del proceso</li>
                </ul>
              </div>

              <div className="border rounded-lg p-4">
                <h5 className="font-semibold mb-2 text-purple-700">Index Page (Página Principal)</h5>
                <p className="text-sm mb-2">Coordina toda la aplicación:</p>
                <ul className="text-sm space-y-1 ml-4">
                  <li>• Gestión del estado de la matriz y configuración</li>
                  <li>• Selector de tamaño de matriz (2x2 hasta 6x6)</li>
                  <li>• Selector de objetivo (minimizar/maximizar)</li>
                  <li>• Botón para cargar ejemplo predefinido</li>
                  <li>• Manejo de errores y validaciones</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Sección 8: Casos Especiales y Limitaciones */}
        <Card className="mb-8 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-6 w-6 text-amber-600" />
              8. Casos Especiales y Consideraciones
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            
            <div className="bg-amber-50 p-4 rounded-lg">
              <h4 className="font-semibold mb-2 text-amber-800">Limitaciones Actuales</h4>
              <ul className="text-sm space-y-1 ml-4">
                <li>• Solo matrices cuadradas (n×n)</li>
                <li>• Máximo tamaño 6×6 para mantener usabilidad</li>
                <li>• Requiere valores numéricos válidos en todas las celdas</li>
              </ul>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border rounded-lg p-4">
                <h5 className="font-semibold mb-2 text-green-700">
                  <CheckCircle className="inline h-4 w-4 mr-1" />
                  Casos Manejados Correctamente
                </h5>
                <ul className="text-sm space-y-1 ml-4">
                  <li>• Matrices con múltiples soluciones óptimas</li>
                  <li>• Valores negativos en la matriz</li>
                  <li>• Matrices con muchos ceros</li>
                  <li>• Conversión automática maximización→minimización</li>
                </ul>
              </div>

              <div className="border rounded-lg p-4">
                <h5 className="font-semibold mb-2 text-red-700">
                  <XCircle className="inline h-4 w-4 mr-1" />
                  Casos que Requieren Atención
                </h5>
                <ul className="text-sm space-y-1 ml-4">
                  <li>• Matrices muy grandes (rendimiento)</li>
                  <li>• Valores extremadamente grandes</li>
                  <li>• Matrices con patrones degenerados</li>
                  <li>• Entrada de datos no numéricos</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Sección 9: Optimizaciones y Mejoras */}
        <Card className="mb-8 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-6 w-6 text-emerald-600" />
              9. Optimizaciones Implementadas
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            
            <div className="space-y-4">
              <div className="bg-emerald-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2 text-emerald-800">Eficiencia del Algoritmo</h4>
                <ul className="text-sm space-y-1 ml-4">
                  <li>• <strong>Complejidad temporal:</strong> O(n³) en el peor caso</li>
                  <li>• <strong>Detección temprana:</strong> Termina cuando encuentra solución óptima</li>
                  <li>• <strong>Estrategia de asignación:</strong> Prioriza ceros únicos primero</li>
                  <li>• <strong>Fallback seguro:</strong> Asignación voraz si el algoritmo falla</li>
                </ul>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border rounded-lg p-4">
                  <h5 className="font-semibold mb-2">Optimizaciones de UI</h5>
                  <ul className="text-sm space-y-1 ml-4">
                    <li>• Feedback visual en tiempo real</li>
                    <li>• Estados de carga durante cálculos</li>
                    <li>• Validación inmediata de entrada</li>
                    <li>• Formato de números localizado</li>
                  </ul>
                </div>

                <div className="border rounded-lg p-4">
                  <h5 className="font-semibold mb-2">Optimizaciones de Código</h5>
                  <ul className="text-sm space-y-1 ml-4">
                    <li>• TypeScript para type safety</li>
                    <li>• Componentización modular</li>
                    <li>• Manejo robusto de errores</li>
                    <li>• Logging detallado para debugging</li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <Card className="shadow-lg">
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-gray-600 mb-4">
                Esta documentación cubre todos los aspectos del funcionamiento de la aplicación 
                del Método Húngaro, desde la teoría matemática hasta los detalles de implementación.
              </p>
              <Link to="/">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Play className="h-4 w-4 mr-2" />
                  Probar la Aplicación
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Documentation;
