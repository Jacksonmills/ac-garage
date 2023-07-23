import { PartMenu } from '@/components/part-menu';
import { ThemeToggle } from '@/components/theme-toggle';
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { Configuration, OpenAIApi } from 'openai-edge';
import Nineball from '@/components/nineball';
import NineballToggle from '@/components/nineball-toggle';
import { parts } from '@/db/parts';
import { Button } from '@/components/ui/button';

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
            <Button variant="outline" className="rounded-none">
              <SignInButton />
            </Button>
          </SignedOut>
          <NineballToggle />
          <ThemeToggle />
        </div>
      </div>
      <div className="w-full h-full gap-2 flex flex-col">
        <div className="flex flex-col gap-2 w-full p-2 border">
          <PartMenu part="heads" label="HEAD" />
          <PartMenu part="cores" label="CORE" />
          <PartMenu part="arms" label="ARMS" />
          <PartMenu part="legs" label="LEGS" />
        </div>
        <div className="flex gap-2 w-full p-2 border">
          <PartMenu part="generators" label="GENERATOR" />
          <PartMenu part="boosters" label="BOOSTERS" />
          <PartMenu part="firingControlSystems" label="FCS" />
        </div>
        <div className="flex gap-2 w-full p-2 border">
          <PartMenu part="backWeapons" label="BACK UNIT L" />
          <PartMenu part="backWeapons" label="BACK UNIT R" />
          <PartMenu part="armWeaponsL" label="ARM WEAPON L" />
          <PartMenu part="armWeaponsR" label="ARM WEAPON R" />
        </div>
      </div>

      <Nineball />
    </main>
  );
}
