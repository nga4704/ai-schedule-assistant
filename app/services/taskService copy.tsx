// services/taskServices.tsx
import {
  addDoc,
  collection,
  getDocs,
  query,
  serverTimestamp,
  Timestamp,
  where,
} from "firebase/firestore";

import { db } from "../firebase/firebaseConfig";
import { Task } from "../types/task";
import { mapFirestoreTaskToCalendar } from "./taskMapper";

export interface TaskData {
  title: string;
  description?: string;
  taskColor?: string | null;

  startDate: Timestamp;
  startTime: Timestamp;
  endTime: Timestamp;

  repeat: {
    preset: string;
    days: string[];
    endDate: Timestamp | null;
  };

  reminderOffset: number;

  completed: boolean;

  userId: string;
  createdAt: Timestamp;
}

export async function addTask(
  userId: string,
  task: Omit<TaskData, "userId" | "createdAt">
) {
  const docRef = await addDoc(collection(db, "tasks"), {
    ...task,
    userId,
    createdAt: serverTimestamp(),
  });

  return docRef.id;
}

export async function getTodayTasks(userId: string): Promise<Task[]> {
  // normalize về đầu ngày
  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);

  // đầu ngày hôm sau
  const startOfTomorrow = new Date(startOfToday);
  startOfTomorrow.setDate(startOfTomorrow.getDate() + 1);

  const q = query(
    collection(db, "tasks"),
    where("userId", "==", userId),
    where("startDate", ">=", Timestamp.fromDate(startOfToday)),
    where("startDate", "<", Timestamp.fromDate(startOfTomorrow))
  );

  const snap = await getDocs(q);

  return snap.docs.map((doc) =>
    mapFirestoreTaskToCalendar({
      id: doc.id,
      ...doc.data(),
    })
  );
}
