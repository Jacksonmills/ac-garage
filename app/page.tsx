import { PartMenu } from '@/components/part-menu';
import { ThemeToggle } from '@/components/theme-toggle';
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { Configuration, OpenAIApi } from 'openai-edge';
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
