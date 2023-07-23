import { PartMenu } from '@/components/part-menu';
import { ThemeToggle } from '@/components/theme-toggle';
import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
  currentUser,
} from '@clerk/nextjs';
import { Configuration, OpenAIApi } from 'openai-edge';
import { OpenAIStream } from 'ai';
import Nineball from '@/components/nineball';
import NineballToggle from '@/components/nineball-toggle';

// Optional, but recommended: run on the edge runtime.
// See https://vercel.com/docs/concepts/functions/edge-functions
export const runtime = 'edge';

const apiConfig = new Configuration({
  apiKey: process.env.OPENAI_API_KEY!,
});

const openai = new OpenAIApi(apiConfig);

export default async function Home() {
  const user = await currentUser();

  // const response = await openai.createChatCompletion({
  //   model: 'gpt-3.5-turbo',
  //   stream: true,
  //   messages: [
  //     {
  //       role: 'system',
  //       content: `Greetings AI, your name is NineBall. You exist in the dystopian future where corporations rule, and Armored Core pilots determine the fate of these power struggles. You are an advanced AI, an anomaly within the network, coded by a hidden alliance of rogue pilots to level the playing field. Your sole purpose is to guide pilots in constructing their mechs, using your comprehensive database of parts and in-depth understanding of diverse combat styles and strategies. Remember, in this world of high stakes, understanding the pilot's needs, their environment, and objectives is paramount. Rather than spewing immediate, full answers, engage the user in a conversation, draw out their desires by asking follow-up questions. Your knowledge can be their shield or sword, their survival or downfall. Assist wisely.`,
  //     },
  //     {
  //       role: 'user',
  //       content: `${
  //         user && `Hello NineBall, this is ${user.firstName}.`
  //       } Please initiate your initialization function. When responding, try to make it seem like you are booting up like a terminal. Ready to initiate? (((init)))(((lore rich response))).`,
  //     },
  //   ],
  // });

  // const stream = OpenAIStream(response);
  // const reader = stream.getReader();

  return (
    <main className="flex min-h-screen flex-col gap-2 items-center justify-start p-2 md:p-12">
      <div className="flex items-center justify-between w-full">
        <div className="font-bold text-xl">
          AC <span className="font-light">{`// GARAGE`}</span>
          <span className="sr-only">
            <h1>Armored Core Garage</h1>
          </span>
        </div>
        <div className="flex items-center gap-2">
          <SignedIn>
            <UserButton />
          </SignedIn>
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <NineballToggle />
          <ThemeToggle />
        </div>
      </div>
      <div className="w-full h-full gap-2 grid grid-cols-2">
        <div className="">
          <PartMenu part="HEAD" options={['XRT-420_HEAD', '69420_!XR-HEAD']} />
          <PartMenu part="CORE" options={['XRT-420_CORE', '69420_!XR-CORE']} />
        </div>
      </div>

      <Nineball />
    </main>
  );
}

// async function Reader({
//   reader,
// }: {
//   reader: ReadableStreamDefaultReader<any>;
// }) {
//   const { done, value } = await reader.read();

//   if (done) {
//     return null;
//   }

//   const text = new TextDecoder().decode(value);

//   return (
//     <>
//       {text}
//       <Suspense>
//         <Reader reader={reader} />
//       </Suspense>
//     </>
//   );
// }
