"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { Building2, Users, AlertTriangle, MapPin, Phone, Mail, Clock } from "lucide-react"

// Datos de muestra para las obras
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

// Datos para los gráficos
const timelineData = obrasData.map((obra) => ({
  nombre: obra.nombre.split(" ").slice(0, 2).join(" "),
  progreso: obra.progreso,
  presupuesto: obra.presupuesto / 1000000,
}))

const budgetTrendData = [
  { mes: "Ene", presupuestado: 800, gastado: 750 },
  { mes: "Feb", presupuestado: 1200, gastado: 1100 },
  { mes: "Mar", presupuestado: 1000, gastado: 1150 },
  { mes: "Abr", presupuestado: 1400, gastado: 1300 },
  { mes: "May", presupuestado: 1600, gastado: 1450 },
  { mes: "Jun", presupuestado: 1800, gastado: 1700 },
]

const resourceData = [
  { name: "Personal", value: 35, color: "var(--chart-1)" },
  { name: "Materiales", value: 40, color: "var(--chart-2)" },
  { name: "Equipos", value: 15, color: "var(--chart-3)" },
  { name: "Otros", value: 10, color: "var(--chart-4)" },
]

const riskData = obrasData.map((obra) => ({
  x: obra.progreso,
  y: obra.incidentes,
  nombre: obra.nombre.split(" ").slice(0, 2).join(" "),
}))

const safetyData = [
  { obra: "Torre Norte", incidentes: 2, trabajadores: 45 },
  { obra: "Centro Sur", incidentes: 0, trabajadores: 12 },
  { obra: "Industrial", incidentes: 1, trabajadores: 78 },
  { obra: "Puente", incidentes: 0, trabajadores: 25 },
  { obra: "Hospital", incidentes: 3, trabajadores: 95 },
]

export default function IngenieroDashboard() {
  const [obraSeleccionada, setObraSeleccionada] = useState<number | null>(null)

  const obra = obraSeleccionada ? obrasData.find((o) => o.id === obraSeleccionada) : null

  if (obra) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground">{obra.nombre}</h1>
              <p className="text-muted-foreground flex items-center gap-2 mt-2">
                <MapPin className="h-4 w-4" />
                {obra.ubicacion}
              </p>
            </div>
            <Badge
              variant={
                obra.estado === "Finalizado" ? "default" : obra.estado === "En Progreso" ? "secondary" : "outline"
              }
              className="text-sm px-3 py-1"
            >
              {obra.estado}
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Progreso</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">{obra.progreso}%</div>
                <div className="w-full bg-muted rounded-full h-2 mt-2">
                  <div
                    className="bg-primary h-2 rounded-full transition-all duration-300"
                    style={{ width: `${obra.progreso}%` }}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Presupuesto</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">${(obra.presupuesto / 1000000).toFixed(1)}M</div>
                <p className="text-sm text-muted-foreground">Gastado: ${(obra.gastado / 1000000).toFixed(1)}M</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Trabajadores</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground flex items-center gap-2">
                  <Users className="h-6 w-6 text-primary" />
                  {obra.trabajadores}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Incidentes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold flex items-center gap-2">
                  <AlertTriangle className={`h-6 w-6 ${obra.incidentes > 0 ? "text-destructive" : "text-chart-2"}`} />
                  <span className={obra.incidentes > 0 ? "text-destructive" : "text-chart-2"}>{obra.incidentes}</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5 text-primary" />
                  Información del Proyecto
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Fecha de Inicio</p>
                    <p className="text-foreground">{new Date(obra.fechaInicio).toLocaleDateString("es-ES")}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Fecha Estimada</p>
                    <p className="text-foreground">{new Date(obra.fechaEstimada).toLocaleDateString("es-ES")}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Ingeniero Responsable</p>
                  <p className="text-foreground">{obra.ingeniero}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Licenciado en Seguridad</p>
                  <p className="text-foreground">{obra.licenciado}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="h-5 w-5 text-primary" />
                  Contacto
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-foreground">{obra.telefono}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-foreground">{obra.email}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-foreground">Lun - Vie: 8:00 - 18:00</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Análisis Financiero</CardTitle>
              <CardDescription>Comparación entre presupuesto y gastos reales</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={[
                      {
                        categoria: "Presupuesto",
                        presupuestado: obra.presupuesto / 1000000,
                        gastado: obra.gastado / 1000000,
                      },
                    ]}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="categoria" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`$${value}M`, ""]} />
                    <Legend />
                    <Bar dataKey="presupuestado" fill="var(--chart-1)" name="Presupuestado" />
                    <Bar dataKey="gastado" fill="var(--chart-2)" name="Gastado" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen  bg-background p-6">
       <div className=" w-400">
        <div className="mb-8">
          <p className="text-muted-foreground text-lg mt-15">
            Panel de control para ingenieros en seguridad e higiene
          </p>
        </div>

        {/* Métricas principales */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Obras</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">{obrasData.length}</div>
              <p className="text-sm text-muted-foreground">Proyectos activos</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Trabajadores</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">
                {obrasData.reduce((sum, obra) => sum + obra.trabajadores, 0)}
              </div>
              <p className="text-sm text-muted-foreground">Personal total</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Presupuesto Total</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">
                ${(obrasData.reduce((sum, obra) => sum + obra.presupuesto, 0) / 1000000).toFixed(1)}M
              </div>
              <p className="text-sm text-muted-foreground">Inversión total</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Incidentes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-destructive">
                {obrasData.reduce((sum, obra) => sum + obra.incidentes, 0)}
              </div>
              <p className="text-sm text-muted-foreground">Total reportados</p>
            </CardContent>
          </Card>
        </div>

        {/* Gráficos principales */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Gráfico 1: Progreso por Obra */}
          <Card>
            <CardHeader>
              <CardTitle>Progreso por Obra</CardTitle>
              <CardDescription>Comparación del avance de cada proyecto</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={timelineData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="nombre" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="progreso" fill="var(--chart-1)" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Gráfico 2: Tendencia Presupuestaria */}
          <Card>
            <CardHeader>
              <CardTitle>Tendencia Presupuestaria</CardTitle>
              <CardDescription>Presupuesto vs gastos reales por mes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={budgetTrendData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="mes" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`$${value}K`, ""]} />
                    <Legend />
                    <Line type="monotone" dataKey="presupuestado" stroke="var(--chart-1)" name="Presupuestado" />
                    <Line type="monotone" dataKey="gastado" stroke="var(--chart-2)" name="Gastado" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Gráfico 3: Distribución de Recursos */}
          <Card>
            <CardHeader>
              <CardTitle>Distribución de Recursos</CardTitle>
              <CardDescription>Asignación de presupuesto por categoría</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={resourceData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}%`}
                    >
                      {resourceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Gráfico 4: Análisis de Riesgos */}
          <Card>
            <CardHeader>
              <CardTitle>Análisis de Riesgos</CardTitle>
              <CardDescription>Relación entre progreso e incidentes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <ScatterChart data={riskData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="x" name="Progreso %" />
                    <YAxis dataKey="y" name="Incidentes" />
                    <Tooltip cursor={{ strokeDasharray: "3 3" }} />
                    <Scatter dataKey="y" fill="var(--chart-4)" />
                  </ScatterChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Gráfico 5: Indicadores de Seguridad */}
          <Card>
            <CardHeader>
              <CardTitle>Indicadores de Seguridad</CardTitle>
              <CardDescription>Incidentes por obra</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={safetyData} layout="horizontal">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="obra" type="category" width={60} />
                    <Tooltip />
                    <Bar dataKey="incidentes" fill="var(--chart-5)" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Lista de Obras */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5 text-primary" />
              Obras en Desarrollo
            </CardTitle>
            <CardDescription>Haz clic en una obra para ver los detalles completos</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {obrasData.map((obra) => (
                <Card
                  key={obra.id}
                  className="cursor-pointer hover:shadow-lg transition-all duration-200 hover:border-primary"
                  onClick={() => setObraSeleccionada(obra.id)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{obra.nombre}</CardTitle>
                      <Badge
                        variant={
                          obra.estado === "Finalizado"
                            ? "default"
                            : obra.estado === "En Progreso"
                              ? "secondary"
                              : "outline"
                        }
                        className="text-xs"
                      >
                        {obra.estado}
                      </Badge>
                    </div>
                    <CardDescription className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {obra.ubicacion}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Progreso</span>
                          <span className="font-medium">{obra.progreso}%</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div
                            className="bg-primary h-2 rounded-full transition-all duration-300"
                            style={{ width: `${obra.progreso}%` }}
                          />
                        </div>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-muted-foreground">Trabajadores:</span>
                        <span className="font-medium">{obra.trabajadores}</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-muted-foreground">Incidentes:</span>
                        <span className={`font-medium ${obra.incidentes > 0 ? "text-destructive" : "text-chart-2"}`}>
                          {obra.incidentes}
                        </span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-muted-foreground">Presupuesto:</span>
                        <span className="font-medium">${(obra.presupuesto / 1000000).toFixed(1)}M</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
