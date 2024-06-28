import Link from "next/link";
import { RegisterForm } from "./_components/register-form";
import { routes } from "~/app/constants/routes";
import { buttonVariants } from "~/components/ui/button";
import { cn } from "~/lib/utils";
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
        <h1 className="text-2xl font-semibold tracking-tight">
          Create an account
        </h1>
        <p className="text-muted-foreground text-sm">
          Enter your email below to create your account
        </p>
      </div>
      <RegisterForm />
      <Link
        href={routes.login}
        className={cn(
          buttonVariants({
            variant: "outline",
          }),
        )}
      >
        Login
      </Link>
      <p className="text-muted-foreground px-8 text-center text-sm">
        By clicking continue, you agree to our{" "}
        <Link
          href="/terms"
          className="hover:text-primary underline underline-offset-4"
        >
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link
          href="/privacy"
          className="hover:text-primary underline underline-offset-4"
        >
          Privacy Policy
        </Link>
        .
      </p>
    </div>
  );
}
