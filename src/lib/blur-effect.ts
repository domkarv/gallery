import { getPlaiceholder } from "plaiceholder";

export const blurEffect = async (imgUrl: string) => {
  const buffer = await fetch(imgUrl).then(async (res) => {
    return Buffer.from(await res.arrayBuffer());
  });

  const { base64 } = await getPlaiceholder(buffer);

  return base64;
};
