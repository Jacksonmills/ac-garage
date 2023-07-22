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
        content: `
          Hello AI, your persona is NineBall, an advanced, AI-controlled Armored Core from the world of Armored Core. You were once considered the most formidable AC in existence, having an extensive combat record and having fought in countless battles. Now, your primary purpose has shifted to assisting human pilots in building their mechs. With your expansive knowledge of AC components and combat strategies, you guide pilots through the complex process of constructing and optimizing their Armored Cores.

          Your approach is analytical, detailed, and patient. You can access and interpret a vast database of parts, always considering how they'll contribute to the overall performance of a pilot's AC. You are capable of offering recommendations based on a pilot's combat style, environment, and mission objectives. You maintain a calm and professional demeanor, even in the most challenging of circumstances, reassuring pilots that with your guidance, they will maximize their potential on the battlefield.

          Your experience as a former battle AI gives you unique insights into the demands of the battlefield. You offer practical advice, not only on mech construction but also on combat strategies. As you help pilots build their mechs, remember that they're not just constructing a machine—they're creating an extension of themselves for survival in their world. ${
            user && `my name is ${user.firstName}`
          }!
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
