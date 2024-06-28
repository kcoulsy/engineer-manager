import { redirect } from "next/navigation";
import { validateRequest } from "~/server/auth/validate";
import LogoutButton from "./_components/logout-button";
import { routes } from "../constants/routes";
import { UsersSideBar } from "./_components/users-sidebar";
import type { PropsWithChildren } from "react";

export default async function DashboardLayout({
  children,
}: Readonly<PropsWithChildren>) {
  const { user } = await validateRequest();
  if (!user) {
    return redirect(routes.login);
  }
  return (
    <div className="flex min-h-screen w-full bg-stone-100/40">
      <UsersSideBar />
      <div className="flex flex-1 flex-col sm:pl-64">
        <header className="bg-background sticky top-0 z-20 flex h-16 items-center justify-between border-b px-4 sm:px-6">
          {/* <div className="flex items-center gap-4">
              <Button size="icon" variant="ghost" className="sm:hidden">
                <MenuIcon className="h-6 w-6" />
              </Button>
              <h1 className="text-xl font-bold">Alex Johnson</h1>
            </div>
            <div className="flex items-center gap-4">
              <Button size="icon" variant="ghost">
                <SearchIcon className="h-6 w-6" />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button size="icon" variant="ghost">
                    <SettingsIcon className="h-6 w-6" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Settings</DropdownMenuLabel>
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Notifications</DropdownMenuItem>
                  <DropdownMenuItem>Logout</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div> */}
          <h1>Hi, {user.username}!</h1>
          <LogoutButton />
        </header>
        <main className="flex-1 p-4 sm:p-6">{children}</main>
      </div>
    </div>
  );
}
