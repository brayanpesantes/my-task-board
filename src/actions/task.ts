"use server";

import { taskSchema } from "@/components/task-dialog";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { notFound } from "next/navigation";
import { z } from "zod";

export async function addTask(boardId: string) {
  const task = await prisma.task.create({
    data: {
      name: "New Task",
      description: "This is a new task",
      icon: "📚",
      status: "To Do",
      boardId,
    },
  });
  if (!task) {
    notFound();
  }
  revalidatePath(`/board/${boardId}`);
}

export async function updateTask(
  id: string,
  values: z.infer<typeof taskSchema>
) {
  const task = await prisma.task.update({
    where: { id },
    data: values,
  });
  if (!task) {
    notFound();
  }
  console.log(task);

  revalidatePath(`/board/${task.boardId}`);
}

export async function deleteTask(id: string) {
  const task = await prisma.task.delete({
    where: { id },
  });
  if (!task) {
    notFound();
  }
  console.log(task);

  revalidatePath(`/board/${task.boardId}`);
}
