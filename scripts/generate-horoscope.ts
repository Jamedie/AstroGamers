import fs from "fs";
import path from "path";
// 1. Importer le SDK de Google Gemini
import { GoogleGenerativeAI } from "@google/generative-ai";

// 2. Initialiser le client Gemini avec la clé d'API
// La variable d'environnement GEMINI_API_KEY est fournie par la GitHub Action
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); // gemini-1.5-flash est rapide et économique

// Astuce : Précisez dans le prompt que la réponse DOIT être du JSON
const prompt = `
  ${fs.readFileSync("scripts/prompt.ts", "utf-8")}

  Réponds UNIQUEMENT avec le contenu JSON valide, sans aucun texte, explication ou formatage \`\`\`json\`\`\` autour.
`;

async function getHoroscopes() {
  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const jsonRaw = response.text();

    // 3. Sécuriser le parsing JSON comme vous l'aviez prévu
    const horoscopes = JSON.parse(jsonRaw);
    return horoscopes;
  } catch (error) {
    console.error("Erreur lors de la génération ou du parsing JSON:", error);
    // Quitte le script en erreur pour que la GitHub Action échoue et vous notifie
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
