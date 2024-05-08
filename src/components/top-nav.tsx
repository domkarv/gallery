import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Button } from "./ui/button";
import { SimpleUploadButton } from "./upload-button";
import Link from "next/link";

export function TopNav() {
  return (
    <nav className="container mx-auto flex items-center justify-between border-b p-4 text-lg font-semibold">
      <Link href="/">{`Friend's Gallery`}</Link>

      <div className="flex flex-row items-center gap-4">
        <SignedOut>
          <Button asChild variant="outline" size="sm">
            <SignInButton>Sign In</SignInButton>
          </Button>
        </SignedOut>
        <SignedIn>
          <SimpleUploadButton />
          <UserButton />
        </SignedIn>
      </div>
    </nav>
  );
}
