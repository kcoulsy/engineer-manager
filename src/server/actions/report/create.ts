"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";
import { routes } from "~/app/constants/routes";
import { lucia } from "~/server/auth/lucia";
import { validateRequest } from "~/server/auth/validate";
import { db } from "~/server/db";
import { reportTable } from "~/server/db/schema";
import { actionClient } from "~/server/lib/actions";

export const createReportAction = actionClient
  .schema(
    z.object({
      name: z.string(),
    }),
  )
  .action(async (data) => {
    const { session } = await validateRequest();
    if (!session?.userId) {
      return {
        error: "Unauthorized",
      };
    }

    if (!data.parsedInput.name) {
      return {
        error: "Name is required",
      };
    }

    // weird workaround as you can't do a redirect() inside a try/catch block..
    let userId = "";
    try {
      const user = await db.insert(reportTable).values({
        name: data.parsedInput.name,
        userId: session.userId,
      });

      userId = user.lastInsertRowid.toString();
    } catch (e) {
      console.log(e);
      return {
        error: "Failed to create report",
      };
    }

    if (!userId.length) {
      return {
        error: "Failed to create report",
      };
    }

    return redirect(routes.user(userId));
  });
