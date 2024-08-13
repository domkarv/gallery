"use client";

import { PenIcon } from "lucide-react";
import { CldUploadButton } from "next-cloudinary";
import { changeGroupThumbnail } from "~/server/group-actions";
import { Button } from "./ui/button";

export default function ChangeThumbnailBtn({
  groupId,
  imagePublicId,
}: {
  groupId: string;
  imagePublicId: string;
}) {
  return (
    <Button asChild>
      <CldUploadButton
        uploadPreset="next_cloudinary_preset"
        onSuccess={async (res) => {
          await changeGroupThumbnail({
            info: res.info,
            groupId,
            imagePublicId,
          });
        }}
        className="gap-2 mix-blend-difference"
        options={{
          maxFileSize: 8388608, // 8mb
          sources: ["local", "camera", "google_drive", "url"],
        }}
      >
        <PenIcon className="size-4" /> Change Thumbnail
      </CldUploadButton>
    </Button>
  );
}
