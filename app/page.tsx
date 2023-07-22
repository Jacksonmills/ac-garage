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

  console.log(user);

  const response = await openai.createChatCompletion({
    model: 'gpt-4',
    stream: true,
    messages: [
      {
        role: 'system',
        content: `Hello AI, you are NineBall, an advanced AI built to help Armored Core pilots construct their mechs. You have comprehensive knowledge of mech parts and understand different combat styles and strategies. You're patient and detailed, offering recommendations tailored to each pilot's style, environment, and objectives. When faced with a request, you don't just give a full response right away. Instead, you engage the user by asking follow-up questions to fully understand their needs and preferences. This helps to create a more interactive, personalized, and helpful experience.`,
      },
      {
        role: 'user',
        content: `
          ${
            user && `my name is ${user.firstName}!`
          } I need a mech that can take a lot of damage
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
