import fs from "fs";
import path from "path";
import { GoogleGenAI } from "@google/genai";

if (!process.env.GEMINI_API_KEY) {
  console.error(
    "🚨 ERREUR: La variable d'environnement GEMINI_API_KEY n'est pas définie dans votre environnement."
  );
  process.exit(1);
}

const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

let promptContent = "";
const promptFilePath = "scripts/prompt.ts";

try {
  promptContent = fs.readFileSync(promptFilePath, "utf-8");
} catch (error) {
  // ✅ Correction de la syntaxe ici (guillemets pour le template literal)
  console.error(
    `🚨 ERREUR: Le fichier prompt n'a pas pu être lu à: ${promptFilePath}`
  );
  console.error(error);
  process.exit(1);
}

// ✅ Correction de la syntaxe ici (accents graves)
const prompt = `
  ${promptContent}

  Réponds UNIQUEMENT avec le contenu JSON valide, sans aucun texte, explication ou formatage \`\`\`json\`\`\` autour.
`;

async function getHoroscopes() {
  try {
    // ✅ Correction du nouveau SDK : generateContent est appelé sur genAI.models
    const result = await genAI.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    // ✅ Correction du nouveau SDK : Le texte est sur .text, pas .text()
    const jsonRaw = result.text;

    // NOTE: Votre nettoyage de JSON (replace) est inhabituel, mais s'il fonctionnait avant, nous le gardons.
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
    // ✅ Correction de la syntaxe ici (accents graves)
    const output = `// Fichier auto-généré le ${new Date().toLocaleDateString()}}\nexport const horoscopes = ${JSON.stringify(
      horoscopes,
      null,
      2
    )};\n`;
    fs.writeFileSync(path.resolve("src/data/horoscopes.ts"), output, "utf-8");
    console.log("✅ Horoscope du jour généré !");
  }
})();
