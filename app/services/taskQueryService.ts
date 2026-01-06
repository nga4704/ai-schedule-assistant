// services/taskQueryService.ts
import { getAuth } from "firebase/auth";
import { collection, getDocs, query, Timestamp, where } from "firebase/firestore";
// import { TaskColorKey } from "../constants/colors";
import { db } from "../firebase/firebaseConfig";

export interface FirestoreTask {
  id: string;
  title: string;
  startDate: Timestamp;
  startTime: Timestamp;
  // taskColor?: TaskColorKey | null;
}

export async function getTasksOfUser(): Promise<FirestoreTask[]> {
  const user = getAuth().currentUser;
  if (!user) return [];

  const q = query(
    collection(db, "tasks"),
    where("userId", "==", user.uid)
  );

  const snapshot = await getDocs(q);

  const tasks = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as any),
  }));

  // sort bằng JS (an toàn, không cần index)
  tasks.sort((a, b) => {
    const aTime = a.startTime?.toDate?.()?.getTime() ?? 0;
    const bTime = b.startTime?.toDate?.()?.getTime() ?? 0;
    return aTime - bTime;
  });

  return tasks as FirestoreTask[];
}
