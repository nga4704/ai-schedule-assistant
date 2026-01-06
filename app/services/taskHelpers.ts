// services/taskHelpers.ts
import { expandTaskByRepeat } from "../utils/repeatExpand";
import { FirestoreTask, getTasksOfUser } from "./taskQueryService";

export async function getTodayTasks() {
  const allTasks: FirestoreTask[] = await getTasksOfUser();
  const today = new Date();
  const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0);
  const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59);

  const expandedTasks = allTasks.flatMap((task) => expandTaskByRepeat(task, startOfDay, endOfDay));

  return expandedTasks.map((task) => {
    const start: Date = "toDate" in task.startTime ? task.startTime.toDate() : new Date(task.startTime);
    const end: Date | null = task.endTime
      ? "toDate" in task.endTime
        ? task.endTime.toDate()
        : new Date(task.endTime)
      : null;

    return {
      id: task.id,
      title: task.title,
      startTime: start,
      endTime: end,
    };
  });
}
