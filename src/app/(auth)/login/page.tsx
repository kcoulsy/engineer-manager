import Link from "next/link";
import { buttonVariants } from "~/components/ui/button";
import { LoginForm } from "./_components/login-form";
import { cn } from "~/lib/utils";
import { routes } from "~/app/constants/routes";
import { validateRequest } from "~/server/auth/validate";
import { redirect } from "next/navigation";

export default async function Page() {
  const { user } = await validateRequest();
  if (user) {
    return redirect(routes.dashboard);
  }
  return (
    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">Login</h1>
        <p className="text-muted-foreground text-sm">
          Enter your details below to create your enter
        </p>
      </div>
      <LoginForm />
      <Link
        href={routes.register}
        className={cn(
          buttonVariants({
            variant: "outline",
          }),
        )}
      >
        Register
      </Link>
      <p className="text-muted-foreground px-8 text-center text-sm">
        <Link
          href={routes.forgotPassword}
          className="hover:text-primary underline underline-offset-4"
        >
          Forgot Password
        </Link>
      </p>
    </div>
  );
}
