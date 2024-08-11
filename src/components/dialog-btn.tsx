"use client";

import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { toast } from "sonner";
import type { ImageType } from "~/server/db/schema";
import { deleteImage, getImage } from "~/server/image-actions";
import { Button } from "./ui/button";
import { DialogClose } from "./ui/dialog";

export function DeleteBtn({ publicId }: { publicId: string }) {
  const [loading, setLoading] = useState(false);
  const ref = useRef<HTMLButtonElement>(null);
  const router = useRouter();

  async function handleDelete() {
    setLoading(true);

    try {
      await deleteImage(publicId);

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
      <Button className="w-1/2 rounded-lg" onClick={() => handleDownload()}>
        {loading ? "Downloading..." : "Download"}
      </Button>
      <DialogClose className="sr-only" ref={ref}>
        Close
      </DialogClose>
    </>
  );
}
