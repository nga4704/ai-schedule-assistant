import { getAuth } from "firebase/auth";
import { collection, getDocs, query, Timestamp, where } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

export interface FirestoreTask {
  id: string;
  title: string;
  startDate: Timestamp;
  startTime: Timestamp;
  endTime?: Timestamp;
  // taskColor?: string;
}

export async function getTasksOfUser(): Promise<FirestoreTask[]> {
  const user = getAuth().currentUser;
  if (!user) return [];

  const q = query(
    collection(db, "tasks"),
    where("userId", "==", user.uid)
  );

  const snapshot = await getDocs(q);

  const tasks = snapshot.docs.map(doc => ({
    id: doc.id,
    ...(doc.data() as any),
  }));

  // sort theo startTime
  tasks.sort((a, b) => {
    const aTime = a.startTime?.toDate?.()?.getTime() ?? 0;
    const bTime = b.startTime?.toDate?.()?.getTime() ?? 0;
    return aTime - bTime;
  });

  return tasks as FirestoreTask[];
}
