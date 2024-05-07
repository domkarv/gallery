"use client";

import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
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
  const [error, setError] = useState<string | null>(null);

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
          onUploadError={(error) => {
            setError(error ? "Please try again later." : null);
          }}
        />
        <AlertDialogFooter className="flex flex-col items-center">
          {error && <div className="text-destructive">{error}</div>}
          <div className="flex w-full flex-row items-center justify-end">
            <AlertDialogAction ref={ref} className="invisible">
              Done
            </AlertDialogAction>
            <AlertDialogCancel
              onClick={() => {
                setError(null);
              }}
            >
              Cancel
            </AlertDialogCancel>
          </div>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
