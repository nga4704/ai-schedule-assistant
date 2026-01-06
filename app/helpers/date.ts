import { Timestamp } from "firebase/firestore";

export function toDateSafe(value: any): Date {
  if (!value) return new Date();

  // Firestore Timestamp
  if (value instanceof Timestamp) {
    return value.toDate();
  }

  // JS Date
  if (value instanceof Date) {
    return value;
  }

  // Firestore Timestamp dạng object
  if (typeof value === "object" && typeof value.toDate === "function") {
    return value.toDate();
  }

  // fallback
  return new Date(value);
}
