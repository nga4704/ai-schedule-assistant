// utils/mapTaskToCalendar.ts
import { Colors } from "../constants/colors";
import { Task } from "../types/task";
import { formatDateLocal, toDateSafe } from "./date";

export function mapFirestoreTaskToCalendar(data: any): Task {
  const start = toDateSafe(data.startTime);

  return {
    id: data.id,
    sourceTaskId: data.sourceTaskId ?? null,

    title: data.title,
    description: data.description,

    date: formatDateLocal(start),
    hour: start.getHours(),

    color: data.taskColor ?? Colors.primary,
    completed: !!data.completed,
  };
}
