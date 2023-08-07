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

export async function MyBuilds() {
  const user = await currentUser();

  const builds = user?.id
    ? await db.query.build.findMany({
        where: (b) => eq(b.user_id, user?.id),
      })
    : [];

  return (
    <div className="flex flex-col gap-2 text-center w-full">
      <ScrollArea className="w-full h-[80vh] rounded-md border p-4">
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
                    <Button type="submit" size="icon">
                      <Trash />
                    </Button>
                  </form>
                  <LoadBuildButton {...fullBuild} />
                </div>
                <div className="flex">
                  <div className="flex flex-col items-start gap-2">
                    <span>HEAD: {b.head}</span>
                    <span>CORE: {b.core}</span>
                    <span>ARMS: {b.arms}</span>
                    <span>LEGS: {b.legs}</span>
                  </div>
                  <div className="flex flex-col items-start gap-2">
                    <span>GENERATOR: {b.generator}</span>
                    <span>BOOSTERS: {b.boosters}</span>
                    <span>FCS: {b.fcs}</span>
                  </div>
                  <div className="flex flex-col items-start gap-2">
                    <span>BACK WEAPON L: {b.backWeaponL}</span>
                    <span>BACK WEAPON R: {b.backWeaponR}</span>
                  </div>
                  <div className="flex flex-col items-start gap-2">
                    <span>ARM WEAPON L: {b.armWeaponL}</span>
                    <span>ARM WEAPON R: {b.armWeaponR}</span>
                  </div>
                </div>
              </div>
            );
          })}
      </ScrollArea>
    </div>
  );
}
