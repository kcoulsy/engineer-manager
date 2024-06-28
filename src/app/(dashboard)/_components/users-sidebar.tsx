import { eq } from "drizzle-orm";
import Link from "next/link";
import { routes } from "~/app/constants/routes";
import { buttonVariants } from "~/components/ui/button";
import { cn } from "~/lib/utils";
import { validateRequest } from "~/server/auth/validate";
import { db } from "~/server/db";
import { reportTable } from "~/server/db/schema";

export async function UsersSideBar() {
  const { user } = await validateRequest();
  if (!user) {
    return <div>Error</div>;
  }
  const users = await db
    .select()
    .from(reportTable)
    .where(eq(reportTable.userId, user.id));

  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-64 flex-col border-r bg-white sm:flex">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6">
        <Link href="#" className="text-lg font-bold" prefetch={false}>
          Team Dashboard
        </Link>
      </div>
      <nav className="flex flex-1 flex-col divide-y overflow-y-auto">
        <div className="space-y-1 p-4">
          {users.map((user) => (
            <Link
              key={user.id}
              href={routes.user(user.id)}
              className="text-muted-foreground hover:bg-accent hover:text-accent-foreground flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium"
              prefetch={false}
            >
              {user.name}
            </Link>
          ))}
        
          <Link
            href={routes.userCreate}
            className={cn("mt-2 w-full", buttonVariants())}
            prefetch={false}
          >
            Add Report
          </Link>
        </div>
      </nav>
    </aside>
  );
}
