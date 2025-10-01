"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"
import type { Obra } from "@/lib/types"

interface ProgressChartProps {
  obras: Obra[]
}

export function ProgressChart({ obras }: ProgressChartProps) {
  const chartData = obras
    .slice(0, 10)
    .map((obra) => ({
      nombre: obra.nombre.length > 15 ? obra.nombre.substring(0, 15) + "..." : obra.nombre,
      progreso: obra.progreso || 0,
    }))
    .sort((a, b) => b.progreso - a.progreso)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Progreso de Obras (%)</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="nombre" angle={-45} textAnchor="end" height={100} />
            <YAxis domain={[0, 100]} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="progreso" stroke="#f59e0b" strokeWidth={2} dot={{ r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
