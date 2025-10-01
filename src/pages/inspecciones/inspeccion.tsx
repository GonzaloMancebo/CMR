"use client"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { CalendarDays, Search, Plus, AlertTriangle, CheckCircle, Clock, FileText, MapPin, User } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"

const inspeccionesData = [
  {
    id: 1,
    tipo: "Seguridad General",
    obra: "Torre Residencial Norte",
    fecha: "2024-01-15",
    inspector: "Lic. María González",
    estado: "Completada",
    prioridad: "Alta",
    hallazgos: 3,
    acciones: 2,
    cumplimiento: 85,
    descripcion: "Inspección rutinaria de seguridad en obra",
    observaciones: "Falta señalización en zona de excavación",
  },
  {
    id: 2,
    tipo: "Higiene Industrial",
    obra: "Centro Comercial Sur",
    fecha: "2024-01-14",
    inspector: "Lic. Carlos Ruiz",
    estado: "Pendiente",
    prioridad: "Media",
    hallazgos: 1,
    acciones: 1,
    cumplimiento: 92,
    descripcion: "Control de exposición a polvo y ruido",
    observaciones: "Revisar uso de EPP en soldadura",
  },
  {
    id: 3,
    tipo: "Equipos de Protección",
    obra: "Hospital Regional",
    fecha: "2024-01-13",
    inspector: "Lic. Ana Martín",
    estado: "Completada",
    prioridad: "Alta",
    hallazgos: 0,
    acciones: 0,
    cumplimiento: 98,
    descripcion: "Verificación de EPP y su uso correcto",
    observaciones: "Excelente cumplimiento del personal",
  },
  {
    id: 4,
    tipo: "Riesgos Ambientales",
    obra: "Puente Vehicular",
    fecha: "2024-01-12",
    inspector: "Lic. Roberto Silva",
    estado: "En Proceso",
    prioridad: "Media",
    hallazgos: 2,
    acciones: 2,
    cumplimiento: 78,
    descripcion: "Evaluación de riesgos ambientales",
    observaciones: "Mejorar gestión de residuos",
  },
  {
    id: 5,
    tipo: "Capacitación",
    obra: "Complejo Deportivo",
    fecha: "2024-01-11",
    inspector: "Lic. Laura Vega",
    estado: "Programada",
    prioridad: "Baja",
    hallazgos: 0,
    acciones: 0,
    cumplimiento: 0,
    descripcion: "Verificación de capacitaciones de seguridad",
    observaciones: "Pendiente de programación",
  },
]

const inspeccionesPorMes = [
  { mes: "Ene", programadas: 45, realizadas: 42, pendientes: 3 },
  { mes: "Feb", programadas: 38, realizadas: 35, pendientes: 3 },
  { mes: "Mar", programadas: 52, realizadas: 48, pendientes: 4 },
  { mes: "Abr", programadas: 41, realizadas: 39, pendientes: 2 },
]

const cumplimientoPorTipo = [
  { tipo: "Seguridad", cumplimiento: 87 },
  { tipo: "Higiene", cumplimiento: 92 },
  { tipo: "EPP", cumplimiento: 95 },
  { tipo: "Ambiental", cumplimiento: 83 },
  { tipo: "Capacitación", cumplimiento: 89 },
]

const distribucionHallazgos = [
  { name: "Sin Hallazgos", value: 45, color: "#22c55e" },
  { name: "Hallazgos Menores", value: 35, color: "#f59e0b" },
  { name: "Hallazgos Mayores", value: 15, color: "#ef4444" },
  { name: "Críticos", value: 5, color: "#dc2626" },
]

export default function Inspecciones() {
  const [filtroObra, setFiltroObra] = useState("todas")
  const [filtroTipo, setFiltroTipo] = useState("todos")
  const [filtroEstado, setFiltroEstado] = useState("todos")
  const [busqueda, setBusqueda] = useState("")
  const [inspeccionSeleccionada, setInspeccionSeleccionada] = useState(null)

  const inspeccionesFiltradas = inspeccionesData.filter((inspeccion) => {
    const coincideObra = filtroObra === "todas" || inspeccion.obra.includes(filtroObra)
    const coincideTipo = filtroTipo === "todos" || inspeccion.tipo === filtroTipo
    const coincideEstado = filtroEstado === "todos" || inspeccion.estado === filtroEstado
    const coincideBusqueda =
      inspeccion.obra.toLowerCase().includes(busqueda.toLowerCase()) ||
      inspeccion.inspector.toLowerCase().includes(busqueda.toLowerCase()) ||
      inspeccion.tipo.toLowerCase().includes(busqueda.toLowerCase())

    return coincideObra && coincideTipo && coincideEstado && coincideBusqueda
  })

  const getEstadoBadge = (estado) => {
    const variants = {
      Completada: "bg-green-100 text-green-800",
      "En Proceso": "bg-blue-100 text-blue-800",
      Pendiente: "bg-yellow-100 text-yellow-800",
      Programada: "bg-gray-100 text-gray-800",
    }
    return variants[estado] || "bg-gray-100 text-gray-800"
  }

  const getPrioridadBadge = (prioridad) => {
    const variants = {
      Alta: "bg-red-100 text-red-800",
      Media: "bg-yellow-100 text-yellow-800",
      Baja: "bg-green-100 text-green-800",
    }
    return variants[prioridad] || "bg-gray-100 text-gray-800"
  }

  return (
   <div className="min-h-screen bg-background p-4 ml-[10%]">
      <div className="w-[1500px]">
        <div className="mb-8 ">
          <p className="text-muted-foreground text-lg mt-20">
            Panel de control para licenciados en seguridad e higiene
          </p>
        </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="w-4 h-4" />
                  Nueva Inspección
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Programar Nueva Inspección</DialogTitle>
                  <DialogDescription>Complete los datos para programar una nueva inspección</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="tipo">Tipo de Inspección</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="seguridad">Seguridad General</SelectItem>
                        <SelectItem value="higiene">Higiene Industrial</SelectItem>
                        <SelectItem value="epp">Equipos de Protección</SelectItem>
                        <SelectItem value="ambiental">Riesgos Ambientales</SelectItem>
                        <SelectItem value="capacitacion">Capacitación</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="obra">Obra</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar obra" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="torre">Torre Residencial Norte</SelectItem>
                        <SelectItem value="centro">Centro Comercial Sur</SelectItem>
                        <SelectItem value="hospital">Hospital Regional</SelectItem>
                        <SelectItem value="puente">Puente Vehicular</SelectItem>
                        <SelectItem value="deportivo">Complejo Deportivo</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="fecha">Fecha Programada</Label>
                    <Input type="date" />
                  </div>
                  <div>
                    <Label htmlFor="descripcion">Descripción</Label>
                    <Textarea placeholder="Descripción de la inspección..." />
                  </div>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">Programar Inspección</Button>
                </div>
              </DialogContent>
            </Dialog>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 ">
              <CardTitle className="text-sm font-medium">Inspecciones del Mes</CardTitle>
              <CalendarDays className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">42</div>
              <p className="text-xs text-slate-600">+8% vs mes anterior</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 ">
              <CardTitle className="text-sm font-medium">Cumplimiento Promedio</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">89%</div>
              <p className="text-xs text-slate-600">+3% vs mes anterior</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 ">
              <CardTitle className="text-sm font-medium">Hallazgos Críticos</CardTitle>
              <AlertTriangle className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-slate-600">-2 vs mes anterior</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 ">
              <CardTitle className="text-sm font-medium">Pendientes</CardTitle>
              <Clock className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">7</div>
              <p className="text-xs text-slate-600">2 vencidas</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Inspecciones por Mes</CardTitle>
              <CardDescription>Programadas vs Realizadas</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={inspeccionesPorMes}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="mes" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="programadas" fill="#3b82f6" name="Programadas" />
                  <Bar dataKey="realizadas" fill="#22c55e" name="Realizadas" />
                  <Bar dataKey="pendientes" fill="#f59e0b" name="Pendientes" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Distribución de Hallazgos</CardTitle>
              <CardDescription>Por severidad</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={distribucionHallazgos}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    dataKey="value"
                  >
                    {distribucionHallazgos.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Cumplimiento por Tipo de Inspección</CardTitle>
            <CardDescription>Porcentaje de cumplimiento promedio</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={cumplimientoPorTipo} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" domain={[0, 100]} />
                <YAxis dataKey="tipo" type="category" width={100} />
                <Tooltip formatter={(value) => [`${value}%`, "Cumplimiento"]} />
                <Bar dataKey="cumplimiento" fill="#22c55e" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Lista de Inspecciones</CardTitle>
            <CardDescription>Gestión y seguimiento de todas las inspecciones</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-8 mb-8">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <Input
                    placeholder="Buscar por obra, inspector o tipo..."
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={filtroTipo} onValueChange={setFiltroTipo}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos los tipos</SelectItem>
                  <SelectItem value="Seguridad General">Seguridad General</SelectItem>
                  <SelectItem value="Higiene Industrial">Higiene Industrial</SelectItem>
                  <SelectItem value="Equipos de Protección">Equipos de Protección</SelectItem>
                  <SelectItem value="Riesgos Ambientales">Riesgos Ambientales</SelectItem>
                  <SelectItem value="Capacitación">Capacitación</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filtroEstado} onValueChange={setFiltroEstado}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos los estados</SelectItem>
                  <SelectItem value="Completada">Completada</SelectItem>
                  <SelectItem value="En Proceso">En Proceso</SelectItem>
                  <SelectItem value="Pendiente">Pendiente</SelectItem>
                  <SelectItem value="Programada">Programada</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-4">
              {inspeccionesFiltradas.map((inspeccion) => (
                <div key={inspeccion.id} className="border rounded-lg p-4 hover:bg-slate-50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-slate-900">{inspeccion.tipo}</h3>
                        <Badge className={getEstadoBadge(inspeccion.estado)}>{inspeccion.estado}</Badge>
                        <Badge className={getPrioridadBadge(inspeccion.prioridad)}>{inspeccion.prioridad}</Badge>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-slate-600">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          <span>{inspeccion.obra}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4" />
                          <span>{inspeccion.inspector}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CalendarDays className="w-4 h-4" />
                          <span>{new Date(inspeccion.fecha).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <p className="text-sm text-slate-600 mt-2">{inspeccion.descripcion}</p>
                      {inspeccion.observaciones && (
                        <p className="text-sm text-slate-500 mt-1 italic">{inspeccion.observaciones}</p>
                      )}
                    </div>
                    <div className="flex flex-col items-end gap-2 ml-4">
                      <div className="text-right">
                        <div className="text-sm font-medium">Cumplimiento: {inspeccion.cumplimiento}%</div>
                        <div className="text-xs text-slate-500">
                          {inspeccion.hallazgos} hallazgos • {inspeccion.acciones} acciones
                        </div>
                      </div>
                      <Button variant="outline" size="sm" onClick={() => setInspeccionSeleccionada(inspeccion)}>
                        <FileText className="w-4 h-4 mr-1" />
                        Ver Detalle
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {inspeccionSeleccionada && (
          <Dialog open={!!inspeccionSeleccionada} onOpenChange={() => setInspeccionSeleccionada(null)}>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Detalle de Inspección</DialogTitle>
                <DialogDescription>
                  {inspeccionSeleccionada.tipo} - {inspeccionSeleccionada.obra}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Inspector</Label>
                    <p className="text-sm font-medium">{inspeccionSeleccionada.inspector}</p>
                  </div>
                  <div>
                    <Label>Fecha</Label>
                    <p className="text-sm font-medium">{new Date(inspeccionSeleccionada.fecha).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <Label>Estado</Label>
                    <Badge className={getEstadoBadge(inspeccionSeleccionada.estado)}>
                      {inspeccionSeleccionada.estado}
                    </Badge>
                  </div>
                  <div>
                    <Label>Prioridad</Label>
                    <Badge className={getPrioridadBadge(inspeccionSeleccionada.prioridad)}>
                      {inspeccionSeleccionada.prioridad}
                    </Badge>
                  </div>
                </div>
                <div>
                  <Label>Descripción</Label>
                  <p className="text-sm">{inspeccionSeleccionada.descripcion}</p>
                </div>
                <div>
                  <Label>Observaciones</Label>
                  <p className="text-sm">{inspeccionSeleccionada.observaciones}</p>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{inspeccionSeleccionada.cumplimiento}%</div>
                    <div className="text-xs text-slate-500">Cumplimiento</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-600">{inspeccionSeleccionada.hallazgos}</div>
                    <div className="text-xs text-slate-500">Hallazgos</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{inspeccionSeleccionada.acciones}</div>
                    <div className="text-xs text-slate-500">Acciones</div>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
      

  )
}
