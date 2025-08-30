import fs from "fs";
import path from "path";
import { Configuration, OpenAIApi } from "openai";

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(config);

const prompt = fs.readFileSync("scripts/prompt.ts", "utf-8");

async function getHoroscopes() {
  const response = await openai.createChatCompletion({
    model: "gpt-4",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.9,
  });

  const jsonRaw = response.data.choices[0].message?.content;
  const horoscopes = JSON.parse(jsonRaw!); // À sécuriser avec try/catch
  return horoscopes;
}

(async () => {
  const horoscopes = await getHoroscopes();
  const output = `export const horoscopes = ${JSON.stringify(
    horoscopes,
    null,
    2
  )};\n`;
  fs.writeFileSync(path.resolve("src/data/horoscopes.ts"), output, "utf-8");
  console.log("✅ Horoscope du jour généré !");
})();
