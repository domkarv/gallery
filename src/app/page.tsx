import { SignedIn, SignedOut } from "@clerk/nextjs";
import Image from "next/image";
import { db } from "~/server/db";

export const dynamic = "force-dynamic";

async function Images() {
  const images = await db.query.images.findMany({
    orderBy: (model, { desc }) => desc(model.createdAt),
  });

  return (
    <div className="grid grid-cols-3 gap-8">
      {images.map((img) => {
        return (
          <Image
            key={img.id}
            src={img.url}
            alt={img.name}
            height={200}
            width={200}
            className="object-contain object-center"
          />
        );
      })}
    </div>
  );
}

export default async function HomePage() {
  return (
    <div className="my-8 flex flex-col items-center">
      <SignedOut>
        <p className="text-lg font-semibold">Please sign in to view images</p>
      </SignedOut>
      <SignedIn>
        <Images />
      </SignedIn>
    </div>
  );
}
