"use client";

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import {db} from "../services/firebase"

export interface Obra {
  id: string;
  nombre: string;
  ubicacion: string;
  estado: string;
  progreso: number;
  fechaInicio: string;
  fechaEstimada: string;
  presupuesto: number;
  gastado: number;
  ingeniero: string;
  licenciado: string;
  trabajadores: number;
  incidentes: number;
  telefono: string;
  email: string;
  capacitacionesRealizadas: number;
  capacitacionesPendientes: number;
  inspeccionesSemana: number;
  equiposProteccion: number;
  cumplimientoNormativo: number;
  diasSinAccidentes: number;
  riesgoNivel: string;
}

export function useObras() {
  const [obras, setObras] = useState<Obra[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchObras = async () => {
      const querySnapshot = await getDocs(collection(db, "obras"));
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Obra[];
      setObras(data);
      setLoading(false);
    };

    fetchObras();
  }, []);

  return { obras, loading };
}
