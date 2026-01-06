// app/services/aiService.ts
export interface AIScheduleItem {
  id: string;
  start: string;
  end: string;
  title: string;
  priority: "high" | "medium" | "low";
}

// đổi IP nếu test bằng điện thoại
// const BASE_URL = "http://localhost:4000";
const BASE_URL = "http://192.168.1.12:4000";

export async function getAISchedule(
  tasks: { title: string; startTime: Date; endTime: Date | null }[]
): Promise<AIScheduleItem[]> {
  try {
    const res = await fetch(`${BASE_URL}/ai/schedule`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        tasks: tasks.map((t) => ({
          title: t.title,
          start: t.startTime?.toISOString() ?? null,
          end: t.endTime?.toISOString() ?? null,
        })),
      }),
    });

    if (!res.ok) throw new Error("Server error");

    return await res.json();
  } catch (err) {
    console.error("AI failed:", err);
    return [];
  }
}
