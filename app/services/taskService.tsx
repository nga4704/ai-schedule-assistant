import {
  addDoc,
  collection,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";

export interface TaskData {
  title: string;
  description?: string;
  taskColor?: string | null;

  // Timestamp fields
  startDate: Timestamp;
  startTime: Timestamp;
  endTime: Timestamp;

  // repeat
  repeat: {
    preset: string;
    days: string[];
    endDate?: Timestamp | null;
  };

  // notification offset (minutes)
  reminderOffset: number;
}

export async function addTask(userId: string, task: TaskData) {
  try {
    const docRef = await addDoc(collection(db, "tasks"), {
      ...task,
      userId,
      createdAt: serverTimestamp(),
    });

    return docRef.id;
  } catch (error) {
    console.error("Error adding task:", error);
    throw error;
  }
}
