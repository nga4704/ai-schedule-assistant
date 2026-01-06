// server/index.js
import cors from "cors";
import "dotenv/config";
import express from "express";

const app = express();
app.use(cors());
app.use(express.json());

if (!process.env.GEMINI_API_KEY) {
  console.error("❌ Missing GEMINI_API_KEY");
  process.exit(1);
}

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

// ✅ MODEL HIỆN HÀNH – KHÔNG 404
const GEMINI_MODEL = "gemini-1.5-flash";

const GEMINI_URL = `https://generativelanguage.googleapis.com/v1/models/${GEMINI_MODEL}:generateContent`;

// ===============================
// API: Generate schedule
// ===============================
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
KHÔNG ký tự thừa.

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
      `${GEMINI_URL}?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [{ text: prompt }],
            },
          ],
          generationConfig: {
            temperature: 0.4,
          },
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("❌ Gemini API error:", data);
      return res.status(500).json(data);
    }

    const text =
      data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) {
      throw new Error("Empty AI response");
    }

    const json = JSON.parse(text.trim());
    res.json(json);
  } catch (err) {
    console.error("❌ Error generating schedule:", err.message);
    res.status(500).json({
      message: "AI schedule generation failed",
      error: err.message,
    });
  }
});

// ===============================
// Start server
// ===============================
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
