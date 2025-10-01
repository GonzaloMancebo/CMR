"use client"

import { useContext } from "react"
import { LoginContext } from "@/context/LoginContext"
import Loading from "@/components/loading/loading"
import LicenciadoDashboard from "./Licenciado/Dashboard-Lic"
import DashboardPage from "./Ingeniero/Dashboard-Ing"


export default function Dashboard() {
  const { role } = useContext(LoginContext)

  // Mientras no haya rol definido
  if (!role) return <div>

    <Loading/>
  </div>

  // Mostrar un componente u otro según el nombre del rol
  if (role.name === "Licenciado") {
    return <LicenciadoDashboard />
  }

  if (role.name === "Ingeniero") {
    return <DashboardPage />
  }

  // Si es otro rol
  return <div>No tienes permisos para ver este Dashboard</div>
}
