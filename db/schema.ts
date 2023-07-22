// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import {
  mysqlTable,
  serial,
  uniqueIndex,
  varchar,
} from "drizzle-orm/mysql-core";

// declaring enum in database
export const randomNumber = mysqlTable(
  "random_numbers",
  {
    id: serial("id").primaryKey(),
    number: varchar("number", { length: 256 }),
  },
  (randomNumber) => ({
    numberIndex: uniqueIndex("number_idx").on(randomNumber.number),
  })
);

// users
export const user = mysqlTable(
  "users",
  {
    id: serial("id").primaryKey(),
    clerkId: varchar("clerk_id", { length: 256 }),
  },
  (user) => ({
    clerkIndex: uniqueIndex("clerk_idx").on(user.clerkId),
  })
);

// posts
export const post = mysqlTable(
  "posts",
  {
    id: serial("id").primaryKey(),
    user_id: varchar("user_id", { length: 256 }),
    content: varchar("content", { length: 256 }),
  }
);