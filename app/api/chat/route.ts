import { Configuration, OpenAIApi } from 'openai-edge';
import { OpenAIStream, StreamingTextResponse } from 'ai';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis/nodejs';


export const runtime = 'edge';

const apiConfig = new Configuration({
  apiKey: process.env.OPENAI_API_KEY!
});

const openai = new OpenAIApi(apiConfig);

export async function POST(req: Request) {
  const ip = req.headers.get('x-forwarded-for');
  const ratelimit = new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(3, '1 m'),
    analytics: true,
  });

  const { success, limit, reset, remaining } = await ratelimit.limit(
    `ratelimit_${ip}`
  );

  if (!success) {
    return new Response('You have reached your request limit.', {
      status: 429,
      headers: {
        'X-RateLimit-Limit': limit.toString(),
        'X-RateLimit-Remaining': remaining.toString(),
        'X-RateLimit-Reset': reset.toString()
      }
    });
  }

  const { messages: nextMessages } = await req.json();

  const response = await openai.createChatCompletion({
    model: process.env.OPENAI_MODEL!,
    stream: true,
    messages: [...nextMessages]
  });

  const stream = OpenAIStream(response);

  return new StreamingTextResponse(stream);
}