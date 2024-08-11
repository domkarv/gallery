"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { useFormState } from "react-dom";
import { toast } from "sonner";
import { createGroupAction } from "~/server/group-actions";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

export default function CreateGroup() {
  const router = useRouter();
  const closeRef = useRef<HTMLButtonElement>(null);
  const [state, formAction] = useFormState(createGroupAction, {
    success: false,
    error: undefined,
    groupName: "",
  });

  useEffect(() => {
    if (state.success) {
      toast.success("Group has been created successfully.", {
        style: {
          color: "green",
        },
      });

      closeRef.current?.click();

      router.push(`/group/${state.groupName}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.success]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm">Create Group</Button>
      </DialogTrigger>

      <DialogContent
        aria-describedby={undefined}
        className="rounded-lg border-secondary"
      >
        <form action={formAction} className="flex flex-col gap-4">
          <DialogTitle className="sr-only">Create Group</DialogTitle>

          <DialogDescription asChild>
            <div className="flex flex-col items-start gap-4">
              <Label htmlFor="group_name">Enter group name</Label>
              <Input name="group_name" required />
              {state.error && <p className="text-sm">{state.error}</p>}
            </div>
          </DialogDescription>

          <DialogFooter>
            <Button type="submit" className="w-full">
              Create
            </Button>
          </DialogFooter>

          <DialogClose ref={closeRef} />
        </form>
      </DialogContent>
    </Dialog>
  );
}
