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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Shield,
  Search,
  AlertTriangle,
  Clock,
  FileText,
  MapPin,
  User,
  GraduationCap,
  Award,
  HardHat,
} from "lucide-react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts"

const eppData = [
  {
    id: 1,
    operario: "Juan Pérez",
    dni: "12345678",
    obra: "Torre Residencial Norte",
    puesto: "Soldador",
    casco: "Entregado",
    chaleco: "Entregado",
    botas: "Pendiente",
    guantes: "Entregado",
    gafas: "Vencido",
    estado: "Incompleto",
    ultimaRevision: "2024-01-10",
    observaciones: "Renovar gafas de seguridad",
  },
  {
    id: 2,
    operario: "María González",
    dni: "87654321",
    obra: "Centro Comercial Sur",
    puesto: "Electricista",
    casco: "Entregado",
    chaleco: "Entregado",
    botas: "Entregado",
    guantes: "Entregado",
    gafas: "Entregado",
    estado: "Completo",
    ultimaRevision: "2024-01-15",
    observaciones: "Todo en orden",
  },
  {
    id: 3,
    operario: "Carlos Ruiz",
    dni: "11223344",
    obra: "Hospital Regional",
    puesto: "Albañil",
    casco: "Entregado",
    chaleco: "Pendiente",
    botas: "Entregado",
    guantes: "Dañado",
    gafas: "Entregado",
    estado: "Incompleto",
    ultimaRevision: "2024-01-08",
    observaciones: "Reemplazar guantes dañados",
  },
]

const capacitacionData = [
  {
    id: 1,
    operario: "Juan Pérez",
    dni: "12345678",
    obra: "Torre Residencial Norte",
    curso: "Seguridad en Alturas",
    estado: "Completado",
    fechaInicio: "2024-01-05",
    fechaVencimiento: "2025-01-05",
    certificado: "Sí",
    instructor: "Lic. Ana Martín",
    horas: 8,
    calificacion: 95,
  },
  {
    id: 2,
    operario: "María González",
    dni: "87654321",
    obra: "Centro Comercial Sur",
    curso: "Riesgos Eléctricos",
    estado: "En Progreso",
    fechaInicio: "2024-01-10",
    fechaVencimiento: "2025-01-10",
    certificado: "Pendiente",
    instructor: "Lic. Roberto Silva",
    horas: 12,
    calificacion: 0,
  },
  {
    id: 3,
    operario: "Carlos Ruiz",
    dni: "11223344",
    obra: "Hospital Regional",
    curso: "Primeros Auxilios",
    estado: "Vencido",
    fechaInicio: "2023-06-15",
    fechaVencimiento: "2024-06-15",
    certificado: "Vencido",
    instructor: "Dr. Laura Vega",
    horas: 16,
    calificacion: 88,
  },
]

const eppPorTipo = [
  { tipo: "Cascos", entregados: 45, pendientes: 3, dañados: 2 },
  { tipo: "Chalecos", entregados: 42, pendientes: 5, dañados: 3 },
  { tipo: "Botas", entregados: 38, pendientes: 8, dañados: 4 },
  { tipo: "Guantes", entregados: 40, pendientes: 6, dañados: 4 },
  { tipo: "Gafas", entregados: 35, pendientes: 10, dañados: 5 },
]

const capacitacionesPorMes = [
  { mes: "Ene", programadas: 25, completadas: 22, pendientes: 3 },
  { mes: "Feb", programadas: 18, completadas: 16, pendientes: 2 },
  { mes: "Mar", programadas: 32, completadas: 28, pendientes: 4 },
  { mes: "Abr", programadas: 21, completadas: 19, pendientes: 2 },
]

const distribucionCertificaciones = [
  { name: "Vigentes", value: 65, color: "#22c55e" },
  { name: "Por Vencer", value: 20, color: "#f59e0b" },
  { name: "Vencidas", value: 15, color: "#ef4444" },
]

export default function EPPCapacitacion() {
  const [activeTab, setActiveTab] = useState("epp")
  const [filtroObra, setFiltroObra] = useState("todas")
  const [filtroEstado, setFiltroEstado] = useState("todos")
  const [busqueda, setBusqueda] = useState("")
  const [itemSeleccionado, setItemSeleccionado] = useState(null)

  const eppFiltrado = eppData.filter((item) => {
    const coincideObra = filtroObra === "todas" || item.obra.includes(filtroObra)
    const coincideEstado = filtroEstado === "todos" || item.estado === filtroEstado
    const coincideBusqueda =
      item.operario.toLowerCase().includes(busqueda.toLowerCase()) ||
      item.dni.includes(busqueda) ||
      item.obra.toLowerCase().includes(busqueda.toLowerCase())

    return coincideObra && coincideEstado && coincideBusqueda
  })

  const capacitacionFiltrada = capacitacionData.filter((item) => {
    const coincideObra = filtroObra === "todas" || item.obra.includes(filtroObra)
    const coincideEstado = filtroEstado === "todos" || item.estado === filtroEstado
    const coincideBusqueda =
      item.operario.toLowerCase().includes(busqueda.toLowerCase()) ||
      item.dni.includes(busqueda) ||
      item.curso.toLowerCase().includes(busqueda.toLowerCase())

    return coincideObra && coincideEstado && coincideBusqueda
  })

  const getEstadoBadge = (estado) => {
    const variants = {
      Completo: "bg-green-100 text-green-800",
      Incompleto: "bg-red-100 text-red-800",
      Completado: "bg-green-100 text-green-800",
      "En Progreso": "bg-blue-100 text-blue-800",
      Vencido: "bg-red-100 text-red-800",
      Pendiente: "bg-yellow-100 text-yellow-800",
    }
    return variants[estado] || "bg-gray-100 text-gray-800"
  }

  const getEPPBadge = (estado) => {
    const variants = {
      Entregado: "bg-green-100 text-green-800",
      Pendiente: "bg-yellow-100 text-yellow-800",
      Dañado: "bg-red-100 text-red-800",
      Vencido: "bg-red-100 text-red-800",
    }
    return variants[estado] || "bg-gray-100 text-gray-800"
  }

  return (
    <div className="min-h-screen bg-background p-4 ml-[10%]">
      <div className="w-[1500px]">
        <div className="mb-8 ">
          <p className="text-muted-foreground text-lg mt-20">
            Panel de control para licenciados en seguridad e higiene
          </p>
        </div>
            </div>
            <div className="flex gap-6">
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <Shield className="w-4 h-4" />
                    Asignar EPP
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Asignar Equipos de Protección</DialogTitle>
                    <DialogDescription>Complete los datos para asignar EPP a un operario</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="operario">Operario</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar operario" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="juan">Juan Pérez</SelectItem>
                          <SelectItem value="maria">María González</SelectItem>
                          <SelectItem value="carlos">Carlos Ruiz</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Equipos a Asignar</Label>
                      <div className="space-y-2 mt-2">
                        <label className="flex items-center space-x-2">
                          <input type="checkbox" className="rounded" />
                          <span className="text-sm">Casco de Seguridad</span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input type="checkbox" className="rounded" />
                          <span className="text-sm">Chaleco Reflectivo</span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input type="checkbox" className="rounded" />
                          <span className="text-sm">Botas de Seguridad</span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input type="checkbox" className="rounded" />
                          <span className="text-sm">Guantes</span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input type="checkbox" className="rounded" />
                          <span className="text-sm">Gafas de Seguridad</span>
                        </label>
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="observaciones">Observaciones</Label>
                      <Textarea placeholder="Observaciones adicionales..." />
                    </div>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">Asignar EPP</Button>
                  </div>
                </DialogContent>
              </Dialog>

              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-green-600 hover:bg-green-700">
                    <GraduationCap className="w-4 h-4" />
                    Nueva Capacitación
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Programar Capacitación</DialogTitle>
                    <DialogDescription>Complete los datos para programar una nueva capacitación</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="curso">Tipo de Curso</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar curso" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="alturas">Seguridad en Alturas</SelectItem>
                          <SelectItem value="electrico">Riesgos Eléctricos</SelectItem>
                          <SelectItem value="primeros">Primeros Auxilios</SelectItem>
                          <SelectItem value="incendios">Prevención de Incendios</SelectItem>
                          <SelectItem value="espacios">Espacios Confinados</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="instructor">Instructor</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar instructor" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ana">Lic. Ana Martín</SelectItem>
                          <SelectItem value="roberto">Lic. Roberto Silva</SelectItem>
                          <SelectItem value="laura">Dr. Laura Vega</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="fecha">Fecha de Inicio</Label>
                      <Input type="date" />
                    </div>
                    <div>
                      <Label htmlFor="horas">Duración (horas)</Label>
                      <Input type="number" placeholder="8" />
                    </div>
                    <Button className="w-full bg-green-600 hover:bg-green-700">Programar Capacitación</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 ">
              <CardTitle className="text-sm font-medium">EPP Completo</CardTitle>
              <Shield className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">85%</div>
              <p className="text-xs text-slate-600">42 de 50 operarios</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 ">
              <CardTitle className="text-sm font-medium">Capacitaciones Vigentes</CardTitle>
              <GraduationCap className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">65%</div>
              <p className="text-xs text-slate-600">33 certificaciones activas</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 ">
              <CardTitle className="text-sm font-medium">EPP Pendiente</CardTitle>
              <AlertTriangle className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">32</div>
              <p className="text-xs text-slate-600">Equipos por entregar</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 ">
              <CardTitle className="text-sm font-medium">Certificaciones Vencidas</CardTitle>
              <Clock className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-slate-600">Requieren renovación</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="gap-8 mt-8">
            <CardHeader>
              <CardTitle>Estado de EPP por Tipo</CardTitle>
              <CardDescription>Distribución de equipos entregados, pendientes y dañados</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={eppPorTipo}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="tipo" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="entregados" fill="#22c55e" name="Entregados" />
                  <Bar dataKey="pendientes" fill="#f59e0b" name="Pendientes" />
                  <Bar dataKey="dañados" fill="#ef4444" name="Dañados" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

        <Card className="gap-8 mt-8">
            <CardHeader>
              <CardTitle>Capacitaciones por Mes</CardTitle>
              <CardDescription>Programadas vs Completadas</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={capacitacionesPorMes}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="mes" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="programadas" stroke="#3b82f6" name="Programadas" />
                  <Line type="monotone" dataKey="completadas" stroke="#22c55e" name="Completadas" />
                  <Line type="monotone" dataKey="pendientes" stroke="#f59e0b" name="Pendientes" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <Card className="gap-8 mt-8">
          <CardHeader>
            <CardTitle>Estado de Certificaciones</CardTitle>
            <CardDescription>Distribución de certificaciones por estado</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={distribucionCertificaciones}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  dataKey="value"
                >
                  {distribucionCertificaciones.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="gap-8 mt-8">
          <CardHeader>
            <CardTitle>Gestión Detallada</CardTitle>
            <CardDescription>Control de EPP y capacitaciones por operario</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="epp" className="flex items-center gap-2">
                  <HardHat className="w-4 h-4" />
                  Equipos de Protección
                </TabsTrigger>
                <TabsTrigger value="capacitacion" className="flex items-center gap-2">
                  <GraduationCap className="w-4 h-4" />
                  Capacitaciones
                </TabsTrigger>
              </TabsList>

              <div className="flex flex-col md:flex-row gap-4 my-8">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                    <Input
                      placeholder="Buscar por operario, DNI u obra..."
                      value={busqueda}
                      onChange={(e) => setBusqueda(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Select value={filtroObra} onValueChange={setFiltroObra}>
                  <SelectTrigger className="w-full md:w-48">
                    <SelectValue placeholder="Obra" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todas">Todas las obras</SelectItem>
                    <SelectItem value="Torre">Torre Residencial Norte</SelectItem>
                    <SelectItem value="Centro">Centro Comercial Sur</SelectItem>
                    <SelectItem value="Hospital">Hospital Regional</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={filtroEstado} onValueChange={setFiltroEstado}>
                  <SelectTrigger className="w-full md:w-48">
                    <SelectValue placeholder="Estado" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos los estados</SelectItem>
                    {activeTab === "epp" ? (
                      <>
                        <SelectItem value="Completo">Completo</SelectItem>
                        <SelectItem value="Incompleto">Incompleto</SelectItem>
                      </>
                    ) : (
                      <>
                        <SelectItem value="Completado">Completado</SelectItem>
                        <SelectItem value="En Progreso">En Progreso</SelectItem>
                        <SelectItem value="Vencido">Vencido</SelectItem>
                      </>
                    )}
                  </SelectContent>
                </Select>
                <Button
                  variant="outline"
                  onClick={() => {
                    setBusqueda("")
                    setFiltroObra("todas")
                    setFiltroEstado("todos")
                  }}
                >
                  Limpiar Filtros
                </Button>
              </div>

              <TabsContent value="epp" className="space-y-4">
                {eppFiltrado.map((item) => (
                  <div key={item.id} className="border rounded-lg p-4 hover:bg-slate-50 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold text-slate-900">{item.operario}</h3>
                          <Badge className={getEstadoBadge(item.estado)}>{item.estado}</Badge>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-slate-600 mb-3">
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4" />
                            <span>DNI: {item.dni}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4" />
                            <span>{item.obra}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <HardHat className="w-4 h-4" />
                            <span>{item.puesto}</span>
                          </div>
                        </div>
                        <div className="grid grid-cols-5 gap-2 mb-2">
                          <div className="text-center">
                            <Badge className={getEPPBadge(item.casco)} size="sm">
                              Casco
                            </Badge>
                          </div>
                          <div className="text-center">
                            <Badge className={getEPPBadge(item.chaleco)} size="sm">
                              Chaleco
                            </Badge>
                          </div>
                          <div className="text-center">
                            <Badge className={getEPPBadge(item.botas)} size="sm">
                              Botas
                            </Badge>
                          </div>
                          <div className="text-center">
                            <Badge className={getEPPBadge(item.guantes)} size="sm">
                              Guantes
                            </Badge>
                          </div>
                          <div className="text-center">
                            <Badge className={getEPPBadge(item.gafas)} size="sm">
                              Gafas
                            </Badge>
                          </div>
                        </div>
                        <p className="text-sm text-slate-500 italic">{item.observaciones}</p>
                      </div>
                      <div className="flex flex-col items-end gap-2 ml-4">
                        <div className="text-right">
                          <div className="text-xs text-slate-500">Última revisión</div>
                          <div className="text-sm font-medium">
                            {new Date(item.ultimaRevision).toLocaleDateString()}
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          <FileText className="w-4 h-4 mr-1" />
                          Gestionar EPP
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </TabsContent>

              <TabsContent value="capacitacion" className="space-y-4">
                {capacitacionFiltrada.map((item) => (
                  <div key={item.id} className="border rounded-lg p-4 hover:bg-slate-50 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold text-slate-900">{item.operario}</h3>
                          <Badge className={getEstadoBadge(item.estado)}>{item.estado}</Badge>
                          {item.certificado === "Sí" && (
                            <Badge className="bg-blue-100 text-blue-800">Certificado</Badge>
                          )}
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-slate-600 mb-3">
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4" />
                            <span>DNI: {item.dni}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4" />
                            <span>{item.obra}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <GraduationCap className="w-4 h-4" />
                            <span>{item.curso}</span>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <span className="text-slate-500">Instructor:</span>
                            <div className="font-medium">{item.instructor}</div>
                          </div>
                          <div>
                            <span className="text-slate-500">Duración:</span>
                            <div className="font-medium">{item.horas}h</div>
                          </div>
                          <div>
                            <span className="text-slate-500">Inicio:</span>
                            <div className="font-medium">{new Date(item.fechaInicio).toLocaleDateString()}</div>
                          </div>
                          <div>
                            <span className="text-slate-500">Vencimiento:</span>
                            <div className="font-medium">{new Date(item.fechaVencimiento).toLocaleDateString()}</div>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2 ml-4">
                        <div className="text-right">
                          {item.calificacion > 0 && (
                            <>
                              <div className="text-xs text-slate-500">Calificación</div>
                              <div className="text-lg font-bold text-green-600">{item.calificacion}%</div>
                            </>
                          )}
                        </div>
                        <Button variant="outline" size="sm">
                          <Award className="w-4 h-4 mr-1" />
                          Ver Certificado
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
  )
}
