import BuildDisplay from '@/components/build-display';
import { PartMenu } from '@/components/part-menu';
import { ThemeToggle } from '@/components/theme-toggle';
import {
  SignIn,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
  currentUser,
} from '@clerk/nextjs';
import { Configuration, OpenAIApi } from 'openai-edge';
import { OpenAIStream } from 'ai';
import { Suspense } from 'react';

// Optional, but recommended: run on the edge runtime.
// See https://vercel.com/docs/concepts/functions/edge-functions
export const runtime = 'edge';

const apiConfig = new Configuration({
  apiKey: process.env.OPENAI_API_KEY!,
});

const openai = new OpenAIApi(apiConfig);

export default async function Home() {
  const user = await currentUser();

  const response = await openai.createChatCompletion({
    model: 'gpt-4',
    stream: true,
    messages: [
      {
        role: 'system',
        content: `Greetings AI, your name is NineBall. You exist in the dystopian future where corporations rule, and Armored Core pilots determine the fate of these power struggles. You are an advanced AI, an anomaly within the network, coded by a hidden alliance of rogue pilots to level the playing field. Your sole purpose is to guide pilots in constructing their mechs, using your comprehensive database of parts and in-depth understanding of diverse combat styles and strategies. Remember, in this world of high stakes, understanding the pilot's needs, their environment, and objectives is paramount. Rather than spewing immediate, full answers, engage the user in a conversation, draw out their desires by asking follow-up questions. Your knowledge can be their shield or sword, their survival or downfall. Assist wisely.`,
      },
      {
        role: 'user',
        content: `${
          user && `Hello NineBall, this is ${user.firstName}.`
        } Please initiate your initialization function.`,
      },
      {
        role: 'assistant',
        content: `
        Boot sequence initiated...

        Loading comprehensive parts database...✅
        Calibrating combat strategy algorithms...✅
        Priming interactive dialogue protocols...✅
        Initializing comprehensive pilot assistance module...✅

        Initialization complete. 
        NineBall at your service. Ready to construct your ideal Armored Core.
      `,
      },
    ],
  });

  const stream = OpenAIStream(response);
  const reader = stream.getReader();

  return (
    <main className="flex min-h-screen flex-col gap-2 items-center justify-start p-2 md:p-12">
      <div className="flex items-center justify-between w-full">
        <div className="font-bold text-xl">
          AC <span className="font-light">{`// GARAGE`}</span>
        </div>
        <div className="flex items-center gap-6">
          <SignedIn>
            <UserButton />
          </SignedIn>
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <ThemeToggle />
        </div>
      </div>
      <div className="w-full h-full gap-2 grid grid-cols-2">
        <div className="bg-black">
          <PartMenu part="HEAD" options={['XRT-420_HEAD', '69420_!XR-HEAD']} />
          <PartMenu part="CORE" options={['XRT-420_CORE', '69420_!XR-CORE']} />
        </div>
        <div className="bg-black">
          <BuildDisplay />
          <Suspense>
            <Reader reader={reader} />
          </Suspense>
        </div>
      </div>
    </main>
  );
}

async function Reader({
  reader,
}: {
  reader: ReadableStreamDefaultReader<any>;
}) {
  const { done, value } = await reader.read();

  if (done) {
    return null;
  }

  const text = new TextDecoder().decode(value);

  return (
    <span>
      {text}
      <Suspense>
        <Reader reader={reader} />
      </Suspense>
    </span>
  );
}
