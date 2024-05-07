import Image from "next/image";
import { db } from "~/server/db";

export default async function HomePage() {
  const images = await db.query.images.findMany();

  return (
    <div className="my-8 flex flex-col items-center">
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
    </div>
  );
}
