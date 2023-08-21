import { currentUser } from '@clerk/nextjs';
import { ScrollArea } from './ui/scroll-area';
import { Button } from './ui/button';
import { Trash } from 'lucide-react';
import LoadBuildButton from './load-build-button';
import { db } from '@/db';
import { build } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { BuildState } from './build-provider';
import BuildList from './build-list';

function getBuilds(userId: string) {
  return db.query.build.findMany({
    where: (b) => eq(b.user_id, userId),
  });
}

export type ReturnedBuilds = Awaited<ReturnType<typeof getBuilds>>;

export async function MyBuilds() {
  const user = await currentUser();

  const builds = user?.id ? await getBuilds(user.id) : [];

  return (
    <div className="flex flex-col gap-2 text-center w-full">
      <ScrollArea className="w-full h-[80vh] rounded-md border p-4">
        {builds.length > 0 && <BuildList builds={builds} />}
        {builds.length <= 0 && (
          <div className="flex flex-col items-center justify-center h-full">
            <span className="text-2xl">No builds saved</span>
            <span className="text-xl">Create a build to get started</span>
          </div>
        )}
        {builds.length > 0 &&
          builds.map((b) => {
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
              <div
                key={b.id}
                className="flex flex-col gap-4 rounded-md p-4 w-full"
              >
                <div className="flex items-center">
                  <h2 className="mr-auto">BUILD // {b.id}</h2>
                  <div className="flex gap-2">
                    <form
                      action={async () => {
                        'use server';
                        await db.delete(build).where(eq(build.id, b.id));
                        revalidatePath('/');
                      }}
                    >
                      <Button type="submit" size="icon" variant={`destructive`}>
                        <Trash />
                      </Button>
                    </form>
                    <LoadBuildButton {...fullBuild} />
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="flex flex-col items-start gap-2">
                    <span className="flex gap-2 w-full items-center">
                      HEAD:{' '}
                      <span className="uppercase font-bold p-2 border flex grow items-center justify-center">
                        {b.head}
                      </span>
                    </span>
                    <span className="flex items-center gap-2 w-full">
                      CORE:{' '}
                      <span className="uppercase font-bold p-2 border flex grow items-center justify-center">
                        {b.core}
                      </span>
                    </span>
                    <span className="flex items-center gap-2 w-full">
                      ARMS:{' '}
                      <span className="uppercase font-bold p-2 border flex grow items-center justify-center">
                        {b.arms}
                      </span>
                    </span>
                    <span className="flex items-center gap-2 w-full">
                      LEGS:{' '}
                      <span className="uppercase font-bold p-2 border flex grow items-center justify-center">
                        {b.legs}
                      </span>
                    </span>
                    <span className="flex items-center gap-2 w-full">
                      GENERATOR:{' '}
                      <span className="uppercase font-bold p-2 border flex grow items-center justify-center">
                        {b.generator}
                      </span>
                    </span>
                    <span className="flex items-center gap-2 w-full">
                      BOOSTERS:{' '}
                      <span className="uppercase font-bold p-2 border flex grow items-center justify-center">
                        {b.boosters}
                      </span>
                    </span>
                    <span className="flex items-center gap-2 w-full">
                      FCS:{' '}
                      <span className="uppercase font-bold p-2 border flex grow items-center justify-center">
                        {b.fcs}
                      </span>
                    </span>
                    <span className="flex items-center gap-2 w-full">
                      BACK WEAPON L:{' '}
                      <span className="uppercase font-bold p-2 border flex grow items-center justify-center">
                        {b.backWeaponL}
                      </span>
                    </span>
                    <span className="flex items-center gap-2 w-full">
                      BACK WEAPON R:{' '}
                      <span className="uppercase font-bold p-2 border flex grow items-center justify-center">
                        {b.backWeaponR}
                      </span>
                    </span>
                    <span className="flex items-center gap-2 w-full">
                      ARM WEAPON L:{' '}
                      <span className="uppercase font-bold p-2 border flex grow items-center justify-center">
                        {b.armWeaponL}
                      </span>
                    </span>
                    <span className="flex items-center gap-2 w-full">
                      ARM WEAPON R:{' '}
                      <span className="uppercase font-bold p-2 border flex grow items-center justify-center">
                        {b.armWeaponR}
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
      </ScrollArea>
    </div>
  );
}
