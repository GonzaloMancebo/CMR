"use client"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import {
  FileText,
  Download,
  Calendar,
  Building2,
  Users,
  AlertTriangle,
  DollarSign,
  TrendingUp,
  Shield,
  FileCheck,
} from "lucide-react"

// Datos de obras para los reportes
const obrasData = [
  {
    id: 1,
    nombre: "Torre Residencial Norte",
    ubicacion: "Av. Libertador 1234, CABA",
    estado: "En Progreso",
    progreso: 65,
    fechaInicio: "2024-01-15",
    fechaEstimada: "2024-12-20",
    presupuesto: 2500000,
    gastado: 1625000,
    ingeniero: "Ing. María González",
    licenciado: "Lic. Carlos Rodríguez",
    trabajadores: 45,
    incidentes: 2,
  },
  {
    id: 2,
    nombre: "Centro Comercial Sur",
    ubicacion: "Ruta 9 Km 45, Zona Sur",
    estado: "Planificación",
    progreso: 15,
    fechaInicio: "2024-03-01",
    fechaEstimada: "2025-08-15",
    presupuesto: 4200000,
    gastado: 630000,
    ingeniero: "Ing. Roberto Silva",
    licenciado: "Lic. Ana Martínez",
    trabajadores: 12,
    incidentes: 0,
  },
  {
    id: 3,
    nombre: "Complejo Industrial Este",
    ubicacion: "Parque Industrial, Zona Este",
    estado: "En Progreso",
    progreso: 80,
    fechaInicio: "2023-08-10",
    fechaEstimada: "2024-10-30",
    presupuesto: 6800000,
    gastado: 5440000,
    ingeniero: "Ing. Laura Fernández",
    licenciado: "Lic. Diego López",
    trabajadores: 78,
    incidentes: 1,
  },
  {
    id: 4,
    nombre: "Puente Vehicular Oeste",
    ubicacion: "Autopista Oeste Km 12",
    estado: "Finalizado",
    progreso: 100,
    fechaInicio: "2023-02-01",
    fechaEstimada: "2024-01-15",
    presupuesto: 1800000,
    gastado: 1750000,
    ingeniero: "Ing. Pedro Morales",
    licenciado: "Lic. Sofía Castro",
    trabajadores: 25,
    incidentes: 0,
  },
  {
    id: 5,
    nombre: "Hospital Regional Centro",
    ubicacion: "Av. San Martín 567, Centro",
    estado: "En Progreso",
    progreso: 40,
    fechaInicio: "2024-02-20",
    fechaEstimada: "2025-06-30",
    presupuesto: 8500000,
    gastado: 3400000,
    ingeniero: "Ing. Carmen Vega",
    licenciado: "Lic. Martín Herrera",
    trabajadores: 95,
    incidentes: 3,
  },
]

// Tipos de reportes disponibles
const tiposReporte = [
  {
    id: "general",
    nombre: "Reporte General",
    descripcion: "Información completa de la obra",
    icono: FileText,
  },
  {
    id: "financiero",
    nombre: "Reporte Financiero",
    descripcion: "Análisis de presupuesto y gastos",
    icono: DollarSign,
  },
  {
    id: "progreso",
    nombre: "Reporte de Progreso",
    descripcion: "Estado de avance del proyecto",
    icono: TrendingUp,
  },
  {
    id: "seguridad",
    nombre: "Reporte de Seguridad",
    descripcion: "Incidentes y medidas de seguridad",
    icono: Shield,
  },
  {
    id: "personal",
    nombre: "Reporte de Personal",
    descripcion: "Información de trabajadores y recursos humanos",
    icono: Users,
  },
  {
    id: "cumplimiento",
    nombre: "Reporte de Cumplimiento",
    descripcion: "Documentación y certificaciones",
    icono: FileCheck,
  },
]

export default function Reportes() {
  const [obraSeleccionada, setObraSeleccionada] = useState<string>("")
  const [tipoReporte, setTipoReporte] = useState<string>("")
  const [seccionesSeleccionadas, setSeccionesSeleccionadas] = useState<string[]>([
    "informacion-basica",
    "progreso",
    "financiero",
    "personal",
    "seguridad",
  ])

  const obra = obrasData.find((o) => o.id.toString() === obraSeleccionada)

  // Manejar selección de secciones
  const toggleSeccion = (seccion: string) => {
    setSeccionesSeleccionadas((prev) =>
      prev.includes(seccion) ? prev.filter((s) => s !== seccion) : [...prev, seccion],
    )
  }

  // Generar PDF (simulado)
  const generarPDF = () => {
    if (!obra || !tipoReporte) {
      alert("Por favor selecciona una obra y un tipo de reporte")
      return
    }

    // Simulación de generación de PDF
    alert(
      `Generando reporte ${tiposReporte.find((t) => t.id === tipoReporte)?.nombre} para ${obra.nombre}...\n\nSecciones incluidas: ${seccionesSeleccionadas.length}`,
    )

    // En producción, aquí se llamaría a una API para generar el PDF
    console.log("[v0] Generando PDF con los siguientes datos:", {
      obra: obra.nombre,
      tipoReporte,
      secciones: seccionesSeleccionadas,
    })
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2 flex items-center gap-3">
            <FileText className="h-10 w-10 text-primary" />
            Generador de Reportes
          </h1>
          <p className="text-muted-foreground text-lg">Crea reportes detallados en PDF de tus obras</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Panel de configuración */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Configuración del Reporte</CardTitle>
                <CardDescription>Selecciona la obra y el tipo de reporte</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="obra">Obra *</Label>
                  <Select value={obraSeleccionada} onValueChange={setObraSeleccionada}>
                    <SelectTrigger id="obra">
                      <SelectValue placeholder="Selecciona una obra" />
                    </SelectTrigger>
                    <SelectContent>
                      {obrasData.map((obra) => (
                        <SelectItem key={obra.id} value={obra.id.toString()}>
                          {obra.nombre}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tipo">Tipo de Reporte *</Label>
                  <Select value={tipoReporte} onValueChange={setTipoReporte}>
                    <SelectTrigger id="tipo">
                      <SelectValue placeholder="Selecciona el tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      {tiposReporte.map((tipo) => (
                        <SelectItem key={tipo.id} value={tipo.id}>
                          {tipo.nombre}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Secciones a Incluir</CardTitle>
                <CardDescription>Personaliza el contenido del reporte</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="informacion-basica"
                    checked={seccionesSeleccionadas.includes("informacion-basica")}
                    onCheckedChange={() => toggleSeccion("informacion-basica")}
                  />
                  <label htmlFor="informacion-basica" className="text-sm font-medium cursor-pointer">
                    Información Básica
                  </label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="progreso"
                    checked={seccionesSeleccionadas.includes("progreso")}
                    onCheckedChange={() => toggleSeccion("progreso")}
                  />
                  <label htmlFor="progreso" className="text-sm font-medium cursor-pointer">
                    Estado de Progreso
                  </label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="financiero"
                    checked={seccionesSeleccionadas.includes("financiero")}
                    onCheckedChange={() => toggleSeccion("financiero")}
                  />
                  <label htmlFor="financiero" className="text-sm font-medium cursor-pointer">
                    Análisis Financiero
                  </label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="personal"
                    checked={seccionesSeleccionadas.includes("personal")}
                    onCheckedChange={() => toggleSeccion("personal")}
                  />
                  <label htmlFor="personal" className="text-sm font-medium cursor-pointer">
                    Personal y Recursos
                  </label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="seguridad"
                    checked={seccionesSeleccionadas.includes("seguridad")}
                    onCheckedChange={() => toggleSeccion("seguridad")}
                  />
                  <label htmlFor="seguridad" className="text-sm font-medium cursor-pointer">
                    Seguridad e Incidentes
                  </label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="cronograma"
                    checked={seccionesSeleccionadas.includes("cronograma")}
                    onCheckedChange={() => toggleSeccion("cronograma")}
                  />
                  <label htmlFor="cronograma" className="text-sm font-medium cursor-pointer">
                    Cronograma y Fechas
                  </label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="graficos"
                    checked={seccionesSeleccionadas.includes("graficos")}
                    onCheckedChange={() => toggleSeccion("graficos")}
                  />
                  <label htmlFor="graficos" className="text-sm font-medium cursor-pointer">
                    Gráficos y Estadísticas
                  </label>
                </div>
              </CardContent>
            </Card>

            <Button
              size="lg"
              className="w-full gap-2"
              onClick={generarPDF}
              disabled={!obraSeleccionada || !tipoReporte}
            >
              <Download className="h-5 w-5" />
              Generar PDF
            </Button>
          </div>

          {/* Panel de vista previa */}
          <div className="lg:col-span-2">
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Vista Previa del Reporte</CardTitle>
                <CardDescription>
                  {obra ? `Reporte para: ${obra.nombre}` : "Selecciona una obra para ver la vista previa"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {obra ? (
                  <div className="space-y-6">
                    {/* Información básica */}
                    {seccionesSeleccionadas.includes("informacion-basica") && (
                      <div className="border-l-4 border-primary pl-4">
                        <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                          <Building2 className="h-5 w-5 text-primary" />
                          Información Básica
                        </h3>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-muted-foreground">Nombre:</p>
                            <p className="font-medium">{obra.nombre}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Estado:</p>
                            <Badge
                              variant={
                                obra.estado === "Finalizado"
                                  ? "default"
                                  : obra.estado === "En Progreso"
                                    ? "secondary"
                                    : "outline"
                              }
                            >
                              {obra.estado}
                            </Badge>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Ubicación:</p>
                            <p className="font-medium">{obra.ubicacion}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Ingeniero:</p>
                            <p className="font-medium">{obra.ingeniero}</p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Progreso */}
                    {seccionesSeleccionadas.includes("progreso") && (
                      <div className="border-l-4 border-chart-2 pl-4">
                        <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                          <TrendingUp className="h-5 w-5 text-chart-2" />
                          Estado de Progreso
                        </h3>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Avance del proyecto</span>
                            <span className="font-bold">{obra.progreso}%</span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-3">
                            <div
                              className="bg-chart-2 h-3 rounded-full transition-all"
                              style={{ width: `${obra.progreso}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Financiero */}
                    {seccionesSeleccionadas.includes("financiero") && (
                      <div className="border-l-4 border-chart-3 pl-4">
                        <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                          <DollarSign className="h-5 w-5 text-chart-3" />
                          Análisis Financiero
                        </h3>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-muted-foreground">Presupuesto Total:</p>
                            <p className="font-bold text-lg">${(obra.presupuesto / 1000000).toFixed(2)}M</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Gastado:</p>
                            <p className="font-bold text-lg">${(obra.gastado / 1000000).toFixed(2)}M</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Disponible:</p>
                            <p className="font-bold text-lg text-chart-2">
                              ${((obra.presupuesto - obra.gastado) / 1000000).toFixed(2)}M
                            </p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">% Ejecutado:</p>
                            <p className="font-bold text-lg">{((obra.gastado / obra.presupuesto) * 100).toFixed(1)}%</p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Personal */}
                    {seccionesSeleccionadas.includes("personal") && (
                      <div className="border-l-4 border-chart-4 pl-4">
                        <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                          <Users className="h-5 w-5 text-chart-4" />
                          Personal y Recursos
                        </h3>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-muted-foreground">Total Trabajadores:</p>
                            <p className="font-bold text-2xl">{obra.trabajadores}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Licenciado en Seguridad:</p>
                            <p className="font-medium">{obra.licenciado}</p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Seguridad */}
                    {seccionesSeleccionadas.includes("seguridad") && (
                      <div className="border-l-4 border-destructive pl-4">
                        <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                          <AlertTriangle className="h-5 w-5 text-destructive" />
                          Seguridad e Incidentes
                        </h3>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-muted-foreground">Incidentes Reportados:</span>
                            <Badge variant={obra.incidentes > 0 ? "destructive" : "default"} className="text-lg px-3">
                              {obra.incidentes}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {obra.incidentes === 0
                              ? "No se han reportado incidentes en esta obra."
                              : `Se han reportado ${obra.incidentes} incidente${obra.incidentes > 1 ? "s" : ""} que requieren atención.`}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Cronograma */}
                    {seccionesSeleccionadas.includes("cronograma") && (
                      <div className="border-l-4 border-chart-5 pl-4">
                        <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                          <Calendar className="h-5 w-5 text-chart-5" />
                          Cronograma y Fechas
                        </h3>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-muted-foreground">Fecha de Inicio:</p>
                            <p className="font-medium">{new Date(obra.fechaInicio).toLocaleDateString("es-ES")}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Fecha Estimada:</p>
                            <p className="font-medium">{new Date(obra.fechaEstimada).toLocaleDateString("es-ES")}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-64 text-muted-foreground">
                    <FileText className="h-16 w-16 mb-4 opacity-50" />
                    <p className="text-lg">Selecciona una obra para generar el reporte</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Tipos de reportes disponibles */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Tipos de Reportes Disponibles</CardTitle>
            <CardDescription>Explora los diferentes formatos de reportes que puedes generar</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {tiposReporte.map((tipo) => {
                const Icono = tipo.icono
                return (
                  <Card
                    key={tipo.id}
                    className={`cursor-pointer transition-all hover:shadow-md ${tipoReporte === tipo.id ? "border-primary border-2" : ""}`}
                    onClick={() => setTipoReporte(tipo.id)}
                  >
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base flex items-center gap-2">
                        <Icono className="h-5 w-5 text-primary" />
                        {tipo.nombre}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{tipo.descripcion}</p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
