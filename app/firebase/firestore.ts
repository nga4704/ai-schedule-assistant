// firebase/firestore.ts
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "./firebaseConfig";

export const createUserProfile = async (
  uid: string,
  email: string
) => {
  const userRef = doc(db, "users", uid);

  await setDoc(userRef, {
    email,
    createdAt: serverTimestamp(),

    settings: {
      dayStartHour: 8,
      dayEndHour: 22,
      reminderBefore: 30, // phút
    },

    aiConfig: {
      schedulingStrategy: "balanced",
      autoReschedule: true,
    },
  });
};

export const getUserProfile = async (uid: string) => {
  const ref = doc(db, "users", uid);
  const snap = await getDoc(ref);

  if (!snap.exists()) return null;
  return snap.data();
};