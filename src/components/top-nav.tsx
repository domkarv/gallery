import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import CreateGroup from "./create-group";
import JoinGroup from "./join-group";
import { Button } from "./ui/button";

export function TopNav() {
  return (
    <nav className="container mx-auto flex items-center justify-between border-b p-4 text-lg font-semibold">
      <Link href="/">{`Friend's Gallery`}</Link>

      <div className="flex flex-row items-center gap-4">
        <SignedOut>
          <Button asChild variant="outline" size="sm">
            <SignInButton mode="modal">Sign In</SignInButton>
          </Button>
        </SignedOut>

        <SignedIn>
          <JoinGroup />
          <CreateGroup />
          <UserButton />
        </SignedIn>
      </div>
    </nav>
  );
}
