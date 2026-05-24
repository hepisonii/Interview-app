require("dotenv").config();

const OpenAI = require("openai");

const client = new OpenAI({
  apiKey: process.env.OPENAI_KEY,
  baseURL: "https://api.aicredits.in/v1",
});

/**
 * Evaluate interview answers using AI
 * @param {Array} payload - [{ question, answer, questionId }]
 * @returns {Array} [{ questionId, score, feedback }]
 */
async function evaluateAnswers(payload) {
  try {
    const prompt = `
You are an interview evaluator.

Evaluate the following answers strictly.

Rules:
- Score each answer from 0 to 5
- Be strict but fair
- Give 1-line feedback
- Return ONLY JSON (no extra text)

Format:
[
  {
    "questionId": "...",
    "score": number,
    "feedback": "..."
  }
]

Data:
${payload.map((item, i) => `
${i + 1}.
questionId: ${item.questionId}
Question: ${item.question}
Answer: ${item.answer}
`).join("\n")}
`;

    const response = await client.chat.completions.create({
      model: "openai/gpt-4o-mini",
      messages: [
        { role: "user", content: prompt }
      ],
      temperature: 0.3,
    });

    let text = response.choices[0].message.content;

    text = text.replace(/```json|```/g, "").trim();

    const parsed = JSON.parse(text);

    return parsed;

  } catch (error) {
    console.error("AI Evaluation Error:", error.message);
    throw error;
  }
}

module.exports = evaluateAnswers;