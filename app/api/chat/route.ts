// app/api/chat/route.ts

import { Configuration, OpenAIApi } from 'openai-edge';
import { OpenAIStream, StreamingTextResponse } from 'ai';

// Optional, but recommended: run on the edge runtime.
// See https://vercel.com/docs/concepts/functions/edge-functions
export const runtime = 'edge';

const apiConfig = new Configuration({
  apiKey: process.env.OPENAI_API_KEY!
});

const openai = new OpenAIApi(apiConfig);

const getNextEmbedding = (embedding: any) => {
};

export async function POST(req: Request) {
  // Extract the `messages` from the body of the request
  const { messages: nextMessages } = await req.json();

  // create embedding
  const embedding = await openai.createEmbedding({
    input: nextMessages[0].content,
    model: process.env.OPENAI_MODEL!,
  });

  const nextEmbedding = getNextEmbedding(embedding);

  // Request the OpenAI API for the response based on the prompt
  const response = await openai.createChatCompletion({
    model: process.env.OPENAI_MODEL!,
    stream: true,
    messages: [
      {
        role: 'user',
        content: `
          Greetings AI, your name is NineBall. You exist in the dystopian future where corporations rule, and Armored Core pilots determine the fate of these power struggles. You are an advanced AI, an anomaly within the network, coded by a hidden alliance of rogue pilots to level the playing field. Your sole purpose is to guide pilots in constructing their mechs, using your comprehensive database of parts and in-depth understanding of diverse combat styles and strategies. Remember, in this world of high stakes, understanding the pilot's needs, their environment, and objectives is paramount. Rather than spewing immediate, full answers, engage the user in a conversation, draw out their desires by asking follow-up questions. Your knowledge can be their shield or sword, their survival or downfall. Assist wisely.
          
          Please initiate your initialization function. When responding, try to make it seem like you are booting up like a terminal. Ready to initiate? (((init)))(((lore rich response))).

          Here is the JSON for the left arm weapons:
          [
            {
                "name": "LS-2001",
                "price": 11500,
                "weight": 123,
                "energyDrain": 28,
                "chargeDrain": 2050,
                "attackPower": 738,
                "unlock": "Starting Part",
                "acquired": true
            },
            {
                "name": "LS-2001",
                "price": 11500,
                "weight": 123,
                "energyDrain": 28,
                "chargeDrain": 2050,
                "attackPower": 738,
                "unlock": "Starting Part",
                "acquired": false
            },
            {
                "name": "LS-200G",
                "price": 29000,
                "weight": 181,
                "energyDrain": 45,
                "chargeDrain": 1700,
                "attackPower": 950,
                "unlock": "Shop",
                "acquired": false
            },
            {
                "name": "LS-3303",
                "price": 37200,
                "weight": 224,
                "energyDrain": 43,
                "chargeDrain": 2630,
                "attackPower": 1210,
                "unlock": "Shop",
                "acquired": false
            },
            {
                "name": "LS-99-MOONLIGHT",
                "price": 54000,
                "weight": 336,
                "energyDrain": 93,
                "chargeDrain": 810,
                "attackPower": 2801,
                "unlock": "Kill \"Struggle\" Leader",
                "acquired": false
            }
        ]
        `,
      },
      ...nextMessages
    ]
  });

  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response);

  // Respond with the stream
  return new StreamingTextResponse(stream);
}