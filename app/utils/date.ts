// utils/date.ts
import { Timestamp } from "firebase/firestore";

/**
 * Convert Firestore Timestamp | Date | number | string -> Date
 */
export function toDateSafe(value: unknown): Date {
  if (!value) return new Date();

  if (value instanceof Date) return value;
  if (value instanceof Timestamp) return value.toDate();

  if (
    typeof value === "object" &&
    value !== null &&
    "toDate" in value &&
    typeof (value as any).toDate === "function"
  ) {
    return (value as any).toDate();
  }

  return new Date(value as any);
}

/**
 * Format Date -> yyyy-mm-dd (local time)
 */
export function formatDateLocal(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function getWeekdayString(date: Date): string {
  const days = [
    "Chủ Nhật",
    "Thứ Hai",
    "Thứ Ba",
    "Thứ Tư",
    "Thứ Năm",
    "Thứ Sáu",
    "Thứ Bảy",
  ];
  return days[date.getDay()];
}

export function formatFullDateVN(date: Date) {
  const weekday = getWeekdayString(date); // ví dụ: Thứ Ba
  const day = date.getDate();
  const month = date.getMonth() + 1; // 0–11 -> +1
  const year = date.getFullYear();

  return `${weekday}, ${day} tháng ${month}, ${year}`;
}
