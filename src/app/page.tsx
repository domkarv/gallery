import { SignedIn, SignedOut } from "@clerk/nextjs";
import { ImagesGrid } from "~/components/image-grid";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  return (
    <div className="flex flex-col items-center">
      <SignedOut>
        <p className="text-lg font-semibold">
          Please sign in to view images & uplaod images
        </p>
      </SignedOut>
      <SignedIn>
        <ImagesGrid />
      </SignedIn>
    </div>
  );
}
