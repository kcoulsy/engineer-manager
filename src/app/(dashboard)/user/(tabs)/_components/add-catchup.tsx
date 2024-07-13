"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Textarea } from "~/components/ui/textarea";
import type { Report } from "~/server/db/schema";

export function AddCatchupButton({ report }: { report: Report }) {
  const [isOpen, setIsOpen] = useState(false);
  const form = useForm({
    defaultValues: {
      content: "",
    },
  });

  const onSubmit = form.handleSubmit(async (data) => {
    console.log(data);
    setIsOpen(false);
  });

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>Add Catchup</Button>
      </DialogTrigger>
      <DialogContent>
        <form onSubmit={onSubmit} className="space-y-4">
          <DialogHeader>
            <DialogTitle>Add catchup notes</DialogTitle>
          </DialogHeader>
          <Textarea rows={10} {...form.register("content")} />
          <DialogFooter>
            <Button type="submit">Add</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
