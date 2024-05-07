"use server";

import { db } from "./db";
import { auth } from "@clerk/nextjs/server";

export async function getImages() {
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
