import { Colors } from "../../constants/colors";
import { Task } from "../components/CalendarDayView";

function formatDateLocal(date: Date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function mapFirestoreTaskToCalendar(task: any): Task {
  const start: Date =
    task.startTime?.toDate?.() ??
    new Date(task.startTime) ??
    new Date();

  return {
    id: task.id,
    title: task.title,
    date: formatDateLocal(start),
    hour: start.getHours(),
    color: task.taskColor ?? Colors.primary,
  };
}
