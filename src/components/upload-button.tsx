"use client";

import { UploadIcon } from "lucide-react";
import { CldUploadButton } from "next-cloudinary";
import { uploadImage } from "~/server/image-actions";

export function SimpleUploadButton() {
  return (
    <CldUploadButton
      uploadPreset="next_cloudinary_preset"
      onSuccess={async (res) => {
        await uploadImage(res.info);
      }}
    >
      <UploadIcon />
    </CldUploadButton>
  );
}
