
"use client"
import { useState } from "react"
import type { Firestore } from "firebase/firestore"
import { Plus, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { createObra } from "@/lib/obras-service"
import type { FormData, Obra } from "@/lib/types"
import { initialFormData } from "@/lib/types"

interface ObraFormDialogProps {
  firestore: Firestore | null
  onSuccess: () => void
  onError: (message: string) => void
}

export function ObraFormDialog({ firestore, onSuccess, onError }: ObraFormDialogProps) {
  const [dialogAbierto, setDialogAbierto] = useState(false)
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [isLoading, setIsLoading] = useState(false)

  const handleInputChange = (campo: keyof FormData, valor: string) => {
    setFormData((prev) => ({ ...prev, [campo]: valor }))
  }

  const handleCrearObra = async () => {
    if (!firestore) {
      onError("Base de datos no disponible.")
      return
    }

    setIsLoading(true)

    const nuevaObra: Omit<Obra, "id"> = {
      nombre: formData.nombre,
      ubicacion: formData.ubicacion,
      estado: formData.estado,
      progreso: 0,
      fechaInicio: formData.fechaInicio,
      fechaEstimada: formData.fechaEstimada,
      presupuesto: Number(formData.presupuesto) || 0,
      gastado: 0,
      ingeniero: formData.ingeniero,
      licenciado: formData.licenciado,
      trabajadores: Number(formData.trabajadores) || 0,
      incidentes: 0,
      telefono: formData.telefono,
      email: formData.email,
    }

    try {
      await createObra(firestore, nuevaObra)
      setDialogAbierto(false)
      setFormData(initialFormData)
      onSuccess()
    } catch (e) {
      onError("No se pudo crear la obra. Revise los datos.")
      console.error(e)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={dialogAbierto} onOpenChange={setDialogAbierto}>
      <DialogTrigger asChild>
        <Button size="lg" className="gap-2">
          <Plus className="h-5 w-5" />
          Nueva Obra
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Crear Nueva Obra</DialogTitle>
          <DialogDescription>Completa los datos para registrar una nueva obra de construcción</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="nombre">Nombre de la Obra *</Label>
              <Input
                id="nombre"
                placeholder="Ej: Torre Residencial"
                value={formData.nombre}
                onChange={(e) => handleInputChange("nombre", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="estado">Estado *</Label>
              <Select value={formData.estado} onValueChange={(value) => handleInputChange("estado", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Planificación">Planificación</SelectItem>
                  <SelectItem value="En Progreso">En Progreso</SelectItem>
                  <SelectItem value="Finalizado">Finalizado</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="ubicacion">Ubicación *</Label>
            <Input
              id="ubicacion"
              placeholder="Dirección completa"
              value={formData.ubicacion}
              onChange={(e) => handleInputChange("ubicacion", e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fechaInicio">Fecha de Inicio *</Label>
              <Input
                id="fechaInicio"
                type="date"
                value={formData.fechaInicio}
                onChange={(e) => handleInputChange("fechaInicio", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="fechaEstimada">Fecha Estimada de Finalización *</Label>
              <Input
                id="fechaEstimada"
                type="date"
                value={formData.fechaEstimada}
                onChange={(e) => handleInputChange("fechaEstimada", e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="presupuesto">Presupuesto ($) *</Label>
              <Input
                id="presupuesto"
                type="number"
                placeholder="2500000"
                value={formData.presupuesto}
                onChange={(e) => handleInputChange("presupuesto", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="trabajadores">Cantidad de Trabajadores *</Label>
              <Input
                id="trabajadores"
                type="number"
                placeholder="45"
                value={formData.trabajadores}
                onChange={(e) => handleInputChange("trabajadores", e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="ingeniero">Ingeniero Responsable *</Label>
              <Input
                id="ingeniero"
                placeholder="Ing. Juan Pérez"
                value={formData.ingeniero}
                onChange={(e) => handleInputChange("ingeniero", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="licenciado">Licenciado en Seguridad *</Label>
              <Input
                id="licenciado"
                placeholder="Lic. María García"
                value={formData.licenciado}
                onChange={(e) => handleInputChange("licenciado", e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="telefono">Teléfono *</Label>
              <Input
                id="telefono"
                placeholder="+54 11 1234-5678"
                value={formData.telefono}
                onChange={(e) => handleInputChange("telefono", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                placeholder="obra@construcciones.com"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-3">
          <Button
            variant="outline"
            onClick={() => {
              setDialogAbierto(false)
              setFormData(initialFormData)
            }}
          >
            Cancelar
          </Button>
          <Button onClick={handleCrearObra} disabled={isLoading || !formData.nombre || !formData.ubicacion}>
            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Crear Obra"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
