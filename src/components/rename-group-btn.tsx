"use client";

import { useEffect, useRef } from "react";
import { useFormState } from "react-dom";
import { toast } from "sonner";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { renameGroupAction } from "~/server/group-actions";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

export default function RenameGroupBtn({ groupId }: { groupId: string }) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const [state, formAction] = useFormState(
    renameGroupAction.bind(null, groupId),
    { success: false },
  );

  useEffect(() => {
    if (state.success) {
      toast.success("Group has been renamed successfully.", {
        style: {
          color: "green",
        },
      });

      closeRef.current?.click();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.success]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="w-full text-start font-normal">Rename</button>
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
              <Input name="group_name" required autoComplete="off" />
            </div>
          </DialogDescription>

          <DialogFooter>
            <Button type="submit" className="w-full">
              Change name
            </Button>
          </DialogFooter>

          <DialogClose ref={closeRef} />
        </form>
      </DialogContent>
    </Dialog>
  );
}
