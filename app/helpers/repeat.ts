// helpers/repeat.ts
export type RepeatPreset =
  | "none"
  | "daily"
  | "weekly"
  | "monthly-first-weekday"
  | "yearly"
  | "weekday"
  | "custom";

export type WeekDay =
  | "sun"
  | "mon"
  | "tue"
  | "wed"
  | "thu"
  | "fri"
  | "sat";

export const repeatLabel: Record<RepeatPreset, string> = {
  none: "Không lặp lại",
  daily: "Hàng ngày",
  weekly: "Hàng tuần",
  "monthly-first-weekday": "Hàng tháng (thứ đầu tiên)",
  yearly: "Hàng năm",
  weekday: "Thứ 2 → Thứ 6",
  custom: "Tùy chỉnh",
};
