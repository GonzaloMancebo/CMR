"use client"
import useObras from "@/hooks/use-obras"
import { Loader2 } from "lucide-react"
import { StatsCards } from "./components/stats-cards"
import { ObrasStatusChart } from "./components/obras-status-chart"
import { ProgressChart } from "./components/progress-chart"
import { BudgetChart } from "./components/budget-chart"
import { RecentObrasTable } from "./components/recent-obras-table"

export default function DashboardPage() {
  const { obras, loading, error } = useObras()

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Cargando datos del dashboard...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-red-500 text-lg font-semibold">{error}</p>
          <p className="text-muted-foreground mt-2">Por favor, verifica tu conexión a Firebase</p>
        </div>
      </div>
    )
  }

  if (obras.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-lg font-semibold">No hay obras registradas</p>
          <p className="text-muted-foreground mt-2">Comienza agregando tu primera obra</p>
        </div>
      </div>
    )
  }

  return (
      <div className="min-h-screen bg-background p-4 ml-[10%]">
      <div className="w-[1500px]">
        <div className="mb-8 ">
          <p className="text-muted-foreground text-lg mt-20">
            Panel de control para licenciados en seguridad e higiene
          </p>
        </div>

        <StatsCards obras={obras} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ObrasStatusChart obras={obras} />
          <ProgressChart obras={obras} />
        </div>

        <BudgetChart obras={obras} />

        <RecentObrasTable obras={obras} />
      </div>
    </div>
  )
}
