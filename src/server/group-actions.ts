"use server";

import { auth } from "@clerk/nextjs/server";
import { arrayContains, eq, or } from "drizzle-orm";
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

export async function getGroups() {
  const user = auth();

  if (!user.userId) {
    throw new Error("Unauthorized!");
  }

  try {
    return await db
      .select()
      .from(groups)
      .where(
        or(
          eq(groups.admin, user.userId),
          arrayContains(groups.members, [user.userId]),
        ),
      );
  } catch (error) {
    if (error instanceof Error) console.error(error.message);
    else console.error(error);

    throw new Error("Error occured while reading groups");
  }
}

export async function getGroupInfo({ name }: { name: string }) {
  if (!name) {
    throw new Error("No Group found!");
  }

  try {
    return await db.query.groups.findFirst({
      where: (model, { eq }) => eq(model.name, name),
    });
  } catch (error) {
    if (error instanceof Error) console.error(error.message);
    else console.error(error);

    throw new Error("Error occured while reading group info");
  }
}
