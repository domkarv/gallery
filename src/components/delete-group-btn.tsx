"use client";

import { deleteGroupAction } from "~/server/group-actions";
import { AlertDialogAction } from "./ui/alert-dialog";

export default function DeleteGroupBtn({ groupId }: { groupId: string }) {
  return (
    <AlertDialogAction onClick={() => deleteGroupAction(groupId)}>
      Continue
    </AlertDialogAction>
  );
}
