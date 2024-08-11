import { SignedIn, SignedOut } from "@clerk/nextjs";
import Image from "next/image";
import Groups from "~/components/groups";

export default async function HomePage() {
  return (
    <div className="flex flex-col items-center">
      <SignedOut>
        <p className="text-lg font-semibold">Please sign in to get started</p>
        <Image
          alt="login"
          src="/assets/login.svg"
          width="400"
          height="400"
          className="my-12"
        />
      </SignedOut>
      <SignedIn>
        <Groups />
      </SignedIn>
    </div>
  );
}
