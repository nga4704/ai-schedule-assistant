import {
    deleteDoc,
    doc,
    getDoc,
    updateDoc
} from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";

export async function getTaskById(id: string) {
  const ref = doc(db, "tasks", id);
  const snap = await getDoc(ref);
  if (!snap.exists()) throw new Error("Task not found");
  return { id: snap.id, ...snap.data() };
}

export async function updateTask(id: string, data: any) {
  await updateDoc(doc(db, "tasks", id), data);
}

export async function deleteTask(id: string) {
  await deleteDoc(doc(db, "tasks", id));
}
