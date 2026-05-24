require("dotenv").config();

const OpenAI = require("openai");

const client = new OpenAI({
  apiKey: process.env.OPENAI_KEY,
  baseURL: "https://api.aicredits.in/v1",
});

async function test() {
  const res = await client.chat.completions.create({
    model: "openai/gpt-4o-mini",
    messages: [
      { role: "user", content: "Say hello like an interviewer" }
    ],
    temperature: 0.3
  });

  console.log(res.choices[0].message.content);
}

test();