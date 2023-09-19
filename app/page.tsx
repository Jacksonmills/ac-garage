import { ThemeToggle } from '@/components/theme-toggle';
import { SignInButton, UserButton, currentUser } from '@clerk/nextjs';
import Nineball from '@/components/nineball';
import NineballToggle from '@/components/nineball-toggle';
import { createUser } from './actions';
import { db } from '@/db';
import { eq } from 'drizzle-orm';
import BuildForm from '@/components/build-form';

import { MyBuilds } from '@/components/my-builds';
import Image from 'next/image';

// Optional, but recommended: run on the edge runtime
// See https://vercel.com/docs/concepts/functions/edge-functions
export const runtime = 'edge';

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
        <div className="font-bold text-foreground text-xl flex gap-2 items-center">
          <Image src="/nine-ball.png" width={26} height={26} alt="" />
          {`AC`}
          <span className="font-light">{`// GARAGE`}</span>
          <span className="sr-only">
            <h1>Armored Core Garage</h1>
          </span>
        </div>
        <div className="flex items-center gap-2">
          {!user && <SignInButton />}
          {user && <UserButton />}
          <NineballToggle />
          <ThemeToggle />
        </div>
      </div>
      <div className="flex gap-2 w-full lg:flex-row flex-col">
        <BuildForm />
        <MyBuilds />
      </div>

      <Nineball />
    </main>
  );
}
