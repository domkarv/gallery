"use client";

import { useRouter } from "next/navigation";
import { useRef } from "react";
import { UploadDropzone } from "~/utils/uploadthing";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { Button } from "./ui/button";

export default function CustomUploadButton() {
  const router = useRouter();
  const ref = useRef<HTMLButtonElement>(null);

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button asChild size="sm" variant="secondary">
          <span>Upload</span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="rounded-lg border">
        <UploadDropzone
          endpoint="imageUploader"
          onClientUploadComplete={() => {
            router.refresh();
            if (ref.current) ref.current.click();
          }}
        />
        <AlertDialogFooter>
          <AlertDialogAction ref={ref} className="invisible">
            Done
          </AlertDialogAction>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
