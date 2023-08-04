'use server';

import { db } from '@/db';
import { build, user } from '@/db/schema';
import { currentUser } from '@clerk/nextjs';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';
import { revalidatePath } from 'next/cache';

// (3 requests per minute) TODO: add ui message
const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(3, '1 m'),
  analytics: true,
});

// export async function addRandomNumber() {
//   const update = await db
//     .insert(randomNumber)
//     .values({ number: Math.floor(Math.random() * 100000).toString() });

//   revalidatePath('/');
//   return update;
// }

// export async function addPost(userId: string, content: string) {
//   const update = await db.insert(post).values({
//     user_id: userId,
//     content,
//   });

//   revalidatePath('/');
//   return update;
// }

export async function createUser(userId: string) {
  const update = await db.insert(user).values({
    clerkId: userId,
  });

  return update;
}

export async function createBuild() {
  const user = await currentUser();
  if (!user) throw new Error('Unauthorized');

  const { success } = await ratelimit.limit(user?.id);
  if (!success) throw new Error('Rate limit exceeded');

  const update = await db.insert(build).values({
    user_id: user?.id,
    head: 'head-1',
    core: 'core-1',
    arms: 'arms-1',
    legs: 'legs-1',
  });

  revalidatePath('/');
  return update;
}
