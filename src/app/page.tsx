import Image from "next/image";
import { db } from "~/server/db";

export default async function HomePage() {
  const images = await db.query.images.findMany();

  return (
    <main className="container flex min-h-screen flex-col items-center gap-4">
      <h2 className="my-8 text-xl font-semibold">{`Friend's Gallery App`}</h2>
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
    </main>
  );
}
