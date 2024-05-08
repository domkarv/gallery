import Image from "next/image";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import type { ImageType } from "~/server/db/schema";
import DownloadBtn from "./download-btn";

export default function ImageDialog({ img }: { img: ImageType }) {
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Image
          src={img.url}
          alt={img.name}
          height={256}
          width={256}
          className="object-contain"
        />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <Image
          src={img.url}
          alt={img.name}
          height={1024}
          width={1024}
          className="object-contain"
        />
        <AlertDialogFooter className="flex flex-row items-center justify-center gap-4">
          <AlertDialogAction asChild>
            <DownloadBtn id={img.id} />
          </AlertDialogAction>
          <AlertDialogCancel className="m-0 w-1/2">Close</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
