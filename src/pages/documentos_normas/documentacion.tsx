"use client";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  FileText,
  Search,
  AlertTriangle,
  Clock,
  Shield,
  MapPin,
  User,
  Award,
  Building,
  Download,
  Upload,
  Eye,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Line,
  AreaChart,
  Area,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ScatterChart,
  Scatter,
  ComposedChart,
} from "recharts";

const permisosData = [
  {
    id: 1,
    tipo: "Permiso de Trabajo en Altura",
    obra: "Torre Residencial Norte",
    operario: "Juan Pérez",
    dni: "12345678",
    fechaEmision: "2024-01-15",
    fechaVencimiento: "2024-07-15",
    estado: "Vigente",
    autorizado: "Lic. Ana Martín",
    observaciones: "Renovar antes del vencimiento",
  },
  {
    id: 2,
    tipo: "Permiso Eléctrico",
    obra: "Centro Comercial Sur",
    operario: "María González",
    dni: "87654321",
    fechaEmision: "2024-01-10",
    fechaVencimiento: "2024-04-10",
    estado: "Por Vencer",
    autorizado: "Ing. Roberto Silva",
    observaciones: "Vence en 30 días",
  },
  {
    id: 3,
    tipo: "Permiso Espacios Confinados",
    obra: "Hospital Regional",
    operario: "Carlos Ruiz",
    dni: "11223344",
    fechaEmision: "2023-12-01",
    fechaVencimiento: "2024-01-01",
    estado: "Vencido",
    autorizado: "Lic. Laura Vega",
    observaciones: "Requiere renovación urgente",
  },
];

const certificadosData = [
  {
    id: 1,
    tipo: "Certificado Soldadura",
    operario: "Juan Pérez",
    dni: "12345678",
    obra: "Torre Residencial Norte",
    entidadEmisora: "IRAM",
    fechaEmision: "2023-06-15",
    fechaVencimiento: "2025-06-15",
    estado: "Vigente",
    nivel: "Calificado",
    numeroSerie: "CERT-2023-001",
  },
  {
    id: 2,
    tipo: "Certificado Electricista",
    operario: "María González",
    dni: "87654321",
    obra: "Centro Comercial Sur",
    entidadEmisora: "COPIME",
    fechaEmision: "2023-08-20",
    fechaVencimiento: "2024-08-20",
    estado: "Por Vencer",
    nivel: "Matriculado",
    numeroSerie: "CERT-2023-045",
  },
  {
    id: 3,
    tipo: "Certificado Grúa Torre",
    operario: "Carlos Ruiz",
    dni: "11223344",
    obra: "Hospital Regional",
    entidadEmisora: "UOCRA",
    fechaEmision: "2022-03-10",
    fechaVencimiento: "2024-03-10",
    estado: "Vencido",
    nivel: "Operador",
    numeroSerie: "CERT-2022-078",
  },
];

const artData = [
  {
    id: 1,
    obra: "Torre Residencial Norte",
    aseguradora: "Provincia ART",
    poliza: "POL-2024-001",
    fechaInicio: "2024-01-01",
    fechaVencimiento: "2024-12-31",
    estado: "Vigente",
    cobertura: "Completa",
    empleadosAsegurados: 25,
    ultimaInspeccion: "2024-01-15",
    observaciones: "Cobertura completa para todos los riesgos",
  },
  {
    id: 2,
    obra: "Centro Comercial Sur",
    aseguradora: "Galeno ART",
    poliza: "POL-2024-002",
    fechaInicio: "2024-01-01",
    fechaVencimiento: "2024-12-31",
    estado: "Vigente",
    cobertura: "Completa",
    empleadosAsegurados: 18,
    ultimaInspeccion: "2024-01-20",
    observaciones: "Inspección programada para marzo",
  },
  {
    id: 3,
    obra: "Hospital Regional",
    aseguradora: "Prevención ART",
    poliza: "POL-2023-089",
    fechaInicio: "2023-06-01",
    fechaVencimiento: "2024-05-31",
    estado: "Por Vencer",
    cobertura: "Básica",
    empleadosAsegurados: 32,
    ultimaInspeccion: "2023-12-10",
    observaciones: "Renovar póliza antes del vencimiento",
  },
];

const documentosPorTipo = [
  { tipo: "Permisos", vigentes: 15, porVencer: 8, vencidos: 3 },
  { tipo: "Certificados", vigentes: 22, porVencer: 5, vencidos: 4 },
  { tipo: "ART", vigentes: 3, porVencer: 1, vencidos: 0 },
];

const vencimientosPorMes = [
  { mes: "Ene", permisos: 3, certificados: 2, art: 0 },
  { mes: "Feb", permisos: 2, certificados: 1, art: 0 },
  { mes: "Mar", permisos: 4, certificados: 3, art: 0 },
  { mes: "Abr", permisos: 1, certificados: 2, art: 0 },
  { mes: "May", permisos: 2, certificados: 1, art: 1 },
  { mes: "Jun", permisos: 3, certificados: 4, art: 0 },
];

const distribucionEstados = [
  { name: "Vigentes", value: 70, color: "#22c55e" },
  { name: "Por Vencer", value: 20, color: "#f59e0b" },
  { name: "Vencidos", value: 10, color: "#ef4444" },
];

const tendenciaDocumentacion = [
  { mes: "Ene", emitidos: 12, renovados: 8, vencidos: 3, acumulado: 45 },
  { mes: "Feb", emitidos: 15, renovados: 6, vencidos: 2, acumulado: 58 },
  { mes: "Mar", emitidos: 18, renovados: 12, vencidos: 4, acumulado: 70 },
  { mes: "Abr", emitidos: 10, renovados: 9, vencidos: 1, acumulado: 78 },
  { mes: "May", emitidos: 14, renovados: 7, vencidos: 3, acumulado: 86 },
  { mes: "Jun", emitidos: 16, renovados: 11, vencidos: 2, acumulado: 99 },
];

const cumplimientoPorObra = [
  {
    obra: "Torre Norte",
    permisos: 95,
    certificados: 88,
    art: 100,
    promedio: 94,
  },
  {
    obra: "Centro Sur",
    permisos: 82,
    certificados: 90,
    art: 100,
    promedio: 91,
  },
  { obra: "Hospital", permisos: 78, certificados: 85, art: 95, promedio: 86 },
  { obra: "Oficinas", permisos: 92, certificados: 94, art: 100, promedio: 95 },
];

const tiempoRenovacion = [
  { tipo: "Permisos Altura", promedio: 5, minimo: 2, maximo: 12 },
  { tipo: "Cert. Soldadura", promedio: 15, minimo: 8, maximo: 25 },
  { tipo: "Cert. Eléctrico", promedio: 12, minimo: 6, maximo: 20 },
  { tipo: "ART Pólizas", promedio: 30, minimo: 15, maximo: 45 },
];

const distribucionTipos = [
  { tipo: "Trabajo en Altura", cantidad: 25, porcentaje: 35 },
  { tipo: "Eléctrico", cantidad: 18, porcentaje: 25 },
  { tipo: "Espacios Confinados", cantidad: 12, porcentaje: 17 },
  { tipo: "Soldadura", cantidad: 10, porcentaje: 14 },
  { tipo: "Otros", cantidad: 6, porcentaje: 9 },
];

const eficienciaGestion = [
  { categoria: "Emisión", valor: 92 },
  { categoria: "Renovación", valor: 85 },
  { categoria: "Control", valor: 88 },
  { categoria: "Archivo", valor: 95 },
  { categoria: "Seguimiento", valor: 82 },
  { categoria: "Cumplimiento", valor: 90 },
];

const COLORS = [
  "#3b82f6",
  "#22c55e",
  "#f59e0b",
  "#ef4444",
  "#8b5cf6",
  "#06b6d4",
];

export default function Documentacion() {
  const [activeTab, setActiveTab] = useState("permisos");
  const [filtroObra, setFiltroObra] = useState("todas");
  const [filtroEstado, setFiltroEstado] = useState("todos");
  const [busqueda, setBusqueda] = useState("");

  const permisosFiltrados = permisosData.filter((item) => {
    const coincideObra =
      filtroObra === "todas" || item.obra.includes(filtroObra);
    const coincideEstado =
      filtroEstado === "todos" || item.estado === filtroEstado;
    const coincideBusqueda =
      item.operario.toLowerCase().includes(busqueda.toLowerCase()) ||
      item.dni.includes(busqueda) ||
      item.tipo.toLowerCase().includes(busqueda.toLowerCase());

    return coincideObra && coincideEstado && coincideBusqueda;
  });

  const certificadosFiltrados = certificadosData.filter((item) => {
    const coincideObra =
      filtroObra === "todas" || item.obra.includes(filtroObra);
    const coincideEstado =
      filtroEstado === "todos" || item.estado === filtroEstado;
    const coincideBusqueda =
      item.operario.toLowerCase().includes(busqueda.toLowerCase()) ||
      item.dni.includes(busqueda) ||
      item.tipo.toLowerCase().includes(busqueda.toLowerCase());

    return coincideObra && coincideEstado && coincideBusqueda;
  });

  const artFiltrados = artData.filter((item) => {
    const coincideObra =
      filtroObra === "todas" || item.obra.includes(filtroObra);
    const coincideEstado =
      filtroEstado === "todos" || item.estado === filtroEstado;
    const coincideBusqueda =
      item.obra.toLowerCase().includes(busqueda.toLowerCase()) ||
      item.aseguradora.toLowerCase().includes(busqueda.toLowerCase()) ||
      item.poliza.includes(busqueda);

    return coincideObra && coincideEstado && coincideBusqueda;
  });

  const getEstadoBadge = (estado) => {
    const variants = {
      Vigente: "bg-green-100 text-green-800",
      "Por Vencer": "bg-yellow-100 text-yellow-800",
      Vencido: "bg-red-100 text-red-800",
    };
    return variants[estado] || "bg-gray-100 text-gray-800";
  };

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
            <Button className="bg-blue-600 hover:bg-blue-700 mr-6">
              <FileText className="w-4 h-4" />
              Nuevo Permiso
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Emitir Nuevo Permiso</DialogTitle>
              <DialogDescription>
                Complete los datos para emitir un nuevo permiso de trabajo
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="tipoPermiso">Tipo de Permiso</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="altura">Trabajo en Altura</SelectItem>
                    <SelectItem value="electrico">Trabajo Eléctrico</SelectItem>
                    <SelectItem value="confinado">
                      Espacios Confinados
                    </SelectItem>
                    <SelectItem value="caliente">
                      Trabajo en Caliente
                    </SelectItem>
                    <SelectItem value="excavacion">Excavación</SelectItem>
                  </SelectContent>
                </Select>
              </div>
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
                <Label htmlFor="obra">Obra</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar obra" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="torre">
                      Torre Residencial Norte
                    </SelectItem>
                    <SelectItem value="centro">Centro Comercial Sur</SelectItem>
                    <SelectItem value="hospital">Hospital Regional</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="fechaVencimiento">Fecha de Vencimiento</Label>
                <Input type="date" />
              </div>
              <div>
                <Label htmlFor="observaciones">Observaciones</Label>
                <Textarea placeholder="Observaciones del permiso..." />
              </div>
              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                Emitir Permiso
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        <Button className="bg-green-600 hover:bg-green-700">
          <Upload className="w-4 h-4" />
          Subir Documento
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <Card className="mt-8">
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-sm font-medium">
              Documentos Vigentes
            </CardTitle>
            <FileText className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">40</div>
            <p className="text-xs text-slate-600">70% del total</p>
          </CardContent>
        </Card>

        <Card className="mt-8">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 ">
            <CardTitle className="text-sm font-medium">
              Por Vencer (30 días)
            </CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">14</div>
            <p className="text-xs text-slate-600">Requieren atención</p>
          </CardContent>
        </Card>

        <Card className="mt-8">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 ">
            <CardTitle className="text-sm font-medium">Vencidos</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7</div>
            <p className="text-xs text-slate-600">Renovación urgente</p>
          </CardContent>
        </Card>

        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Cobertura ART</CardTitle>
            <CardDescription>75 empleados asegurados</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">100%</div>
            <p className="text-xs text-slate-600">75 empleados asegurados</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Tendencia de Documentación</CardTitle>
            <CardDescription>
              Evolución mensual de emisión, renovación y vencimientos
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={tendenciaDocumentacion}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="mes" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="emitidos"
                  stackId="1"
                  stroke="#3b82f6"
                  fill="#3b82f6"
                  fillOpacity={0.6}
                  name="Emitidos"
                />
                <Area
                  type="monotone"
                  dataKey="renovados"
                  stackId="1"
                  stroke="#22c55e"
                  fill="#22c55e"
                  fillOpacity={0.6}
                  name="Renovados"
                />
                <Area
                  type="monotone"
                  dataKey="vencidos"
                  stackId="1"
                  stroke="#ef4444"
                  fill="#ef4444"
                  fillOpacity={0.6}
                  name="Vencidos"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Cumplimiento por Obra</CardTitle>
            <CardDescription>
              Porcentaje de documentación completa por proyecto
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={cumplimientoPorObra} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" domain={[0, 100]} />
                <YAxis dataKey="obra" type="category" width={80} />
                <Tooltip />
                <Bar dataKey="permisos" fill="#3b82f6" name="Permisos" />
                <Bar
                  dataKey="certificados"
                  fill="#22c55e"
                  name="Certificados"
                />
                <Bar dataKey="art" fill="#f59e0b" name="ART" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Eficiencia de Gestión</CardTitle>
            <CardDescription>
              Evaluación de procesos de documentación
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={eficienciaGestion}>
                <PolarGrid />
                <PolarAngleAxis dataKey="categoria" />
                <PolarRadiusAxis angle={90} domain={[0, 100]} />
                <Radar
                  name="Eficiencia"
                  dataKey="valor"
                  stroke="#3b82f6"
                  fill="#3b82f6"
                  fillOpacity={0.3}
                />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Tiempo de Renovación</CardTitle>
            <CardDescription>
              Días promedio para renovar documentos por tipo
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <ScatterChart data={tiempoRenovacion}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="promedio" name="Promedio" unit=" días" />
                <YAxis dataKey="tipo" type="category" />
                <Tooltip cursor={{ strokeDasharray: "3 3" }} />
                <Scatter
                  name="Tiempo Renovación"
                  dataKey="promedio"
                  fill="#8b5cf6"
                />
              </ScatterChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Distribución de Tipos de Documentos</CardTitle>
            <CardDescription>
              Cantidad y porcentaje por categoría
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <ComposedChart data={distribucionTipos}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="tipo"
                  angle={-45}
                  textAnchor="end"
                  height={80}
                />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Bar
                  yAxisId="left"
                  dataKey="cantidad"
                  fill="#3b82f6"
                  name="Cantidad"
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="porcentaje"
                  stroke="#ef4444"
                  strokeWidth={3}
                  name="Porcentaje %"
                />
              </ComposedChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Acumulado de Documentos Activos</CardTitle>
            <CardDescription>
              Crecimiento del archivo documental
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={tendenciaDocumentacion}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="mes" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="acumulado"
                  stroke="#06b6d4"
                  fill="#06b6d4"
                  fillOpacity={0.4}
                  name="Total Acumulado"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Gestión de Documentos</CardTitle>
          <CardDescription>
            Control detallado de permisos, certificados y ART
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="permisos" className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Permisos
              </TabsTrigger>
              <TabsTrigger
                value="certificados"
                className="flex items-center gap-2"
              >
                <Award className="w-4 h-4" />
                Certificados
              </TabsTrigger>
              <TabsTrigger value="art" className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                ART
              </TabsTrigger>
            </TabsList>

            <div className="flex flex-col md:flex-row gap-4 my-6">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <Input
                    placeholder="Buscar documentos..."
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
                  <SelectItem value="Vigente">Vigente</SelectItem>
                  <SelectItem value="Por Vencer">Por Vencer</SelectItem>
                  <SelectItem value="Vencido">Vencido</SelectItem>
                </SelectContent>
              </Select>
              <Button
                variant="outline"
                onClick={() => {
                  setBusqueda("");
                  setFiltroObra("todas");
                  setFiltroEstado("todos");
                }}
              >
                Limpiar Filtros
              </Button>
            </div>

            <TabsContent value="permisos" className="space-y-4">
              {permisosFiltrados.map((item) => (
                <div
                  key={item.id}
                  className="border rounded-lg p-4 hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-slate-900">
                          {item.tipo}
                        </h3>
                        <Badge className={getEstadoBadge(item.estado)}>
                          {item.estado}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-slate-600 mb-3">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4" />
                          <span>
                            {item.operario} - {item.dni}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          <span>{item.obra}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Building className="w-4 h-4" />
                          <span>Autorizado por: {item.autorizado}</span>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm mb-2">
                        <div>
                          <span className="text-slate-500">Emisión:</span>
                          <div className="font-medium">
                            {new Date(item.fechaEmision).toLocaleDateString()}
                          </div>
                        </div>
                        <div>
                          <span className="text-slate-500">Vencimiento:</span>
                          <div className="font-medium">
                            {new Date(
                              item.fechaVencimiento
                            ).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                      <p className="text-sm text-slate-500 italic">
                        {item.observaciones}
                      </p>
                    </div>
                    <div className="flex flex-col gap-2 ml-4">
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-1" />
                        Ver
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-1" />
                        Descargar
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </TabsContent>

            <TabsContent value="certificados" className="space-y-4">
              {certificadosFiltrados.map((item) => (
                <div
                  key={item.id}
                  className="border rounded-lg p-4 hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-slate-900">
                          {item.tipo}
                        </h3>
                        <Badge className={getEstadoBadge(item.estado)}>
                          {item.estado}
                        </Badge>
                        <Badge className="bg-blue-100 text-blue-800">
                          {item.nivel}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-slate-600 mb-3">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          <span>{item.obra}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <FileText className="w-4 h-4" />
                          <span>Póliza: {item.poliza}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4" />
                          <span>{item.empleadosAsegurados} empleados</span>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-sm mb-2">
                        <div>
                          <span className="text-slate-500">Emisión:</span>
                          <div className="font-medium">
                            {new Date(item.fechaEmision).toLocaleDateString()}
                          </div>
                        </div>
                        <div>
                          <span className="text-slate-500">Vencimiento:</span>
                          <div className="font-medium">
                            {new Date(
                              item.fechaVencimiento
                            ).toLocaleDateString()}
                          </div>
                        </div>
                        <div>
                          <span className="text-slate-500">N° Serie:</span>
                          <div className="font-medium">{item.numeroSerie}</div>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 ml-4">
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-1" />
                        Ver
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-1" />
                        Descargar
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </TabsContent>

            <TabsContent value="art" className="space-y-4">
              {artFiltrados.map((item) => (
                <div
                  key={item.id}
                  className="border rounded-lg p-4 hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-slate-900">
                          {item.aseguradora}
                        </h3>
                        <Badge className={getEstadoBadge(item.estado)}>
                          {item.estado}
                        </Badge>
                        <Badge className="bg-purple-100 text-purple-800">
                          {item.cobertura}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-slate-600 mb-3">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          <span>{item.obra}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <FileText className="w-4 h-4" />
                          <span>Póliza: {item.poliza}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4" />
                          <span>{item.empleadosAsegurados} empleados</span>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-sm mb-2">
                        <div>
                          <span className="text-slate-500">Inicio:</span>
                          <div className="font-medium">
                            {new Date(item.fechaInicio).toLocaleDateString()}
                          </div>
                        </div>
                        <div>
                          <span className="text-slate-500">Vencimiento:</span>
                          <div className="font-medium">
                            {new Date(
                              item.fechaVencimiento
                            ).toLocaleDateString()}
                          </div>
                        </div>
                        <div>
                          <span className="text-slate-500">
                            Última Inspección:
                          </span>
                          <div className="font-medium">
                            {new Date(
                              item.ultimaInspeccion
                            ).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                      <p className="text-sm text-slate-500 italic">
                        {item.observaciones}
                      </p>
                    </div>
                    <div className="flex flex-col gap-2 ml-4">
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-1" />
                        Ver Póliza
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-1" />
                        Inspección
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
  );
}
