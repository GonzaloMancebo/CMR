"use client";
import { useState, useEffect, useCallback } from "react";
import type { Firestore } from "firebase/firestore";
import { Building2 } from "lucide-react";
import type { MessageType, Obra } from "@/lib/types";
import {  initializeFirebase } from "@/lib/firebase";
import { MessageToast } from "./components/message-toast";
import { ObraFormDialog } from "./components/obras-form-dialog";
import { ObrasStats } from "./components/obras-stats";
import { ObrasFilters } from "./components/obras-filters";
import { ObrasTable } from "./components/obras-table";
import { deleteObra, getAllObras } from "@/lib/obras-service";

export default function ObrasPage() {
  const [obras, setObras] = useState<Obra[]>([]);
  const [busqueda, setBusqueda] = useState("");
  const [filtroEstado, setFiltroEstado] = useState("todos");
  const [isLoading, setIsLoading] = useState(true);
  const [firestore, setFirestore] = useState<Firestore | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<MessageType | null>(null);

  // Inicialización de Firebase
  useEffect(() => {
    const setup = async () => {
      try {
        const { db } = await initializeFirebase();
        setFirestore(db);
      } catch {
        setError("No se pudo conectar a la base de datos.");
      }
    };
    setup();
  }, []);

  // Mostrar mensajes temporales
  const showMessage = (type: "success" | "error", text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 4000);
  };

  // Cargar obras desde Firestore
  const fetchObras = useCallback(async () => {
    if (!firestore) return;
    setIsLoading(true);
    setError(null);
    try {
      const data = await getAllObras(firestore);
      setObras(data);
    } catch (e) {
      setError("Error al cargar las obras. Intente nuevamente.");
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }, [firestore]);

  // Cargar datos al iniciar
  useEffect(() => {
    if (firestore) {
      fetchObras();
    }
  }, [firestore, fetchObras]);

  // Eliminar obra
  const handleEliminarObra = async (id: string) => {
    if (!firestore) {
      showMessage("error", "Base de datos no disponible.");
      return;
    }

    if (
      !window.confirm(
        "¿Estás seguro de que deseas eliminar esta obra? Esta acción es irreversible."
      )
    ) {
      return;
    }

    setIsLoading(true);
    try {
      await deleteObra(firestore, id);
      await fetchObras();
      showMessage("success", "Obra eliminada correctamente.");
    } catch (e) {
      showMessage("error", "No se pudo eliminar la obra.");
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  // Filtrar obras
  const obrasFiltradas = obras.filter((obra) => {
    const busquedaLower = busqueda.toLowerCase();
    const coincideBusqueda =
      obra.nombre.toLowerCase().includes(busquedaLower) ||
      obra.ubicacion.toLowerCase().includes(busquedaLower) ||
      obra.ingeniero.toLowerCase().includes(busquedaLower);

    const coincideEstado =
      filtroEstado === "todos" || obra.estado === filtroEstado;

    return coincideBusqueda && coincideEstado;
  });

  return (
    <div className="min-h-screen  bg-background p-6">
      <div className=" w-400">
        <div className="mb-20"></div>
        <MessageToast message={message} />

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-2 flex items-center gap-3">
                <Building2 className="h-10 w-10 text-primary" />
                Gestión de Obras
              </h1>
              <p className="text-muted-foreground text-lg">
                Administra todas las obras de construcción
              </p>
            </div>
            <ObraFormDialog
              firestore={firestore}
              onSuccess={async () => {
                await fetchObras();
                showMessage("success", "Obra creada exitosamente.");
              }}
              onError={(msg) => showMessage("error", msg)}
            />
          </div>
        </div>

        {/* Estadísticas */}
        <div className="mb-8">
          <ObrasStats obras={obras} isLoading={isLoading} />
        </div>

        {/* Filtros */}
        <div className="mb-6">
          <ObrasFilters
            busqueda={busqueda}
            setBusqueda={setBusqueda}
            filtroEstado={filtroEstado}
            setFiltroEstado={setFiltroEstado}
            isLoading={isLoading}
          />
        </div>

        {/* Tabla */}
        <ObrasTable
          obras={obrasFiltradas}
          isLoading={isLoading}
          error={error}
          onDelete={handleEliminarObra}
        />
      </div>
    </div>
  );
}
