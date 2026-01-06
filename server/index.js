// server/index.js
import cors from "cors";
import "dotenv/config";
import express from "express";

const app = express();
app.use(cors());
app.use(express.json());

if (!process.env.OPENROUTER_API_KEY) {
  console.error("❌ Missing OPENROUTER_API_KEY");
  process.exit(1);
}

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

// ✅ MODEL FREE, ỔN ĐỊNH
const MODEL = "qwen/qwen-2.5-7b-instruct";

app.post("/ai/schedule", async (req, res) => {
  try {
    const { tasks } = req.body;

    if (!Array.isArray(tasks) || tasks.length === 0) {
      return res.status(400).json({ message: "Tasks array is required" });
    }

    const prompt = `
Bạn là trợ lý cá nhân.

CHỈ TRẢ VỀ JSON HỢP LỆ.
KHÔNG markdown.
KHÔNG giải thích.

FORMAT:
[
  {
    "id": "string",
    "title": "string",
    "start": "HH:mm",
    "end": "HH:mm",
    "priority": "high|medium|low"
  }
]

DANH SÁCH CÔNG VIỆC:
${tasks
  .map(
    (t, i) =>
      `${i + 1}. ${t.title} (${t.start} - ${t.end ?? "?"})`
  )
  .join("\n")}
`;

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "ai-schedule-assistant",
          "X-Title": "AI Schedule Assistant",
        },
        body: JSON.stringify({
          model: MODEL,
          messages: [
            { role: "system", content: "You are a helpful assistant." },
            { role: "user", content: prompt },
          ],
          temperature: 0.4,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("❌ OpenRouter error:", data);
      return res.status(500).json(data);
    }

    const text = data.choices?.[0]?.message?.content;

    if (!text) throw new Error("Empty AI response");

    res.json(JSON.parse(text.trim()));
  } catch (err) {
    console.error("❌ Error:", err.message);
    res.status(500).json({
      message: "AI schedule generation failed",
      error: err.message,
    });
  }
});

app.listen(4000, () => {
  console.log("✅ Server running on http://localhost:4000");
});
