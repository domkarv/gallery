"use client";

import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "./ui/dialog";
import type { ImageType } from "~/server/db/schema";
import { useState } from "react";
import { Button } from "./ui/button";
import { deleteImage, getImage } from "~/server/actions";
import { toast } from "sonner";

export default function ImageDialog({ img }: { img: ImageType }) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [downloadLoading, setDownloadLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  async function handleDelete() {
    setDeleteLoading(true);
    try {
      await deleteImage(img.id);
    } catch (error) {
      console.error({ error });
    }
    setDeleteLoading(false);
    setDialogOpen(false);
    toast.success("Image deleted successfully");
  }

  const handleDownload = async () => {
    setDownloadLoading(true);
    const image = await getImage(img.id);

    if (!image) {
      setDownloadLoading(false);
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

    setDownloadLoading(false);
    setDialogOpen(false);
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger>
        <Image
          src={img.url}
          alt={img.name}
          height={256}
          width={256}
          className="object-contain"
        />
      </DialogTrigger>
      <DialogContent className="rounded-lg border-secondary">
        <Image
          src={img.url}
          alt={img.name}
          height={1024}
          width={1024}
          className="object-contain"
        />
        <DialogFooter className="flex flex-row items-center justify-center gap-4">
          <Button className="w-1/2" onClick={() => handleDownload()}>
            {downloadLoading ? "Downloading..." : "Download"}
          </Button>
          <Button
            variant="destructive"
            className="w-1/2"
            onClick={() => handleDelete()}
          >
            {deleteLoading ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
