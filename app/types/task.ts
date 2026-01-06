// types/task.ts
export interface Task {
  id: string;

  // dùng cho repeat task (nếu có)
  sourceTaskId?: string | null;

  title: string;
  description?: string;

  date: string; // yyyy-mm-dd (dùng cho calendar view)
  hour: number; // 0–23

  color?: string | null;

  completed: boolean;
}
