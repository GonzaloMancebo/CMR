import { db } from "@/lib/firebase";
import {
  collection,
  getDocs,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import type { Obra } from "@/interface/Obra/Obra";
import type { DocumentData, QuerySnapshot } from "firebase/firestore";

const COLECCION_OBRAS = "obras";

export const createObra = async (
  nuevaObraData: Omit<Obra, "id">
): Promise<string> => {
  try {
    const docRef = await addDoc(collection(db, COLECCION_OBRAS), nuevaObraData);
    return docRef.id;
  } catch (e) {
    console.error("Error al crear la obra:", e);
    throw e;
  }
};

export const getAllObras = async (): Promise<Obra[]> => {
  try {
    const q = collection(db, COLECCION_OBRAS);
    const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(q);

    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<Obra, "id">),
    }));
  } catch (e) {
    console.error("Error al obtener todas las obras:", e);
    throw e;
  }
};

export const updateObra = async (
  obraId: string,
  datosActualizados: Partial<Obra>
): Promise<void> => {
  try {
    const obraRef = doc(db, COLECCION_OBRAS, obraId);
    await updateDoc(obraRef, datosActualizados);
  } catch (e) {
    console.error(`Error al actualizar la obra ${obraId}:`, e);
    throw e;
  }
};

export const deleteObra = async (obraId: string): Promise<void> => {
  try {
    const obraRef = doc(db, COLECCION_OBRAS, obraId);
    await deleteDoc(obraRef);
  } catch (e) {
    console.error(`Error al eliminar la obra ${obraId}:`, e);
    throw e;
  }
};
