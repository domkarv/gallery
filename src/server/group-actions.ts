"use server";

import { auth } from "@clerk/nextjs/server";
import { db } from "./db";
import { groups } from "./db/schema";

export async function joinGroupAction(formData: FormData) {
  console.log(formData.get("group"));
}

interface State {
  error?: string;
  success?: boolean;
  groupName?: string;
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

    await db.insert(groups).values({
      name: groupName,
      admin: user.userId,
    });

    return {
      success: true,
      groupName,
    };
  } catch (error) {
    if (error instanceof Error) console.error(error.message);
    else console.error(error);

    throw new Error("Error occured while creating group");
  }
}
