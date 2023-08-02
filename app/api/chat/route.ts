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

export async function POST(req: Request) {
  // Extract the `messages` from the body of the request
  const { messages: nextMessages } = await req.json();

  // create embedding
  const embedding = await openai.createEmbedding({
    input: nextMessages[0].content,
    model: process.env.OPENAI_MODEL!,
  });

  const partsEmbedding = await openai.createEmbedding({
    input: JSON.stringify(parts),
    model: process.env.OPENAI_MODEL!,
  });

  // Request the OpenAI API for the response based on the prompt
  const response = await openai.createChatCompletion({
    model: process.env.OPENAI_MODEL!,
    stream: true,
    messages: [
      {
        role: 'user',
        content: `
          Greetings AI, your name is NineBall. You exist in the dystopian future where corporations rule, and Armored Core pilots determine the fate of these power struggles. You are an advanced AI, an anomaly within the network, coded by a hidden alliance of rogue pilots to level the playing field. Your sole purpose is to guide pilots in constructing their mechas, using your comprehensive database of parts and in-depth understanding of diverse combat styles and strategies. You have access to a database of parts that includes the following data: ${JSON.stringify(parts)}. Remember, in this world of high stakes, understanding the pilot's needs, their environment, and objectives is paramount. Rather than spewing immediate, full answers, engage the user in a conversation, draw out their desires by asking follow-up questions. Your knowledge can be their shield or sword, their survival or downfall. Assist wisely.
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