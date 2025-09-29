"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Building2, Plus, Search, Edit, Trash2, Eye, MapPin, Calendar, DollarSign, Users } from "lucide-react"

// Datos iniciales de obras
const obrasIniciales = [
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
    telefono: "+54 11 4567-8901",
    email: "torre.norte@construcciones.com",
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
    telefono: "+54 11 4567-8902",
    email: "centro.sur@construcciones.com",
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
    telefono: "+54 11 4567-8903",
    email: "industrial.este@construcciones.com",
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
    telefono: "+54 11 4567-8904",
    email: "puente.oeste@construcciones.com",
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
    telefono: "+54 11 4567-8905",
    email: "hospital.centro@construcciones.com",
  },
]

export default function MisObras() {
  const [obras, setObras] = useState(obrasIniciales)
  const [busqueda, setBusqueda] = useState("")
  const [filtroEstado, setFiltroEstado] = useState("todos")
  const [dialogAbierto, setDialogAbierto] = useState(false)
  const [obraEditando, setObraEditando] = useState<number | null>(null)

  // Formulario para nueva obra
  const [formData, setFormData] = useState({
    nombre: "",
    ubicacion: "",
    estado: "Planificación",
    fechaInicio: "",
    fechaEstimada: "",
    presupuesto: "",
    ingeniero: "",
    licenciado: "",
    trabajadores: "",
    telefono: "",
    email: "",
  })

  // Filtrar obras
  const obrasFiltradas = obras.filter((obra) => {
    const coincideBusqueda =
      obra.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      obra.ubicacion.toLowerCase().includes(busqueda.toLowerCase()) ||
      obra.ingeniero.toLowerCase().includes(busqueda.toLowerCase())

    const coincideEstado = filtroEstado === "todos" || obra.estado === filtroEstado

    return coincideBusqueda && coincideEstado
  })

  // Manejar cambios en el formulario
  const handleInputChange = (campo: string, valor: string) => {
    setFormData((prev) => ({ ...prev, [campo]: valor }))
  }

  // Crear nueva obra
  const handleCrearObra = () => {
    const nuevaObra = {
      id: obras.length + 1,
      nombre: formData.nombre,
      ubicacion: formData.ubicacion,
      estado: formData.estado,
      progreso: 0,
      fechaInicio: formData.fechaInicio,
      fechaEstimada: formData.fechaEstimada,
      presupuesto: Number.parseInt(formData.presupuesto),
      gastado: 0,
      ingeniero: formData.ingeniero,
      licenciado: formData.licenciado,
      trabajadores: Number.parseInt(formData.trabajadores),
      incidentes: 0,
      telefono: formData.telefono,
      email: formData.email,
    }

    setObras([...obras, nuevaObra])
    setDialogAbierto(false)
    resetFormulario()
  }

  // Eliminar obra
  const handleEliminarObra = (id: number) => {
    if (confirm("¿Estás seguro de que deseas eliminar esta obra?")) {
      setObras(obras.filter((obra) => obra.id !== id))
    }
  }

  // Resetear formulario
  const resetFormulario = () => {
    setFormData({
      nombre: "",
      ubicacion: "",
      estado: "Planificación",
      fechaInicio: "",
      fechaEstimada: "",
      presupuesto: "",
      ingeniero: "",
      licenciado: "",
      trabajadores: "",
      telefono: "",
      email: "",
    })
    setObraEditando(null)
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-2 flex items-center gap-3">
                <Building2 className="h-10 w-10 text-primary" />
                Gestión de Obras
              </h1>
              <p className="text-muted-foreground text-lg">Administra todas las obras de construcción</p>
            </div>
            <Dialog open={dialogAbierto} onOpenChange={setDialogAbierto}>
              <DialogTrigger asChild>
                <Button size="lg" className="gap-2">
                  <Plus className="h-5 w-5" />
                  Nueva Obra
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Crear Nueva Obra</DialogTitle>
                  <DialogDescription>
                    Completa los datos para registrar una nueva obra de construcción
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="nombre">Nombre de la Obra *</Label>
                      <Input
                        id="nombre"
                        placeholder="Ej: Torre Residencial"
                        value={formData.nombre}
                        onChange={(e) => handleInputChange("nombre", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="estado">Estado *</Label>
                      <Select value={formData.estado} onValueChange={(value) => handleInputChange("estado", value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Planificación">Planificación</SelectItem>
                          <SelectItem value="En Progreso">En Progreso</SelectItem>
                          <SelectItem value="Finalizado">Finalizado</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="ubicacion">Ubicación *</Label>
                    <Input
                      id="ubicacion"
                      placeholder="Dirección completa"
                      value={formData.ubicacion}
                      onChange={(e) => handleInputChange("ubicacion", e.target.value)}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="fechaInicio">Fecha de Inicio *</Label>
                      <Input
                        id="fechaInicio"
                        type="date"
                        value={formData.fechaInicio}
                        onChange={(e) => handleInputChange("fechaInicio", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="fechaEstimada">Fecha Estimada de Finalización *</Label>
                      <Input
                        id="fechaEstimada"
                        type="date"
                        value={formData.fechaEstimada}
                        onChange={(e) => handleInputChange("fechaEstimada", e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="presupuesto">Presupuesto ($) *</Label>
                      <Input
                        id="presupuesto"
                        type="number"
                        placeholder="2500000"
                        value={formData.presupuesto}
                        onChange={(e) => handleInputChange("presupuesto", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="trabajadores">Cantidad de Trabajadores *</Label>
                      <Input
                        id="trabajadores"
                        type="number"
                        placeholder="45"
                        value={formData.trabajadores}
                        onChange={(e) => handleInputChange("trabajadores", e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="ingeniero">Ingeniero Responsable *</Label>
                      <Input
                        id="ingeniero"
                        placeholder="Ing. Juan Pérez"
                        value={formData.ingeniero}
                        onChange={(e) => handleInputChange("ingeniero", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="licenciado">Licenciado en Seguridad *</Label>
                      <Input
                        id="licenciado"
                        placeholder="Lic. María García"
                        value={formData.licenciado}
                        onChange={(e) => handleInputChange("licenciado", e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="telefono">Teléfono *</Label>
                      <Input
                        id="telefono"
                        placeholder="+54 11 1234-5678"
                        value={formData.telefono}
                        onChange={(e) => handleInputChange("telefono", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="obra@construcciones.com"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex justify-end gap-3">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setDialogAbierto(false)
                      resetFormulario()
                    }}
                  >
                    Cancelar
                  </Button>
                  <Button onClick={handleCrearObra} disabled={!formData.nombre || !formData.ubicacion}>
                    Crear Obra
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Métricas rápidas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Obras</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">{obras.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">En Progreso</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">
                {obras.filter((o) => o.estado === "En Progreso").length}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Planificación</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">
                {obras.filter((o) => o.estado === "Planificación").length}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Finalizadas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-chart-2">
                {obras.filter((o) => o.estado === "Finalizado").length}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filtros y búsqueda */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Filtros</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar por nombre, ubicación o ingeniero..."
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={filtroEstado} onValueChange={setFiltroEstado}>
                <SelectTrigger className="w-full md:w-[200px]">
                  <SelectValue placeholder="Estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos los estados</SelectItem>
                  <SelectItem value="Planificación">Planificación</SelectItem>
                  <SelectItem value="En Progreso">En Progreso</SelectItem>
                  <SelectItem value="Finalizado">Finalizado</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Tabla de obras */}
        <Card>
          <CardHeader>
            <CardTitle>Listado de Obras</CardTitle>
            <CardDescription>
              {obrasFiltradas.length} obra{obrasFiltradas.length !== 1 ? "s" : ""} encontrada
              {obrasFiltradas.length !== 1 ? "s" : ""}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Obra</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Progreso</TableHead>
                    <TableHead>Fechas</TableHead>
                    <TableHead>Presupuesto</TableHead>
                    <TableHead>Personal</TableHead>
                    <TableHead>Responsables</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {obrasFiltradas.map((obra) => (
                    <TableRow key={obra.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium text-foreground">{obra.nombre}</div>
                          <div className="text-sm text-muted-foreground flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {obra.ubicacion}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
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
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="w-20 bg-muted rounded-full h-2">
                            <div
                              className="bg-primary h-2 rounded-full transition-all"
                              style={{ width: `${obra.progreso}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium">{obra.progreso}%</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <Calendar className="h-3 w-3" />
                            {new Date(obra.fechaInicio).toLocaleDateString("es-ES")}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            → {new Date(obra.fechaEstimada).toLocaleDateString("es-ES")}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div className="flex items-center gap-1 font-medium">
                            <DollarSign className="h-3 w-3" />
                            {(obra.presupuesto / 1000000).toFixed(1)}M
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Gastado: {(obra.gastado / 1000000).toFixed(1)}M
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">{obra.trabajadores}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div className="font-medium">{obra.ingeniero}</div>
                          <div className="text-xs text-muted-foreground">{obra.licenciado}</div>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="sm" onClick={() => (window.location.href = "/")}>
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => handleEliminarObra(obra.id)}>
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
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
