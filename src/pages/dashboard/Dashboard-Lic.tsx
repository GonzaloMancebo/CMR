"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  Shield,
  AlertTriangle,
  MapPin,
  Phone,
  Mail,
  Clock,
  HardHat,
  FileCheck,
  Activity,
  TrendingUp,
} from "lucide-react";

// Datos de muestra para las obras (mismos datos que ingeniería)
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
    // Datos específicos de seguridad e higiene
    capacitacionesRealizadas: 8,
    capacitacionesPendientes: 2,
    inspeccionesSemana: 3,
    equiposProteccion: 95, // porcentaje de cumplimiento
    cumplimientoNormativo: 88,
    diasSinAccidentes: 45,
    riesgoNivel: "Medio",
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
    capacitacionesRealizadas: 5,
    capacitacionesPendientes: 1,
    inspeccionesSemana: 2,
    equiposProteccion: 100,
    cumplimientoNormativo: 95,
    diasSinAccidentes: 120,
    riesgoNivel: "Bajo",
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
    capacitacionesRealizadas: 12,
    capacitacionesPendientes: 3,
    inspeccionesSemana: 4,
    equiposProteccion: 92,
    cumplimientoNormativo: 85,
    diasSinAccidentes: 30,
    riesgoNivel: "Alto",
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
    capacitacionesRealizadas: 6,
    capacitacionesPendientes: 0,
    inspeccionesSemana: 2,
    equiposProteccion: 100,
    cumplimientoNormativo: 98,
    diasSinAccidentes: 365,
    riesgoNivel: "Bajo",
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
    capacitacionesRealizadas: 15,
    capacitacionesPendientes: 5,
    inspeccionesSemana: 5,
    equiposProteccion: 87,
    cumplimientoNormativo: 82,
    diasSinAccidentes: 15,
    riesgoNivel: "Alto",
  },
];

// Datos específicos para gráficos de seguridad e higiene
const incidentesData = obrasData.map((obra) => ({
  nombre: obra.nombre.split(" ").slice(0, 2).join(" "),
  incidentes: obra.incidentes,
  trabajadores: obra.trabajadores,
  diasSinAccidentes: obra.diasSinAccidentes,
}));

const capacitacionesData = obrasData.map((obra) => ({
  obra: obra.nombre.split(" ").slice(0, 2).join(" "),
  realizadas: obra.capacitacionesRealizadas,
  pendientes: obra.capacitacionesPendientes,
}));

const cumplimientoData = [
  { categoria: "Equipos de Protección", cumplimiento: 94.8 },
  { categoria: "Normativas de Seguridad", cumplimiento: 89.6 },
  { categoria: "Capacitaciones", cumplimiento: 92.3 },
  { categoria: "Inspecciones", cumplimiento: 96.1 },
  { categoria: "Documentación", cumplimiento: 87.4 },
];

const riesgosPorTipoData = [
  { name: "Caídas", value: 35, color: "var(--chart-1)" },
  { name: "Golpes", value: 25, color: "var(--chart-2)" },
  { name: "Cortes", value: 20, color: "var(--chart-3)" },
  { name: "Químicos", value: 12, color: "var(--chart-4)" },
  { name: "Otros", value: 8, color: "var(--chart-5)" },
];

const tendenciaSeguridad = [
  { mes: "Ene", incidentes: 3, capacitaciones: 8, inspecciones: 12 },
  { mes: "Feb", incidentes: 2, capacitaciones: 12, inspecciones: 15 },
  { mes: "Mar", incidentes: 4, capacitaciones: 10, inspecciones: 18 },
  { mes: "Apr", incidentes: 1, capacitaciones: 15, inspecciones: 20 },
  { mes: "May", incidentes: 2, capacitaciones: 18, inspecciones: 22 },
  { mes: "Jun", incidentes: 1, capacitaciones: 20, inspecciones: 25 },
];

const evaluacionRiesgosData = obrasData.map((obra) => ({
  obra: obra.nombre.split(" ").slice(0, 2).join(" "),
  equipos: obra.equiposProteccion,
  normativo: obra.cumplimientoNormativo,
  capacitacion:
    (obra.capacitacionesRealizadas /
      (obra.capacitacionesRealizadas + obra.capacitacionesPendientes)) *
    100,
  inspeccion: obra.inspeccionesSemana * 20, // convertir a porcentaje
  documentacion: obra.cumplimientoNormativo - 5, // simulado
}));

export default function LicenciadoDashboard() {
  const [obraSeleccionada, setObraSeleccionada] = useState<number | null>(null);

  const obra = obraSeleccionada
    ? obrasData.find((o) => o.id === obraSeleccionada)
    : null;

  if (obra) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <Button
                variant="outline"
                onClick={() => setObraSeleccionada(null)}
                className="mb-4"
              >
                ← Volver al Dashboard
              </Button>
              <h1 className="text-3xl font-bold text-foreground">
                {obra.nombre}
              </h1>
              <p className="text-muted-foreground flex items-center gap-2 mt-2">
                <MapPin className="h-4 w-4" />
                {obra.ubicacion}
              </p>
            </div>
            <div className="flex gap-2">
              <Badge
                variant={
                  obra.riesgoNivel === "Bajo"
                    ? "default"
                    : obra.riesgoNivel === "Medio"
                    ? "secondary"
                    : "destructive"
                }
                className="text-sm px-3 py-1"
              >
                Riesgo {obra.riesgoNivel}
              </Badge>
              <Badge
                variant={
                  obra.estado === "Finalizado"
                    ? "default"
                    : obra.estado === "En Progreso"
                    ? "secondary"
                    : "outline"
                }
                className="text-sm px-3 py-1"
              >
                {obra.estado}
              </Badge>
            </div>
          </div>

          {/* Métricas de seguridad específicas */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Días sin Accidentes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-chart-2 flex items-center gap-2">
                  <Shield className="h-6 w-6" />
                  {obra.diasSinAccidentes}
                </div>
                <p className="text-sm text-muted-foreground">
                  Récord de seguridad
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Cumplimiento EPP
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground flex items-center gap-2">
                  <HardHat className="h-6 w-6 text-primary" />
                  {obra.equiposProteccion}%
                </div>
                <div className="w-full bg-muted rounded-full h-2 mt-2">
                  <div
                    className="bg-primary h-2 rounded-full transition-all duration-300"
                    style={{ width: `${obra.equiposProteccion}%` }}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Capacitaciones
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground flex items-center gap-2">
                  <FileCheck className="h-6 w-6 text-chart-3" />
                  {obra.capacitacionesRealizadas}/
                  {obra.capacitacionesRealizadas +
                    obra.capacitacionesPendientes}
                </div>
                <p className="text-sm text-muted-foreground">
                  Realizadas/Total
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Inspecciones/Semana
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground flex items-center gap-2">
                  <Activity className="h-6 w-6 text-chart-4" />
                  {obra.inspeccionesSemana}
                </div>
                <p className="text-sm text-muted-foreground">
                  Controles regulares
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Información detallada de seguridad */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  Información de Seguridad
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Nivel de Riesgo
                    </p>
                    <p
                      className={`font-semibold ${
                        obra.riesgoNivel === "Bajo"
                          ? "text-chart-2"
                          : obra.riesgoNivel === "Medio"
                          ? "text-chart-3"
                          : "text-destructive"
                      }`}
                    >
                      {obra.riesgoNivel}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Cumplimiento Normativo
                    </p>
                    <p className="text-foreground">
                      {obra.cumplimientoNormativo}%
                    </p>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Licenciado Responsable
                  </p>
                  <p className="text-foreground">{obra.licenciado}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Total Trabajadores
                  </p>
                  <p className="text-foreground">
                    {obra.trabajadores} personas
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Incidentes Reportados
                  </p>
                  <p
                    className={`font-semibold ${
                      obra.incidentes > 0 ? "text-destructive" : "text-chart-2"
                    }`}
                  >
                    {obra.incidentes} incidentes
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="h-5 w-5 text-primary" />
                  Contacto de Emergencia
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
                  <span className="text-foreground">24/7 Emergencias</span>
                </div>
                <div className="mt-4 p-3 bg-destructive/10 rounded-lg">
                  <p className="text-sm font-medium text-destructive">
                    Emergencias: 911
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Bomberos, Ambulancia, Policía
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Gráfico de evaluación de riesgos específico de la obra */}
          <Card>
            <CardHeader>
              <CardTitle>Evaluación de Riesgos - {obra.nombre}</CardTitle>
              <CardDescription>
                Análisis multidimensional de seguridad e higiene
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart
                    data={[
                      {
                        obra: obra.nombre.split(" ").slice(0, 2).join(" "),
                        equipos: obra.equiposProteccion,
                        normativo: obra.cumplimientoNormativo,
                        capacitacion:
                          (obra.capacitacionesRealizadas /
                            (obra.capacitacionesRealizadas +
                              obra.capacitacionesPendientes)) *
                          100,
                        inspeccion: obra.inspeccionesSemana * 20,
                        documentacion: obra.cumplimientoNormativo - 5,
                      },
                    ]}
                  >
                    <PolarGrid />
                    <PolarAngleAxis dataKey="subject" />
                    <PolarRadiusAxis angle={90} domain={[0, 100]} />
                    <Radar
                      name="Cumplimiento"
                      dataKey="equipos"
                      stroke="var(--chart-1)"
                      fill="var(--chart-1)"
                      fillOpacity={0.1}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4 ml-[10%]">
      <div className="w-[1500px]">
        <div className="mb-8 ">
          <p className="text-muted-foreground text-lg mt-20">
            Panel de control para licenciados en seguridad e higiene
          </p>
        </div>

        {/* Métricas principales de seguridad */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Incidentes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-destructive">
                {obrasData.reduce((sum, obra) => sum + obra.incidentes, 0)}
              </div>
              <p className="text-sm text-muted-foreground">
                En todas las obras
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Capacitaciones
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-chart-3">
                {obrasData.reduce(
                  (sum, obra) => sum + obra.capacitacionesRealizadas,
                  0
                )}
              </div>
              <p className="text-sm text-muted-foreground">
                Realizadas este mes
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Cumplimiento EPP
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">
                {Math.round(
                  obrasData.reduce(
                    (sum, obra) => sum + obra.equiposProteccion,
                    0
                  ) / obrasData.length
                )}
                %
              </div>
              <p className="text-sm text-muted-foreground">Promedio general</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader >
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Inspecciones
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-chart-4">
                {obrasData.reduce(
                  (sum, obra) => sum + obra.inspeccionesSemana,
                  0
                )}
              </div>
              <p className="text-sm text-muted-foreground">Por semana total</p>
            </CardContent>
          </Card>
        </div>

        {/* Gráficos específicos de seguridad e higiene */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Gráfico 1: Incidentes por Obra */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-destructive" />
                Incidentes por Obra
              </CardTitle>
              <CardDescription>
                Registro de incidentes y días sin accidentes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={incidentesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="nombre" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar
                      dataKey="incidentes"
                      fill="var(--chart-1)"
                      name="Incidentes"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Gráfico 2: Tendencia de Seguridad */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-chart-2" />
                Tendencia de Seguridad
              </CardTitle>
              <CardDescription>
                Evolución mensual de indicadores clave
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={tendenciaSeguridad}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="mes" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="incidentes"
                      stroke="var(--chart-1)"
                      name="Incidentes"
                    />
                    <Line
                      type="monotone"
                      dataKey="capacitaciones"
                      stroke="var(--chart-2)"
                      name="Capacitaciones"
                    />
                    <Line
                      type="monotone"
                      dataKey="inspecciones"
                      stroke="var(--chart-3)"
                      name="Inspecciones"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Gráfico 3: Capacitaciones por Obra */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileCheck className="h-5 w-5 text-chart-3" />
                Estado de Capacitaciones
              </CardTitle>
              <CardDescription>
                Realizadas vs pendientes por obra
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={capacitacionesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="obra" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar
                      dataKey="realizadas"
                      fill="var(--chart-2)"
                      name="Realizadas"
                    />
                    <Bar
                      dataKey="pendientes"
                      fill="var(--chart-1)"
                      name="Pendientes"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Gráfico 4: Tipos de Riesgos */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-chart-4" />
                Distribución de Riesgos
              </CardTitle>
              <CardDescription>Tipos de riesgos más frecuentes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={riesgosPorTipoData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}%`}
                    >
                      {riesgosPorTipoData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Gráfico 5: Cumplimiento Normativo */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HardHat className="h-5 w-5 text-chart-5" />
                Cumplimiento Normativo
              </CardTitle>
              <CardDescription>
                Porcentaje de cumplimiento por categoría
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={cumplimientoData} layout="horizontal">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" domain={[0, 100]} />
                    <YAxis dataKey="categoria" type="category" width={100} />
                    <Tooltip
                      formatter={(value) => [`${value}%`, "Cumplimiento"]}
                    />
                    <Bar dataKey="cumplimiento" fill="var(--chart-5)" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Lista de Obras con enfoque en seguridad */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              Estado de Seguridad por Obra
            </CardTitle>
            <CardDescription>
              Haz clic en una obra para ver el análisis detallado de seguridad e
              higiene
            </CardDescription>
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
                      <div className="flex gap-1">
                        <Badge
                          variant={
                            obra.riesgoNivel === "Bajo"
                              ? "default"
                              : obra.riesgoNivel === "Medio"
                              ? "secondary"
                              : "destructive"
                          }
                          className="text-xs"
                        >
                          {obra.riesgoNivel}
                        </Badge>
                      </div>
                    </div>
                    <CardDescription className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {obra.ubicacion}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-muted-foreground">
                          Días sin accidentes:
                        </span>
                        <span className="font-medium text-chart-2">
                          {obra.diasSinAccidentes}
                        </span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-muted-foreground">
                          Cumplimiento EPP:
                        </span>
                        <span className="font-medium">
                          {obra.equiposProteccion}%
                        </span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-muted-foreground">
                          Capacitaciones:
                        </span>
                        <span className="font-medium">
                          {obra.capacitacionesRealizadas}/
                          {obra.capacitacionesRealizadas +
                            obra.capacitacionesPendientes}
                        </span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-muted-foreground">
                          Incidentes:
                        </span>
                        <span
                          className={`font-medium ${
                            obra.incidentes > 0
                              ? "text-destructive"
                              : "text-chart-2"
                          }`}
                        >
                          {obra.incidentes}
                        </span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-muted-foreground">
                          Licenciado:
                        </span>
                        <span className="font-medium text-xs">
                          {obra.licenciado.split(" ")[1]}
                        </span>
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
  );
}
