"use client";

import { useRef, useState } from "react";
import { toast } from "sonner";
import { deleteImage, getImage } from "~/server/actions";
import type { ImageType } from "~/server/db/schema";
import { Button } from "./ui/button";
import { DialogClose } from "./ui/dialog";
import { useRouter } from "next/navigation";

export function DeleteBtn({ img }: { img: ImageType }) {
  const [loading, setLoading] = useState(false);
  const ref = useRef<HTMLButtonElement>(null);
  const router = useRouter();

  async function handleDelete() {
    setLoading(true);
    try {
      await deleteImage(img.id);

      if (ref.current) ref.current.click();
    } catch (error) {
      console.error({ error });
    }

    setLoading(false);

    router.refresh();

    toast.success("Image deleted successfully", {
      style: {
        color: "green",
      },
    });
  }

  return (
    <>
      <Button
        variant="destructive"
        size="lg"
        className="w-1/2 rounded-lg"
        onClick={() => handleDelete()}
      >
        {loading ? "Deleting..." : "Delete"}
      </Button>
      <DialogClose className="sr-only" ref={ref}>
        Close
      </DialogClose>
    </>
  );
}

export function DownloadBtn({ img }: { img: ImageType }) {
  const [loading, setLoading] = useState(false);
  const ref = useRef<HTMLButtonElement>(null);

  async function handleDownload() {
    setLoading(true);
    const image = await getImage(img.id);

    if (!image) {
      setLoading(false);
      return;
    }

    const response = await fetch(image.url);
    const blob = await response.blob();

    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", image.name);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setLoading(false);
    if (ref.current) ref.current.click();
  }

  return (
    <>
      <Button
        size="lg"
        className="w-1/2 rounded-lg"
        onClick={() => handleDownload()}
      >
        {loading ? "Downloading..." : "Download"}
      </Button>
      <DialogClose className="sr-only" ref={ref}>
        Close
      </DialogClose>
    </>
  );
}
