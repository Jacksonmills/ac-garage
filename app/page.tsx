import { PartMenu } from '@/components/part-menu';
import { ThemeToggle } from '@/components/theme-toggle';
import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
  currentUser,
} from '@clerk/nextjs';
import Nineball from '@/components/nineball';
import NineballToggle from '@/components/nineball-toggle';
import { Button } from '@/components/ui/button';
import { createBuild, createUser } from './actions';
import { db } from '@/db';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { parts } from '@/db/parts';

// Optional, but recommended: run on the edge runtime.
// See https://vercel.com/docs/concepts/functions/edge-functions
export const runtime = 'edge';

async function MyBuilds() {
  const user = await currentUser();

  const builds = user?.id
    ? await db.query.build.findMany({
        where: (b) => eq(b.user_id, user?.id),
      })
    : [];

  return (
    <div className="flex flex-col gap-2 text-center">
      <div className="pb-4 text-2xl">BUILDS:</div>
      {builds.map((b, idx) => (
        <div key={b.id} className="flex justify-between">
          <div className="flex gap-4">
            <div>BUILD // {idx + 1}</div>
            <div>
              <span>{b.head}</span>
              <span>{b.core}</span>
              <span>{b.arms}</span>
              <span>{b.legs}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default async function Home() {
  const user = await currentUser();

  if (user?.id) {
    const existingUser = await db.query.user.findFirst({
      where: (u) => eq(u.clerkId, user?.id),
    });

    if (!existingUser) {
      createUser(user?.id);
    }
  }

  const handleSubmit = async () => {
    'use server';
    if (!user?.id) return;

    const userId = user?.id;

    createBuild(userId);
    revalidatePath('/');
  };

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
            <span>
              <SignInButton />
            </span>
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
        <form action={handleSubmit}>
          <Button type="submit">Save</Button>
        </form>
      </div>

      <MyBuilds />

      <Nineball />
    </main>
  );
}
