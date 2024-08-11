import { Card } from "~/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import { type GroupType } from "~/server/db/schema";

export default function GroupCard({ group }: { group: GroupType }) {
  return (
    <Card className="w-full max-w-md overflow-hidden rounded-xl shadow-lg">
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
    </Card>
  );
}
