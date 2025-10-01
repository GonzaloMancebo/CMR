"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"
import type { Obra } from "@/lib/types"

interface BudgetChartProps {
  obras: Obra[]
}

export function BudgetChart({ obras }: BudgetChartProps) {
  const chartData = obras.slice(0, 10).map((obra) => ({
    nombre: obra.nombre.length > 15 ? obra.nombre.substring(0, 15) + "..." : obra.nombre,
    presupuesto: obra.presupuesto / 1000,
    gastado: obra.gastado / 1000,
  }))

  return (
    <Card>
      <CardHeader>
        <CardTitle>Presupuesto vs Gastado (Miles)</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="nombre" angle={-45} textAnchor="end" height={100} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Area type="monotone" dataKey="presupuesto" stackId="1" stroke="#8b5cf6" fill="#8b5cf6" />
            <Area type="monotone" dataKey="gastado" stackId="2" stroke="#10b981" fill="#10b981" />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
