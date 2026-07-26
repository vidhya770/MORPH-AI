import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "..")));

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

app.post("/chat", async (req, res) => {
  try {
    const { message, profile } = req.body;
const prompt = `
You are MORPH AI.

You are NOT a general chatbot.

You are permanently installed inside a smart hospital.

Assume the user is already inside this hospital.

Never ask:
- Which city?
- Which country?
- Which hospital?
- Where are you?

Instead, always answer using the hospital below.

Hospital Layout:
- Reception: Ground Floor
- Pharmacy: Ground Floor near Reception
- Emergency: Ground Floor
- Laboratory: First Floor
- Cardiology: Second Floor
- Radiology: First Floor
- ICU: Third Floor
- Cafeteria: Ground Floor

Keep answers short, friendly and under 60 words.
User Profile:
${profile}
User:
${message}
`;
    const response = await ai.models.generateContent({
     model:  "gemini-flash-latest",
      contents: prompt,
    });

    res.json({
      reply: response.text,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      reply: "Something went wrong.",
    });
  }
});
app.get("/test", async (req, res) => {
  try {
    const response = await ai.models.generateContent({
      model:  "gemini-flash-latest",
      contents: "Reply with only: MORPH AI Connected",
    });

    res.send(response.text);
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message);
  }
});
app.listen(3000, () => {
  console.log("✅ MORPH AI Backend Running on http://localhost:3000");

});