"use client";

// import { toast } from "sonner";
import { UploadIcon } from "lucide-react";
import { CldUploadButton } from "next-cloudinary";
import { uploadImage } from "~/server/actions";

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
