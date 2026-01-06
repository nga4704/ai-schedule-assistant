// helpers/time.ts
export function roundTo15Minutes(date: Date) {
  const d = new Date(date);
  d.setMinutes(Math.ceil(d.getMinutes() / 15) * 15, 0, 0);
  return d;
}
