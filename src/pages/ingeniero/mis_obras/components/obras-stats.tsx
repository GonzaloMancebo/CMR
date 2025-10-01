
"use client"
import { Loader2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Obra } from "@/lib/types"

interface ObrasStatsProps {
  obras: Obra[]
  isLoading: boolean
}

export function ObrasStats({ obras, isLoading }: ObrasStatsProps) {
  const enProgreso = obras.filter((o) => o.estado === "En Progreso").length
  const planificacion = obras.filter((o) => o.estado === "Planificación").length
  const finalizadas = obras.filter((o) => o.estado === "Finalizado").length

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Total Obras</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-primary">
            {isLoading ? <Loader2 className="h-6 w-6 animate-spin" /> : obras.length}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">En Progreso</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-foreground">{enProgreso}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Planificación</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-foreground">{planificacion}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Finalizadas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-chart-2">{finalizadas}</div>
        </CardContent>
      </Card>
    </div>
  )
}
