"use server";

import { hash } from "@node-rs/argon2";
import { eq } from "drizzle-orm";
import { generateIdFromEntropySize } from "lucia";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { z } from "zod";
import { lucia } from "~/server/auth/lucia";
import { db } from "~/server/db";
import { userTable } from "~/server/db/schema";
import { actionClient } from "~/server/lib/actions";

export const registerAction = actionClient
  .schema(
    z.object({
      name: z.string(),
      username: z.string().min(3).max(30).regex(/^\w+$/),
      password: z.string().min(8).max(100),
    }),
  )
  .action(async ({ parsedInput: { name, username, password } }) => {
    const [existingUser] = await db
      .select()
      .from(userTable)
      .where(eq(userTable.username, username));

    if (existingUser) {
      return {
        success: false,
        error: "Username already exists",
      };
    }

    const passwordHash = await hash(password, {
      // recommended minimum parameters
      memoryCost: 19456,
      timeCost: 2,
      outputLen: 32,
      parallelism: 1,
    });

    const userId = generateIdFromEntropySize(10); // 16 characters long

    try {
      await db.insert(userTable).values({
        id: userId,
        name,
        username,
        password_hash: passwordHash,
      });
    } catch (error) {
      console.error("Error inserting user", error);
      return {
        success: false,
        error: "Failed to create user",
      };
    }

    const session = await lucia.createSession(userId, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    );

    return redirect("/");
  });
