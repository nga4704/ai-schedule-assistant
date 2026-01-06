// services/taskMapper.ts
import { Task } from "../types/task";
import { toDateSafe } from "../utils/date";

/**
 * Map Firestore task -> Task (Calendar)
 */
export function mapFirestoreTaskToCalendar(data: any): Task {
  const startTime = toDateSafe(data.startTime);

  return {
    id: data.id,
    sourceTaskId: data.sourceTaskId ?? null,

    title: data.title ?? "",
    description: data.description ?? "",

    date: startTime.toISOString().slice(0, 10), // yyyy-mm-dd
    hour: startTime.getHours(),

    color: data.taskColor ?? null,

    completed: !!data.completed,
  };
}
