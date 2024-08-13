"use client";

import { PenIcon } from "lucide-react";
import { CldUploadButton } from "next-cloudinary";
import { changeGroupThumbnail } from "~/server/group-actions";
import { Button } from "./ui/button";

export default function ChangeThumbnailBtn({ groupId }: { groupId: string }) {
  return (
    <Button asChild>
      <CldUploadButton
        uploadPreset="next_cloudinary_preset"
        onSuccess={async (res) => {
          await changeGroupThumbnail({ info: res.info, groupId });
        }}
        className="gap-2 mix-blend-difference"
      >
        <PenIcon className="size-4" /> Change Thumbnail
      </CldUploadButton>
    </Button>
  );
}
