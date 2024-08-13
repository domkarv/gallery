import { CircleXIcon, ExternalLinkIcon } from "lucide-react";
import Image from "next/image";
import { blurEffect } from "~/lib/blur-effect";
import type { ImageType } from "~/server/db/schema";
import { DeleteBtn, DownloadBtn } from "./dialog-btn";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

export default async function ImageDialog({ img }: { img: ImageType }) {
  const blur = await blurEffect(img.url);

  return (
    <div className="group relative">
      <Image
        src={img.url}
        alt={img.name}
        width={400}
        height={400}
        className="h-auto w-full object-contain"
        placeholder="blur"
        blurDataURL={blur}
        unoptimized
        loading="lazy"
      />

      <div className="absolute bottom-2 left-2 rounded-md bg-background/80 px-2 py-1 text-xs text-muted-foreground">
        <span>{img.createdAt.toLocaleString()}</span>
      </div>

      <Dialog>
        <DialogTrigger asChild>
          <div className="absolute inset-0 flex cursor-pointer items-center justify-center bg-background/80 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <ExternalLinkIcon className="size-8" />
          </div>
        </DialogTrigger>

        <DialogContent aria-describedby={undefined} className="mb-0">
          <DialogTitle className="sr-only">{img.name}</DialogTitle>
          <DialogDescription asChild>
            <Image
              src={img.url}
              alt={img.name}
              width={800}
              height={800}
              className="h-auto max-h-[70vh] w-full object-contain"
              placeholder="blur"
              blurDataURL={blur}
              unoptimized
              loading="lazy"
            />
          </DialogDescription>

          <DialogFooter className="flex w-full flex-row items-center justify-between gap-4">
            <DownloadBtn img={img} />
            <DeleteBtn publicId={img.publicId} groupId={img.groupId} />
          </DialogFooter>

          <DialogClose asChild>
            <button>
              <CircleXIcon
                className="absolute right-3 top-3"
                aria-label="Close"
              />
            </button>
          </DialogClose>
        </DialogContent>
      </Dialog>
    </div>
  );
}
