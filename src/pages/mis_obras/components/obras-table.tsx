
"use client"
import { Loader2, AlertTriangle, MapPin, Calendar, DollarSign, Users, Eye, Edit, Trash2 } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import type { Obra } from "@/lib/types"
import { formatCurrency, formatDate } from "@/lib/utils/format"

interface ObrasTableProps {
  obras: Obra[]
  isLoading: boolean
  error: string | null
  onDelete: (id: string) => void
}

export function ObrasTable({ obras, isLoading, error, onDelete }: ObrasTableProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Listado de Obras</CardTitle>
        <CardDescription>
          {obras.length} obra{obras.length !== 1 ? "s" : ""} encontrada
          {obras.length !== 1 ? "s" : ""}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {error && (
          <div className="p-4 bg-red-100 text-red-700 rounded-lg flex items-center gap-2 mb-4">
            <AlertTriangle className="h-5 w-5" />
            {error}
          </div>
        )}

        {isLoading && obras.length === 0 && (
          <div className="flex justify-center items-center p-8">
            <Loader2 className="h-8 w-8 animate-spin text-primary mr-2" />
            <span className="text-lg text-muted-foreground">Cargando datos de obras...</span>
          </div>
        )}

        {!isLoading && obras.length === 0 && (
          <div className="p-8 text-center text-muted-foreground">No se encontraron obras con los filtros actuales.</div>
        )}

        {!isLoading && obras.length > 0 && (
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
                {obras.map((obra) => (
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
                          {formatDate(obra.fechaInicio)}
                        </div>
                        <div className="text-xs text-muted-foreground">→ {formatDate(obra.fechaEstimada)}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div className="flex items-center gap-1 font-medium">
                          <DollarSign className="h-3 w-3" />
                          {formatCurrency(obra.presupuesto)}
                        </div>
                        <div className="text-xs text-muted-foreground">Gastado: {formatCurrency(obra.gastado)}</div>
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
                        <Button variant="ghost" size="sm" disabled>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => onDelete(obra.id)}>
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
