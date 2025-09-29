import fs from "fs";
import path from "path";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

const prompt = `
  ${fs.readFileSync("scripts/prompt.ts", "utf-8")}

  Réponds UNIQUEMENT avec le contenu JSON valide, sans aucun texte, explication ou formatage \`\`\`json\`\`\` autour.
`;

async function getHoroscopes() {
  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const jsonRaw = response.text();

    const cleanedJson = jsonRaw.replace(/^```json\s*/, "").replace(/```$/, "");

    const horoscopes = JSON.parse(cleanedJson);
    return horoscopes;
  } catch (error) {
    console.error("Erreur lors de la génération ou du parsing JSON:", error);
    process.exit(1);
  }
}

(async () => {
  const horoscopes = await getHoroscopes();
  if (horoscopes) {
    const output = `// Fichier auto-généré le ${new Date().toLocaleDateString()}}\nexport const horoscopes = ${JSON.stringify(
      horoscopes,
      null,
      2
    )};\n`;
    fs.writeFileSync(path.resolve("src/data/horoscopes.ts"), output, "utf-8");
    console.log("✅ Horoscope du jour généré !");
  }
})();
