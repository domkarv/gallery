import { Card } from "~/components/ui/card";
import Link from "next/link";
import { Avatar, AvatarImage, AvatarFallback } from "~/components/ui/avatar";
import Image from "next/image";
import { type GroupType } from "~/server/db/schema";

export default function GroupCard({ group }: { group: GroupType }) {
  return (
    <Card className="w-full max-w-md overflow-hidden rounded-xl shadow-lg">
      <Link
        href={`/group/${group.name}`}
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
          className="aspect-[5/3] h-[200px] w-full object-cover transition-all group-hover:scale-125 sm:h-[240px]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute bottom-4 left-4 text-primary-foreground">
          <h3 className="text-2xl font-semibold">{group.name}</h3>
        </div>
        <div className="absolute bottom-4 right-4 flex -space-x-2">
          {group.members.map((el) => {
            return (
              <Avatar key={el} className="border-1 size-8 border-background">
                <AvatarImage
                  src="https://generated.vusercontent.net/placeholder.svg"
                  alt={el}
                />
                <AvatarFallback>JP</AvatarFallback>
              </Avatar>
            );
          })}
        </div>
      </Link>
    </Card>
  );
}
