"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"
import type { Obra } from "@/lib/types"

interface ObrasStatusChartProps {
  obras: Obra[]
}

export function ObrasStatusChart({ obras }: ObrasStatusChartProps) {
  const statusData = obras.reduce(
    (acc, obra) => {
      const status = obra.estado
      acc[status] = (acc[status] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  const chartData = Object.entries(statusData).map(([estado, cantidad]) => ({
    estado,
    cantidad,
  }))

  return (
    <Card>
      <CardHeader>
        <CardTitle>Estado de Obras</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="estado" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="cantidad" fill="#3b82f6" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
