import { EllipsisVerticalIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "~/components/ui/alert-dialog";
import { Card } from "~/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { type GroupType } from "~/server/db/schema";
import DeleteGroupBtn from "./delete-group-btn";

export default function GroupCard({ group }: { group: GroupType }) {
  return (
    <Card className="relative w-full max-w-md overflow-hidden rounded-xl shadow-lg">
      <Link
        href={`/group/${group.id}`}
        className="group relative block"
        prefetch={false}
      >
        <Image
          src={
            group.thumbnail ??
            "https://generated.vusercontent.net/placeholder.svg"
          }
          width="400"
          height="240"
          alt={group.name}
          unoptimized
          className="aspect-[5/3] h-[200px] w-full object-cover transition-all group-hover:scale-125 sm:h-[240px]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute bottom-4 left-4 text-primary-foreground">
          <h3 className="text-2xl font-semibold">{group.name}</h3>
        </div>
      </Link>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <EllipsisVerticalIcon className="absolute right-3 top-3 cursor-pointer stroke-black" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>
            <button className="w-full text-start font-normal">
              Change Thumbnail
            </button>
          </DropdownMenuLabel>
          <DropdownMenuLabel>
            <button className="w-full text-start font-normal">Rename</button>
          </DropdownMenuLabel>
          <AlertDialog>
            <AlertDialogTrigger className="w-full">
              <DropdownMenuLabel className="text-start text-destructive">
                Delete
              </DropdownMenuLabel>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  your group and remove your data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <DeleteGroupBtn groupId={group.id} />
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </DropdownMenuContent>
      </DropdownMenu>
    </Card>
  );
}
