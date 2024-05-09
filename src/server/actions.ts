"use server";

import { db } from "./db";
import { auth } from "@clerk/nextjs/server";
import { type ImageType, images } from "./db/schema";
import { and, eq } from "drizzle-orm";
import { revalidateTag } from "next/cache";
import { UTApi } from "uploadthing/server";

export async function getImages(): Promise<ImageType[]> {
  const user = auth();

  if (!user.userId) {
    throw new Error("Unauthorized!");
  }

  return await db.query.images.findMany({
    where: (model, { eq }) => eq(model.userId, user.userId),
    orderBy: (model, { desc }) => desc(model.createdAt),
  });
}

export async function getImage(id: string) {
  const user = auth();

  if (!user.userId) {
    throw new Error("Unauthorized!");
  }

  return await db.query.images.findFirst({
    where: (model, { and, eq }) =>
      and(eq(model.id, id), eq(model.userId, user.userId)),
  });
}

export async function deleteImage(id: string) {
  const utapi = new UTApi();

  const user = auth();

  if (!user.userId) {
    throw new Error("Unauthorized!");
  }

  const imageURLObj = await db
    .delete(images)
    .where(and(eq(images.id, id), eq(images.userId, user.userId)))
    .returning({ url: images.url });

  const imageURLs = imageURLObj.map((obj) => {
    const parts = obj.url.split("/");
    return parts[parts.length - 1];
  }) as string[];

  await utapi.deleteFiles(imageURLs);

  revalidateTag("/");
}
