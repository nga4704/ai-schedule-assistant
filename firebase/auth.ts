// firebase/auth.ts
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "./firebaseConfig";
import { createUserProfile } from "./firestore";

export const registerUser = async (email: string, password: string) => {
  const credential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );

  const user = credential.user;

  await createUserProfile(user.uid, user.email ?? "");

  return credential;
};

export const loginUser = async (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const logoutUser = async () => {
  return signOut(auth);
};
