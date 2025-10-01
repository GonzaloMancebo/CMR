"use client"
import { useEffect, useState } from "react"
import { Firestore } from "firebase/firestore"
import type { Obra } from "@/lib/types"
import { getAllObras } from "@/lib/obras-service"
import { db } from "@/lib/firebase"


export default function useObras() {
  const [obras, setObras] = useState<Obra[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchObras = async () => {
      try {
        const data = await getAllObras(db as unknown as Firestore)
        setObras(data)
      } catch (error) {
        console.error("Error cargando obras:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchObras()
  }, [])

  return { obras, loading }
}
