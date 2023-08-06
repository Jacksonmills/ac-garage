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
import { createBuild, createUser } from './actions';
import { db } from '@/db';
import { eq } from 'drizzle-orm';
import BuildForm from '@/components/build-form';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Trash } from 'lucide-react';
import { build } from '@/db/schema';
import { revalidatePath } from 'next/cache';
import { BuildState, useBuild } from '@/components/build-provider';
import LoadBuildButton from '@/components/load-build-button';

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
    <div className="flex flex-col gap-2 text-center w-full">
      <div className="pb-4 text-2xl">BUILDS:</div>
      <ScrollArea className="h-[248px] w-full rounded-md border p-4">
        {builds.map((b) => {
          const fullBuild: BuildState = {
            head: b.head!,
            core: b.core!,
            arms: b.arms!,
            legs: b.legs!,
            generator: b.generator!,
            boosters: b.boosters!,
            fcs: b.fcs!,
            backWeaponL: b.backWeaponL!,
            backWeaponR: b.backWeaponR!,
            armWeaponL: b.armWeaponL!,
            armWeaponR: b.armWeaponR!,
          };

          return (
            <div key={b.id} className="flex gap-4 rounded-md p-4 w-full">
              <div>
                BUILD // {b.id}
                <form
                  action={async () => {
                    'use server';
                    await db.delete(build).where(eq(build.id, b.id));
                    revalidatePath('/');
                  }}
                >
                  <Button
                    type="submit"
                    variant={`outline`}
                    size="icon"
                    className="rounded-none"
                  >
                    <Trash />
                  </Button>
                </form>
              </div>
              <div className="flex">
                <div>
                  <span>{b.head}</span>
                  <span>{b.core}</span>
                  <span>{b.arms}</span>
                  <span>{b.legs}</span>
                </div>
                <div>
                  <span>{b.generator}</span>
                  <span>{b.boosters}</span>
                  <span>{b.fcs}</span>
                </div>
                <div>
                  <span>{b.backWeaponL}</span>
                  <span>{b.backWeaponR}</span>
                </div>
                <div>
                  <span>{b.armWeaponL}</span>
                  <span>{b.armWeaponR}</span>
                </div>
                <LoadBuildButton {...fullBuild} />
              </div>
            </div>
          );
        })}
      </ScrollArea>
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
      createUser();
    }
  }

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
      <BuildForm />

      <MyBuilds />

      <Nineball />
    </main>
  );
}
