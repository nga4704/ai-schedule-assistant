import { collection, getDocs, query, Timestamp, where } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

export async function getTasksOfToday(userId: string) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const q = query(
    collection(db, "tasks"),
    where("userId", "==", userId),
    where("startDate", "==", Timestamp.fromDate(today))
  );

  const snap = await getDocs(q);

  return snap.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  })) as any[];
}
