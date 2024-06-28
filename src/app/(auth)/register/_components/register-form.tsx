"use client";

import { useAction } from "next-safe-action/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";
import { registerAction } from "~/server/actions/auth/register";
import { useTransition } from "react";

export function RegisterForm() {
  const [isPending] = useTransition();
  const { execute, result } = useAction(registerAction);
  const form = useForm({
    defaultValues: {
      username: "",
      name: "",
      password: "",
    },
    resolver: zodResolver(
      z.object({
        name: z.string().min(1, "Name is required"),
        username: z.string().min(3).max(30).regex(/^\w+$/),
        password: z.string().min(8).max(100),
      }),
    ),
  });

  const onSubmit = form.handleSubmit(async (data) => {
    execute(data);
  });

  return (
    <div className={cn("grid gap-6")}>
      <form onSubmit={onSubmit}>
        <div className="grid gap-4">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="name">
              Name
            </Label>
            <Input
              id="name"
              placeholder="Name"
              type="text"
              autoCapitalize="none"
              autoComplete="name"
              autoCorrect="off"
              disabled={isPending}
              {...form.register("name")}
            />
            {form.formState.errors.name && (
              <p className="text-sm text-red-500">
                {form.formState.errors.name.message}
              </p>
            )}
          </div>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="username">
              Username
            </Label>
            <Input
              id="username"
              placeholder="Username"
              type="text"
              autoCapitalize="none"
              autoComplete="username"
              autoCorrect="off"
              disabled={isPending}
              {...form.register("username")}
            />
            {form.formState.errors.username && (
              <p className="text-sm text-red-500">
                Username must be at least 3 characters long and contain only
                letters, numbers, and underscores.
              </p>
            )}
          </div>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="password">
              Password
            </Label>
            <Input
              id="password"
              placeholder="Password"
              type="password"
              autoCapitalize="none"
              autoComplete="password"
              autoCorrect="off"
              disabled={isPending}
              {...form.register("password")}
            />
            {form.formState.errors.password && (
              <p className="text-sm text-red-500">
                Password must be at least 8 characters long, and contain only
                letters, numbers, and special characters.
              </p>
            )}
          </div>
          {result.data?.error && (
            <p className="text-sm text-red-500">{result.data?.error}</p>
          )}
          <Button disabled={isPending}>Register</Button>
        </div>
      </form>
    </div>
  );
}
