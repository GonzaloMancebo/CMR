"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Building2, Users, DollarSign, AlertTriangle } from "lucide-react"
import type { Obra } from "@/lib/types"

interface StatsCardsProps {
  obras: Obra[]
}

export function StatsCards({ obras }: StatsCardsProps) {
  const totalTrabajadores = obras.reduce((sum, obra) => sum + (obra.trabajadores || 0), 0)
  const presupuestoTotal = obras.reduce((sum, obra) => sum + (obra.presupuesto || 0), 0)
  const incidentesTotales = obras.reduce((sum, obra) => sum + (obra.incidentes || 0), 0)

  const stats = [
    {
      title: "Total Obras",
      value: obras.length,
      icon: Building2,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Trabajadores",
      value: totalTrabajadores,
      icon: Users,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Presupuesto Total",
      value: `$${(presupuestoTotal / 1000000).toFixed(1)}M`,
      icon: DollarSign,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      title: "Incidentes",
      value: incidentesTotales,
      icon: AlertTriangle,
      color: "text-red-600",
      bgColor: "bg-red-50",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => {
        const Icon = stat.icon
        return (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
              <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                <Icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
