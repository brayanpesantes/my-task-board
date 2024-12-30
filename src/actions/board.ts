"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updateBoard(
  id: string,
  board: { name: string; description: string }
) {
  const existsBoard = await prisma.board.findUnique({
    where: { id },
  });
  if (!existsBoard) {
    return false;
  }
  await prisma.board.update({
    where: { id },
    data: board,
  });
  revalidatePath(`/board/${id}`);
  return true;
}
