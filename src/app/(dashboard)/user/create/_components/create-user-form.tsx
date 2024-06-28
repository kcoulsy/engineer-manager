"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { createReportAction } from "~/server/actions/report/create";

export function CreateUserForm() {
  const [isPending] = useTransition();
  const { execute, result } = useAction(createReportAction);
  const form = useForm({
    defaultValues: {
      name: "",
    },
    resolver: zodResolver(
      z.object({
        name: z.string().min(1, "Name is required"),
      }),
    ),
  });

  const onSubmit = form.handleSubmit((data) => {
    execute(data);
  });

  return (
    <form onSubmit={onSubmit} className="grid gap-4">
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
      {result.data?.error && (
        <p className="text-sm text-red-500">{result.data?.error}</p>
      )}
      <Button disabled={isPending}>Create new report</Button>
    </form>
  );
}
