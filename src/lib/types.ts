
export interface Obra {
  id: string
  nombre: string
  ubicacion: string
  estado: EstadoObra
  progreso: number
  fechaInicio: string
  fechaEstimada: string
  presupuesto: number
  gastado: number
  ingeniero: string
  licenciado: string
  trabajadores: number
  incidentes: number
  telefono: string
  email: string
}

export type EstadoObra = "Planificación" | "En Progreso" | "Finalizado"

export interface FormData {
  nombre: string
  ubicacion: string
  estado: EstadoObra
  fechaInicio: string
  fechaEstimada: string
  presupuesto: string
  ingeniero: string
  licenciado: string
  trabajadores: string
  telefono: string
  email: string
}

export const initialFormData: FormData = {
  nombre: "",
  ubicacion: "",
  estado: "Planificación",
  fechaInicio: "",
  fechaEstimada: "",
  presupuesto: "",
  ingeniero: "",
  licenciado: "",
  trabajadores: "",
  telefono: "",
  email: "",
}

export type MessageType = {
  type: "success" | "error"
  text: string
}
