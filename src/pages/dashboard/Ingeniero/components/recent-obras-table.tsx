"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import type { Obra } from "@/lib/types"

interface RecentObrasTableProps {
  obras: Obra[]
}

export function RecentObrasTable({ obras }: RecentObrasTableProps) {
  const recentObras = obras.slice(0, 5)

  const getStatusColor = (estado: string) => {
    switch (estado) {
      case "Planificación":
        return "bg-yellow-100 text-yellow-800"
      case "En Progreso":
        return "bg-blue-100 text-blue-800"
      case "Finalizado":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Obras Recientes</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentObras.map((obra) => (
            <div
              key={obra.id}
              className="flex flex-col gap-2 p-4 border rounded-lg hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{obra.nombre}</h3>
                  <p className="text-sm text-muted-foreground">{obra.ubicacion}</p>
                </div>
                <Badge className={getStatusColor(obra.estado)}>{obra.estado}</Badge>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Ingeniero:</span>
                  <p className="font-medium">{obra.ingeniero}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Trabajadores:</span>
                  <p className="font-medium">{obra.trabajadores}</p>
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Progreso</span>
                  <span className="font-medium">{obra.progreso}%</span>
                </div>
                <Progress value={obra.progreso} className="h-2" />
              </div>

              <div className="flex justify-between text-sm pt-2 border-t">
                <div>
                  <span className="text-muted-foreground">Presupuesto: </span>
                  <span className="font-medium">${obra.presupuesto.toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Gastado: </span>
                  <span className="font-medium">${obra.gastado.toLocaleString()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
