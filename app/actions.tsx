'use server';

import { db } from '@/db';
import { build, user } from '@/db/schema';
import { auth } from '@clerk/nextjs';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';
import { revalidatePath } from 'next/cache';

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(3, '1 m'),
  analytics: true,
});

export async function createUser() {
  const { userId } = auth();

  const update = await db.insert(user).values({
    clerkId: userId,
  });

  return update;
}

export async function createBuild(
  head: string,
  core: string,
  arms: string,
  legs: string,
  generator: string,
  boosters: string,
  fcs: string,
  backWeaponL: string,
  backWeaponR: string,
  armWeaponL: string,
  armWeaponR: string
) {
  const { userId } = auth();
  if (!userId) throw new Error('You must be signed in to create a build');

  const { success } = await ratelimit.limit(userId);
  if (!success) throw new Error('Rate limit exceeded');

  const update = await db.insert(build).values({
    user_id: userId,
    head,
    core,
    arms,
    legs,
    generator,
    boosters,
    fcs,
    backWeaponL,
    backWeaponR,
    armWeaponL,
    armWeaponR,
  });

  revalidatePath('/');
  return update;
}
