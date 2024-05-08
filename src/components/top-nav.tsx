import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Button } from "./ui/button";
import { SimpleUploadButton } from "./upload-button";

export function TopNav() {
  return (
    <nav className="flex w-full items-center justify-between border-b p-4 text-lg font-semibold">
      <div>{`Friend's Gallery`}</div>

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
