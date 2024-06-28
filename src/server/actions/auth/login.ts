"use server";

import { verify } from "@node-rs/argon2";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { z } from "zod";
import { lucia } from "~/server/auth/lucia";
import { db } from "~/server/db";
import { userTable } from "~/server/db/schema";
import { actionClient } from "~/server/lib/actions";

export const loginAction = actionClient
  .schema(
    z.object({
      username: z.string().min(1, "Username is required"),
      password: z.string().min(1, "Password is required"),
    }),
  )
  .action(async ({ parsedInput: { username, password } }) => {
    const [existingUser] = await db
      .select()
      .from(userTable)
      .where(eq(userTable.username, username));

    if (!existingUser) {
      return {
        success: false,
        error: "Invalid username or password",
      };
    }

    const verified = await verify(existingUser.password_hash, password);

    if (!verified) {
      return {
        success: false,
        error: "Invalid username or password",
      };
    }

    const session = await lucia.createSession(existingUser.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    );

    return redirect("/");
  });
