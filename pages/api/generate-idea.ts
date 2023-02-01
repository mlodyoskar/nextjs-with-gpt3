import type { NextApiHandler } from "next";
import { Configuration, OpenAIApi } from "openai";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

if (!OPENAI_API_KEY) {
 throw new Error("Nie podano zmiennej środowiskowej OPENAI_API_KEY");
}

const configuration = new Configuration({
 apiKey: OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const generatePrompt = (interests: string) => {
 return `Jesteś początkującym programistą aplikacji webowych i masz 
    pomysł na stworzenie aplikacji, która odpowiada Twoim zainteresowaniom. 
    Proszę o opisanie tej aplikacji w maksymalnie 250 znakach,
    uwzględniając jej główne funkcje i cel. 
    Twoje zainteresowania to ${interests}.`;
};

const handler: NextApiHandler = async (req, res) => {
 const prompt = generatePrompt(req.body.interests);

 const completion = await openai.createCompletion({
  model: "text-davinci-003",
  prompt: prompt,
  temperature: 0.9,
  max_tokens: 500,
 });

 res.status(200).json({ result: completion.data.choices[0].text });
};

export default handler;
