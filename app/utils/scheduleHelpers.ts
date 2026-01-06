export function detectOverload(tasks: { startTime: Date; endTime: Date | null }[]) {
  let totalMinutes = 0;
  tasks.forEach(task => {
    if (!task.endTime) return;
    const duration = (task.endTime.getTime() - task.startTime.getTime()) / 1000 / 60;
    totalMinutes += duration;
  });
  return totalMinutes > 480; // 8h
}

export function formatTime(date: Date) {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}
