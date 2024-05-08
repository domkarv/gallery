import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "./ui/dialog";
import type { ImageType } from "~/server/db/schema";
import { DeleteBtn, DownloadBtn } from "./dialog-btn";
import { getPlaiceholder } from "plaiceholder";

export default async function ImageDialog({ img }: { img: ImageType }) {
  const buffer = await fetch(img.url).then(async (res) => {
    return Buffer.from(await res.arrayBuffer());
  });

  const { base64 } = await getPlaiceholder(buffer);

  return (
    <Dialog>
      <DialogTrigger>
        <Image
          src={img.url}
          alt={img.name}
          height={256}
          width={256}
          placeholder="blur"
          blurDataURL={base64}
          className="object-contain"
          loading="lazy"
        />
      </DialogTrigger>
      <DialogContent className="rounded-lg border-secondary">
        <Image
          src={img.url}
          alt={img.name}
          height={1024}
          width={1024}
          placeholder="blur"
          blurDataURL={base64}
          className="object-contain"
        />
        <DialogFooter className="flex flex-row items-center justify-center gap-4">
          <DownloadBtn img={img} />
          <DeleteBtn img={img} />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
