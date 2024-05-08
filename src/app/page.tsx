import { SignedIn, SignedOut } from "@clerk/nextjs";
import ImageDialog from "~/components/image-dialog";
import { getImages } from "~/server/actions";

export const dynamic = "force-dynamic";

async function Images() {
  const images = await getImages();

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
      {images.map((img) => {
        return <ImageDialog img={img} key={img.id} />;
      })}
    </div>
  );
}

export default async function HomePage() {
  return (
    <div className="flex flex-col items-center">
      <SignedOut>
        <p className="text-lg font-semibold">Please sign in to view images</p>
      </SignedOut>
      <SignedIn>
        <Images />
      </SignedIn>
    </div>
  );
}
