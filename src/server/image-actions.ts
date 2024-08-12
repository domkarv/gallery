"use server";

import { auth } from "@clerk/nextjs/server";
import { v2 as cloudinary } from "cloudinary";
import { and, eq, sql } from "drizzle-orm";
import { type CloudinaryUploadWidgetInfo } from "next-cloudinary";
import { revalidatePath } from "next/cache";
import { env } from "~/env";
import { db } from "./db";
import { type ImageType, groups, images } from "./db/schema";

export async function getImages({
  groupId,
}: {
  groupId: string;
}): Promise<ImageType[]> {
  const user = auth();

  if (!user.userId) {
    throw new Error("Unauthorized!");
  }

  try {
    return await db.query.images.findMany({
      where: (model, { eq, and }) =>
        and(eq(model.userId, user.userId), eq(model.groupId, groupId)),
      orderBy: (model, { desc }) => desc(model.createdAt),
    });
  } catch (error) {
    if (error instanceof Error) console.error(error.message);
    else console.error(error);

    throw new Error("Error occured while reading images");
  }
}

export async function getImage(id: string) {
  const user = auth();

  if (!user.userId) {
    throw new Error("Unauthorized!");
  }

  try {
    return await db.query.images.findFirst({
      where: (model, { and, eq }) =>
        and(eq(model.id, id), eq(model.userId, user.userId)),
    });
  } catch (error) {
    if (error instanceof Error) console.error(error.message);
    else console.error(error);

    throw new Error("Error occured while reading image");
  }
}

export async function deleteImage({
  publicId,
  groupId,
}: {
  publicId: string;
  groupId: string;
}) {
  const user = auth();

  if (!user.userId) {
    throw new Error("Unauthorized!");
  }

  try {
    await db
      .delete(images)
      .where(
        and(eq(images.publicId, publicId), eq(images.userId, user.userId)),
      );

    await db
      .update(groups)
      .set({
        images: sql`array_remove(${groups.images}, ${publicId})`,
      })
      .where(eq(groups.id, groupId));

    cloudinary.config({
      api_key: env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
      cloud_name: env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
      api_secret: env.CLOUDINARY_API_SECRET,
    });

    await cloudinary.uploader.destroy(publicId, () => {
      console.log("Image Deleted!");
    });
  } catch (error) {
    if (error instanceof Error) console.error(error.message);
    else console.error(error);

    throw new Error("Error occured while deleting image");
  }

  revalidatePath("/");
}

export async function uploadImage({
  info,
  groupId,
}: {
  info: string | CloudinaryUploadWidgetInfo | undefined;
  groupId: string;
}) {
  const user = auth();

  if (!user.userId) {
    throw new Error("Unauthorized!");
  }

  if (typeof info == "undefined" || typeof info == "string") {
    throw new Error("Failed to read images!");
  }

  try {
    const image = await db
      .insert(images)
      .values({
        url: info.url,
        name: info.original_filename,
        userId: user.userId,
        publicId: info.public_id,
        groupId: groupId,
      })
      .returning({
        publicId: images.publicId,
      });

    await db
      .update(groups)
      .set({
        images: sql`array_append(${groups.images}, ${image[0]!.publicId})`,
      })
      .where(eq(groups.id, groupId));
  } catch (error) {
    if (error instanceof Error) console.error(error.message);
    else console.error(error);

    throw new Error(
      "Error occured while uploadin image and updating group info",
    );
  }

  revalidatePath("/");
}
