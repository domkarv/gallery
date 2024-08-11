"use server";

import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { db } from "./db";
import { groups } from "./db/schema";

export async function joinGroupAction(formData: FormData) {
  console.log(formData.get("group"));
}

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
