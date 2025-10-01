import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  type Firestore,
  type QuerySnapshot,
  type DocumentData,
} from "firebase/firestore"
import { appId } from "./firebase"
import type { Obra } from "./types"

const COLECCION_OBRAS = "obras"


  //Obtiene la referencia de la colección de obras

const getObrasCollectionRef = (firestore: Firestore) => {
  return collection(firestore, `artifacts/${appId}/public/data/${COLECCION_OBRAS}`)
}


 // Obtiene todas las obras de Firestore
 
export const getAllObras = async (firestore: Firestore): Promise<Obra[]> => {
  try {
    const q = getObrasCollectionRef(firestore)
    const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(q)

    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<Obra, "id">),
    }))
  } catch (e) {
    console.error("Error al obtener todas las obras:", e)
    throw e
  }
}


 //Crea una nueva obra en Firestore
 
export const createObra = async (firestore: Firestore, nuevaObraData: Omit<Obra, "id">): Promise<string> => {
  try {
    const docRef = await addDoc(getObrasCollectionRef(firestore), nuevaObraData)
    return docRef.id
  } catch (e) {
    console.error("Error al crear la obra:", e)
    throw e
  }
}

/**
 * Actualiza una obra existente
 */
export const updateObra = async (
  firestore: Firestore,
  obraId: string,
  data: Partial<Omit<Obra, "id">>,
): Promise<void> => {
  try {
    const obraRef = doc(getObrasCollectionRef(firestore), obraId)
    await updateDoc(obraRef, data)
  } catch (e) {
    console.error(`Error al actualizar la obra ${obraId}:`, e)
    throw e
  }
}

/**
 * Elimina una obra de Firestore
 */
export const deleteObra = async (firestore: Firestore, obraId: string): Promise<void> => {
  try {
    const obraRef = doc(getObrasCollectionRef(firestore), obraId)
    await deleteDoc(obraRef)
  } catch (e) {
    console.error(`Error al eliminar la obra ${obraId}:`, e)
    throw e
  }
}
