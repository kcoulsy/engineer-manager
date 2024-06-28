import { redirect } from "next/navigation";
import { validateRequest } from "~/server/auth/validate";
import LogoutButton from "./_components/logout-button";
import { routes } from "../constants/routes";

export default async function Page() {
  const { user } = await validateRequest();
  if (!user) {
    return redirect(routes.login);
  }
  return (
    <div>
      <h1>Hi, {user.username}!</h1>
      <LogoutButton />
    </div>
  );
}
