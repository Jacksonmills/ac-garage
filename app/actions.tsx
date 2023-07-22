'use server';

import { db } from '@/db';
import { user } from '@/db/schema';
import { revalidatePath } from 'next/cache';

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

  revalidatePath('/');
  return update;
}
