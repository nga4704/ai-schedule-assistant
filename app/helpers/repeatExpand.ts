import { Timestamp } from "firebase/firestore";
import { RepeatPreset, WeekDay } from "../tasks/components/RepeatPicker";
import { toDateSafe } from "./date";

const WEEK_MAP: WeekDay[] = [
  "sun",
  "mon",
  "tue",
  "wed",
  "thu",
  "fri",
  "sat",
];

export function expandTaskByRepeat(
  task: any,
  rangeStart: Date,
  rangeEnd: Date
) {
  if (!task.repeat || task.repeat.preset === "none") {
    return [task];
  }

  const results: any[] = [];
  const start = toDateSafe(task.startTime);

  const repeatEnd = task.repeat.endDate
    ? toDateSafe(task.repeat.endDate)
    : rangeEnd;

  for (
    let d = new Date(rangeStart);
    d <= rangeEnd && d <= repeatEnd;
    d.setDate(d.getDate() + 1)
  ) {
    const wd = WEEK_MAP[d.getDay()];
    let match = false;

    switch (task.repeat.preset as RepeatPreset) {
      case "daily":
        match = true;
        break;
      case "weekday":
        match = d.getDay() >= 1 && d.getDay() <= 5;
        break;
      case "weekly":
      case "custom":
        match = task.repeat.days?.includes(wd);
        break;
      case "yearly":
        match =
          d.getDate() === start.getDate() &&
          d.getMonth() === start.getMonth();
        break;
    }

    if (match) {
      const newStart = new Date(d);
      newStart.setHours(start.getHours(), start.getMinutes());

      results.push({
        ...task,
        startTime: Timestamp.fromDate(newStart),
      });
    }
  }

  return results;
}
