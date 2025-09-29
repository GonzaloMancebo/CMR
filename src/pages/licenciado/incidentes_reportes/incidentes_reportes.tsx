"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { AlertTriangle, Plus, Search, Filter, HardHat, Phone, Mail, Calendar, MapPin } from "lucide-react"

// Datos de operarios con información de seguridad
const operariosData = [
  {
    id: 1,
    nombre: "Juan Carlos Pérez",
    dni: "12.345.678",
    puesto: "Soldador",
    obra: "Torre Residencial Norte",
    telefono: "+54 11 1234-5678",
    email: "juan.perez@construcciones.com",
    fechaIngreso: "2024-01-15",
    capacitaciones: ["Soldadura", "Seguridad Industrial", "Primeros Auxilios"],
    incidentes: 1,
    ultimoIncidente: "2024-06-15",
    estado: "Activo",
    riesgoNivel: "Medio",
  },
  {
    id: 2,
    nombre: "María Elena González",
    dni: "23.456.789",
    puesto: "Operadora de Grúa",
    obra: "Centro Comercial Sur",
    telefono: "+54 11 2345-6789",
    email: "maria.gonzalez@construcciones.com",
    fechaIngreso: "2024-02-01",
    capacitaciones: ["Operación de Grúa", "Seguridad en Altura", "Manejo Defensivo"],
    incidentes: 0,
    ultimoIncidente: null,
    estado: "Activo",
    riesgoNivel: "Alto",
  },
  {
    id: 3,
    nombre: "Roberto Silva Martínez",
    dni: "34.567.890",
    puesto: "Electricista",
    obra: "Complejo Industrial Este",
    telefono: "+54 11 3456-7890",
    email: "roberto.silva@construcciones.com",
    fechaIngreso: "2023-11-10",
    capacitaciones: ["Electricidad Industrial", "Riesgo Eléctrico", "Seguridad Industrial"],
    incidentes: 2,
    ultimoIncidente: "2024-05-20",
    estado: "Activo",
    riesgoNivel: "Alto",
  },
  {
    id: 4,
    nombre: "Ana Lucía Fernández",
    dni: "45.678.901",
    puesto: "Supervisora de Obra",
    obra: "Hospital Regional Centro",
    telefono: "+54 11 4567-8901",
    email: "ana.fernandez@construcciones.com",
    fechaIngreso: "2023-08-15",
    capacitaciones: ["Supervisión", "Gestión de Riesgos", "Liderazgo", "Primeros Auxilios"],
    incidentes: 0,
    ultimoIncidente: null,
    estado: "Activo",
    riesgoNivel: "Bajo",
  },
  {
    id: 5,
    nombre: "Diego Alejandro López",
    dni: "56.789.012",
    puesto: "Albañil",
    obra: "Torre Residencial Norte",
    telefono: "+54 11 5678-9012",
    email: "diego.lopez@construcciones.com",
    fechaIngreso: "2024-03-01",
    capacitaciones: ["Albañilería", "Trabajo en Altura"],
    incidentes: 1,
    ultimoIncidente: "2024-07-10",
    estado: "Activo",
    riesgoNivel: "Medio",
  },
  {
    id: 6,
    nombre: "Carmen Rosa Vega",
    dni: "67.890.123",
    puesto: "Técnica en Seguridad",
    obra: "Complejo Industrial Este",
    telefono: "+54 11 6789-0123",
    email: "carmen.vega@construcciones.com",
    fechaIngreso: "2023-12-01",
    capacitaciones: ["Técnico en Seguridad", "Investigación de Accidentes", "Ergonomía", "Higiene Industrial"],
    incidentes: 0,
    ultimoIncidente: null,
    estado: "Activo",
    riesgoNivel: "Bajo",
  },
  {
    id: 7,
    nombre: "Martín Herrera Castro",
    dni: "78.901.234",
    puesto: "Operario de Máquinas",
    obra: "Centro Comercial Sur",
    telefono: "+54 11 7890-1234",
    email: "martin.herrera@construcciones.com",
    fechaIngreso: "2024-01-20",
    capacitaciones: ["Operación de Maquinaria", "Mantenimiento Preventivo"],
    incidentes: 3,
    ultimoIncidente: "2024-08-05",
    estado: "En Observación",
    riesgoNivel: "Alto",
  },
  {
    id: 8,
    nombre: "Sofía Castro Morales",
    dni: "89.012.345",
    puesto: "Pintora Industrial",
    obra: "Hospital Regional Centro",
    telefono: "+54 11 8901-2345",
    email: "sofia.castro@construcciones.com",
    fechaIngreso: "2024-04-10",
    capacitaciones: ["Pintura Industrial", "Manejo de Químicos", "Protección Respiratoria"],
    incidentes: 0,
    ultimoIncidente: null,
    estado: "Activo",
    riesgoNivel: "Medio",
  },
]

export default function IncidentesReportes() {
  const [operarios, setOperarios] = useState(operariosData)
  const [filtroObra, setFiltroObra] = useState("all")
  const [filtroPuesto, setFiltroPuesto] = useState("all")
  const [busqueda, setBusqueda] = useState("")
  const [dialogAbierto, setDialogAbierto] = useState(false)
  const [operarioSeleccionado, setOperarioSeleccionado] = useState<number | null>(null)
  const [nuevoIncidente, setNuevoIncidente] = useState({
    tipo: "",
    descripcion: "",
    gravedad: "",
    fecha: "",
    hora: "",
  })

  // Filtrar operarios
  const operariosFiltrados = operarios.filter((operario) => {
    const coincideBusqueda =
      operario.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      operario.dni.includes(busqueda) ||
      operario.puesto.toLowerCase().includes(busqueda.toLowerCase())
    const coincideObra = filtroObra === "all" || operario.obra === filtroObra
    const coincidePuesto = filtroPuesto === "all" || operario.puesto === filtroPuesto

    return coincideBusqueda && coincideObra && coincidePuesto
  })

  // Obtener listas únicas para filtros
  const obrasUnicas = [...new Set(operarios.map((op) => op.obra))]
  const puestosUnicos = [...new Set(operarios.map((op) => op.puesto))]

  const handleAgregarIncidente = () => {
    if (operarioSeleccionado && nuevoIncidente.tipo && nuevoIncidente.descripcion) {
      setOperarios((prev) =>
        prev.map((op) =>
          op.id === operarioSeleccionado
            ? {
                ...op,
                incidentes: op.incidentes + 1,
                ultimoIncidente: nuevoIncidente.fecha || new Date().toISOString().split("T")[0],
                estado: op.incidentes >= 2 ? "En Observación" : op.estado,
              }
            : op,
        ),
      )

      setDialogAbierto(false)
      setNuevoIncidente({ tipo: "", descripcion: "", gravedad: "", fecha: "", hora: "" })
      setOperarioSeleccionado(null)
    }
  }

  return (
    <div className="min-h-screen bg-background p-4 ml-[10%]">
      <div className="w-[1500px]">
        <div className="mb-8 ">
          <p className="text-muted-foreground text-lg mt-20">
            Panel de control para licenciados en seguridad e higiene
          </p>
        </div>

        {/* Métricas principales */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <Card>
            <CardHeader >
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Operarios</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">{operarios.length}</div>
              <p className="text-sm text-muted-foreground">Personal activo</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader >
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Incidentes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-destructive">
                {operarios.reduce((sum, op) => sum + op.incidentes, 0)}
              </div>
              <p className="text-sm text-muted-foreground">Reportados</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader >
              <CardTitle className="text-sm font-medium text-muted-foreground">En Observación</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-chart-3">
                {operarios.filter((op) => op.estado === "En Observación").length}
              </div>
              <p className="text-sm text-muted-foreground">Operarios</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader >
              <CardTitle className="text-sm font-medium text-muted-foreground">Sin Incidentes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-chart-2">
                {operarios.filter((op) => op.incidentes === 0).length}
              </div>
              <p className="text-sm text-muted-foreground">Operarios</p>
            </CardContent>
          </Card>
        </div>

        {/* Controles y filtros */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-primary" />
              Filtros y Búsqueda
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label htmlFor="busqueda">Buscar Operario</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="busqueda"
                    placeholder="Nombre, DNI o puesto..."
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Filtrar por Obra</Label>
                <Select value={filtroObra} onValueChange={setFiltroObra}>
                  <SelectTrigger>
                    <SelectValue placeholder="Todas las obras" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas las obras</SelectItem>
                    {obrasUnicas.map((obra) => (
                      <SelectItem key={obra} value={obra}>
                        {obra}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Filtrar por Puesto</Label>
                <Select value={filtroPuesto} onValueChange={setFiltroPuesto}>
                  <SelectTrigger>
                    <SelectValue placeholder="Todos los puestos" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos los puestos</SelectItem>
                    {puestosUnicos.map((puesto) => (
                      <SelectItem key={puesto} value={puesto}>
                        {puesto}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>&nbsp;</Label>
                <Button
                  onClick={() => {
                    setBusqueda("")
                    setFiltroObra("all")
                    setFiltroPuesto("all")
                  }}
                  variant="outline"
                  className="w-full"
                >
                  Limpiar Filtros
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabla principal de operarios */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <HardHat className="h-5 w-5 text-primary" />
                  Registro de Operarios ({operariosFiltrados.length})
                </CardTitle>
                <CardDescription>Gestión completa de personal y seguimiento de incidentes de seguridad</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Operario</TableHead>
                    <TableHead>DNI</TableHead>
                    <TableHead>Puesto</TableHead>
                    <TableHead>Obra</TableHead>
                    <TableHead>Contacto</TableHead>
                    <TableHead>Incidentes</TableHead>
                    <TableHead>Último Incidente</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Riesgo</TableHead>
                    <TableHead>Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {operariosFiltrados.map((operario) => (
                    <TableRow key={operario.id} className="hover:bg-muted/50">
                      <TableCell>
                        <div>
                          <div className="font-medium">{operario.nombre}</div>
                          <div className="text-sm text-muted-foreground">
                            Ingreso: {new Date(operario.fechaIngreso).toLocaleDateString("es-ES")}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="font-mono">{operario.dni}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-xs">
                          {operario.puesto}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1 text-sm">
                          <MapPin className="h-3 w-3 text-muted-foreground" />
                          {operario.obra.split(" ").slice(0, 2).join(" ")}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center gap-1 text-xs">
                            <Phone className="h-3 w-3 text-muted-foreground" />
                            {operario.telefono}
                          </div>
                          <div className="flex items-center gap-1 text-xs">
                            <Mail className="h-3 w-3 text-muted-foreground" />
                            {operario.email.split("@")[0]}@...
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <AlertTriangle
                            className={`h-4 w-4 ${
                              operario.incidentes === 0
                                ? "text-chart-2"
                                : operario.incidentes <= 2
                                  ? "text-chart-3"
                                  : "text-destructive"
                            }`}
                          />
                          <span
                            className={`font-medium ${
                              operario.incidentes === 0
                                ? "text-chart-2"
                                : operario.incidentes <= 2
                                  ? "text-chart-3"
                                  : "text-destructive"
                            }`}
                          >
                            {operario.incidentes}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        {operario.ultimoIncidente ? (
                          <div className="flex items-center gap-1 text-sm">
                            <Calendar className="h-3 w-3 text-muted-foreground" />
                            {new Date(operario.ultimoIncidente).toLocaleDateString("es-ES")}
                          </div>
                        ) : (
                          <span className="text-muted-foreground text-sm">Sin incidentes</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge variant={operario.estado === "Activo" ? "default" : "secondary"} className="text-xs">
                          {operario.estado}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            operario.riesgoNivel === "Bajo"
                              ? "default"
                              : operario.riesgoNivel === "Medio"
                                ? "secondary"
                                : "destructive"
                          }
                          className="text-xs"
                        >
                          {operario.riesgoNivel}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Dialog
                          open={dialogAbierto && operarioSeleccionado === operario.id}
                          onOpenChange={setDialogAbierto}
                        >
                          <DialogTrigger asChild>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => setOperarioSeleccionado(operario.id)}
                              className="flex items-center gap-1"
                            >
                              <Plus className="h-3 w-3" />
                              Incidente
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[500px]">
                            <DialogHeader>
                              <DialogTitle className="flex items-center gap-2">
                                <AlertTriangle className="h-5 w-5 text-destructive" />
                                Reportar Incidente
                              </DialogTitle>
                              <DialogDescription>Registrar nuevo incidente para {operario.nombre}</DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <Label htmlFor="tipo">Tipo de Incidente</Label>
                                  <Select
                                    value={nuevoIncidente.tipo}
                                    onValueChange={(value) => setNuevoIncidente((prev) => ({ ...prev, tipo: value }))}
                                  >
                                    <SelectTrigger>
                                      <SelectValue placeholder="Seleccionar tipo" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="caida">Caída</SelectItem>
                                      <SelectItem value="golpe">Golpe</SelectItem>
                                      <SelectItem value="corte">Corte</SelectItem>
                                      <SelectItem value="quemadura">Quemadura</SelectItem>
                                      <SelectItem value="exposicion">Exposición Química</SelectItem>
                                      <SelectItem value="otro">Otro</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="gravedad">Gravedad</Label>
                                  <Select
                                    value={nuevoIncidente.gravedad}
                                    onValueChange={(value) =>
                                      setNuevoIncidente((prev) => ({ ...prev, gravedad: value }))
                                    }
                                  >
                                    <SelectTrigger>
                                      <SelectValue placeholder="Seleccionar gravedad" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="leve">Leve</SelectItem>
                                      <SelectItem value="moderado">Moderado</SelectItem>
                                      <SelectItem value="grave">Grave</SelectItem>
                                      <SelectItem value="muy-grave">Muy Grave</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <Label htmlFor="fecha">Fecha</Label>
                                  <Input
                                    id="fecha"
                                    type="date"
                                    value={nuevoIncidente.fecha}
                                    onChange={(e) => setNuevoIncidente((prev) => ({ ...prev, fecha: e.target.value }))}
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="hora">Hora</Label>
                                  <Input
                                    id="hora"
                                    type="time"
                                    value={nuevoIncidente.hora}
                                    onChange={(e) => setNuevoIncidente((prev) => ({ ...prev, hora: e.target.value }))}
                                  />
                                </div>
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="descripcion">Descripción del Incidente</Label>
                                <Textarea
                                  id="descripcion"
                                  placeholder="Describe detalladamente lo ocurrido..."
                                  value={nuevoIncidente.descripcion}
                                  onChange={(e) =>
                                    setNuevoIncidente((prev) => ({ ...prev, descripcion: e.target.value }))
                                  }
                                  rows={4}
                                />
                              </div>
                            </div>
                            <DialogFooter>
                              <Button variant="outline" onClick={() => setDialogAbierto(false)}>
                                Cancelar
                              </Button>
                              <Button
                                onClick={handleAgregarIncidente}
                                className="bg-destructive hover:bg-destructive/90"
                              >
                                Reportar Incidente
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
