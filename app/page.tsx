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
      <ScrollArea className="h-[200px] w-[350px] rounded-md border p-4">
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
      createUser(user?.id);
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
