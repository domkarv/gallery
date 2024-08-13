"use server";

import { auth } from "@clerk/nextjs/server";
import { v2 as cloudinary } from "cloudinary";
import { and, eq } from "drizzle-orm";
import { type CloudinaryUploadWidgetInfo } from "next-cloudinary";
import { revalidatePath } from "next/cache";
import { env } from "~/env";
import { db } from "./db";
import { groups, images } from "./db/schema";

interface State {
  error?: string;
  success?: boolean;
  groupId?: string;
}

export async function createGroupAction(prevState: State, formData: FormData) {
  const groupName = formData.get("group_name");

  if (!groupName || typeof groupName !== "string") {
    return {
      success: false,
      error: "Please provide valid group name",
    };
  }

  const user = auth();

  if (!user.userId) {
    throw new Error("Unauthorized!");
  }

  try {
    const isGroupExists = await db.query.groups.findFirst({
      where: (model, { eq }) => eq(model.name, groupName),
    });

    if (isGroupExists) {
      return {
        success: false,
        error: `Group with name "${groupName}" already exists`,
      };
    }

    const group = await db
      .insert(groups)
      .values({
        name: groupName,
        admin: user.userId,
      })
      .returning({
        id: groups.id,
      });

    return {
      success: true,
      groupId: group[0]?.id,
    };
  } catch (error) {
    if (error instanceof Error) console.error(error.message);
    else console.error(error);

    throw new Error("Error occured while creating group");
  }
}

export async function getGroups() {
  const user = auth();

  if (!user.userId) {
    return null;
  }

  try {
    return await db.select().from(groups).where(eq(groups.admin, user.userId));
  } catch (error) {
    if (error instanceof Error) console.error(error.message);
    else console.error(error);

    throw new Error("Error occured while reading groups");
  }
}

export async function getGroupInfo({ id }: { id: string }) {
  const user = auth();

  if (!id || !user.userId) {
    return null;
  }

  try {
    return await db.query.groups.findFirst({
      where: (model, { eq, and }) =>
        and(eq(model.id, id), eq(model.admin, user.userId)),
    });
  } catch (error) {
    if (error instanceof Error) console.error(error.message);
    else console.error(error);

    throw new Error("Error occured while reading group info");
  }
}

export const deleteGroupAction = async (groupId: string) => {
  try {
    const groupImages = await db
      .delete(groups)
      .where(eq(groups.id, groupId))
      .returning({
        images: groups.images,
      });

    if (groupImages[0] && groupImages[0].images.length !== 0) {
      cloudinary.config({
        api_key: env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
        cloud_name: env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
        api_secret: env.CLOUDINARY_API_SECRET,
      });

      await cloudinary.api.delete_resources(
        groupImages[0].images,
        (error, result) => {
          if (error) {
            console.error(error);
          } else {
            console.log(result);
          }
        },
      );
    }
  } catch (error) {
    if (error instanceof Error) console.error(error.message);
    else console.error(error);

    throw new Error("Error occured while deleting group");
  }

  revalidatePath("/");
};

export const renameGroupAction = async (
  groupId: string,
  prevState: State,
  formData: FormData,
) => {
  const groupName = formData.get("group_name");

  if (!groupName || typeof groupName !== "string") {
    return {
      success: false,
    };
  }

  try {
    await db
      .update(groups)
      .set({
        name: groupName,
      })
      .where(eq(groups.id, groupId));
  } catch (error) {
    if (error instanceof Error) console.error(error.message);
    else console.error(error);

    throw new Error("Error occured while renaming group");
  }

  revalidatePath("/");

  return {
    success: true,
  };
};

export async function changeGroupThumbnail({
  info,
  groupId,
  imagePublicId,
}: {
  info: string | CloudinaryUploadWidgetInfo | undefined;
  groupId: string;
  imagePublicId: string;
}) {
  const user = auth();

  if (!user.userId) {
    throw new Error("Unauthorized!");
  }

  if (typeof info == "undefined" || typeof info == "string") {
    throw new Error("Failed to read images!");
  }

  try {
    await db.delete(images).where(eq(images.publicId, imagePublicId));

    cloudinary.config({
      api_key: env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
      cloud_name: env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
      api_secret: env.CLOUDINARY_API_SECRET,
    });

    await cloudinary.uploader.destroy(imagePublicId, () => {
      console.log("Image Deleted!");
    });

    await db.insert(images).values({
      url: info.url,
      name: info.original_filename,
      userId: user.userId,
      publicId: info.public_id,
      groupId: groupId,
      isThumbnail: true,
    });

    await db
      .update(groups)
      .set({
        thumbnail: info.public_id,
      })
      .where(eq(groups.id, groupId));
  } catch (error) {
    if (error instanceof Error) console.error(error.message);
    else console.error(error);

    throw new Error("Error occured while uploading group thumbnail");
  }

  revalidatePath("/");
  revalidatePath(`/group/${groupId}`);
}

export async function getThumbnailImage(publicId: string | null) {
  if (!publicId) return null;

  try {
    const image = await db.query.images.findFirst({
      where: (model, { eq }) =>
        and(eq(model.publicId, publicId), eq(model.isThumbnail, true)),
    });

    return image?.url;
  } catch (error) {
    if (error instanceof Error) console.error(error.message);
    else console.error(error);

    throw new Error("Error occured while reading group thumbnail");
  }
}
