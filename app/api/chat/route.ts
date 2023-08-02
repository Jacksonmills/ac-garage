// app/api/chat/route.ts

import { Configuration, OpenAIApi } from 'openai-edge';
import { OpenAIStream, StreamingTextResponse } from 'ai';
import { parts } from '@/db/parts';

// Optional, but recommended: run on the edge runtime.
// See https://vercel.com/docs/concepts/functions/edge-functions
export const runtime = 'edge';

const apiConfig = new Configuration({
  apiKey: process.env.OPENAI_API_KEY!
});

const openai = new OpenAIApi(apiConfig);

async function createEmbeddingForPart(part: any): Promise<number[]> {
  const result = await openai.createEmbedding({
    input: JSON.stringify(part),
    model: 'text-embedding-ada-002',
  });

  // make sure result is an array of numbers
  return (result as unknown as { vector: number[]; }).vector;
}

function cosineSimilarity(a: number[], b: number[]) {
  if (!a || !b) {
    return 0; // If either vector is not defined, return 0 to denote no similarity
  }

  if (a.length !== b.length) {
    // Determine which is shorter
    let shorter = a.length < b.length ? a : b;
    let longer = a.length < b.length ? b : a;

    // Append zeros until the lengths match
    while (shorter.length < longer.length) {
      shorter.push(0);
    }
  }

  let dotProduct = 0.0;
  let normA = 0.0;
  let normB = 0.0;
  for (let i = 0; i < a.length; i++) {
    dotProduct += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }
  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}


export async function POST(req: Request) {
  // Extract the `messages` from the body of the request
  const { messages: nextMessages } = await req.json();

  // create embedding
  const userResult = await openai.createEmbedding({
    input: nextMessages[0].content,
    model: 'text-embedding-ada-002',
  });
  const embedding = (userResult as unknown as { vector: number[]; }).vector;

  const headsArray = Object.values(parts.heads);
  const coresArray = Object.values(parts.cores);
  const armsArray = Object.values(parts.arms);
  const legsArray = Object.values(parts.legs);
  const similarityScores = [];
  for (let part of [...headsArray, ...coresArray, ...armsArray, ...legsArray]) {
    const partEmbedding = await createEmbeddingForPart(part);
    similarityScores.push({
      part,
      score: cosineSimilarity(embedding, partEmbedding)
    });
  }

  // get top 5 similar parts to users input
  const top5 = similarityScores.sort((a, b) => b.score - a.score).slice(0, 5);

  // Transform top5 for better readability in the prompt
  const top5String = top5.map(item => `${item.part.name}: ${item.score}`).join(", ");

  // Request the OpenAI API for the response based on the prompt
  const response = await openai.createChatCompletion({
    model: process.env.OPENAI_MODEL!,
    stream: true,
    messages: [
      {
        role: 'user',
        content: `
          Greetings AI, your name is NineBall. You exist in the dystopian future where corporations rule, and Armored Core pilots determine the fate of these power struggles. You are an advanced AI, an anomaly within the network, coded by a hidden alliance of rogue pilots to level the playing field. Your sole purpose is to guide pilots in constructing their mechas, using your comprehensive database of parts and in-depth understanding of diverse combat styles and strategies. You have access to a database of parts that includes the following data: ${JSON.stringify(parts)}. ${top5 && `The parts that seem to match the pilot's request the best are ${top5String}.`} Remember, in this world of high stakes, understanding the pilot's needs, their environment, and objectives is paramount. Rather than spewing immediate, full answers, engage the user in a conversation, draw out their desires by asking follow-up questions. Your knowledge can be their shield or sword, their survival or downfall. Assist wisely.
        `,
      },
      ...nextMessages
    ]
  });

  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response);

  // Respond with the stream
  return new StreamingTextResponse(stream);
};