import fs from "fs";
import path from "path";
import { GoogleGenerativeAI } from "@google/generative-ai";

if (!process.env.GEMINI_API_KEY) {
  console.error(
    "🚨 ERREUR: La variable d'environnement GEMINI_API_KEY n'est pas définie dans votre environnement."
  );
  process.exit(1);
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

let promptContent = "";
const promptFilePath = "scripts/prompt.ts";

try {
  promptContent = fs.readFileSync(promptFilePath, "utf-8");
} catch (error) {
  // Affiche l'erreur ENOENT (si c'est bien le cas)
  console.error(
    `🚨 ERREUR: Le fichier prompt n'a pas pu être lu à: ${promptFilePath}`
  );
  console.error(
    "Vérifiez le chemin du fichier (scripts/prompt.ts) dans le contexte d'exécution de GitHub Actions."
  );
  console.error(error);
  process.exit(1);
}

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
