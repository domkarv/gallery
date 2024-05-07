"use client";

import { Button } from "./ui/button";
import { getImage } from "~/server/actions";

export default function DownloadBtn({ id }: { id: string }) {
  const handleDownload = async () => {
    const image = await getImage(id);

    if (!image) return;

    const response = await fetch(image.url);
    const blob = await response.blob();

    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", image.name);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Button className="w-1/2" onClick={() => handleDownload()}>
      Download
    </Button>
  );
}
