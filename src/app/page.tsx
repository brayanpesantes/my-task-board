import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function Home() {
  const board = await prisma.board.findFirst();
  if (board) {
    redirect(`/board/${board.id}`);
  }
  const newBoard = await prisma.board.create({
    data: {
      name: "My Task Board",
      description: "Tasks to keep organised",
      tasks: {
        create: [
          { name: "Task in Progress", status: "In Progress", icon: "⏰" },
          { name: "Task Completed", status: "Completed", icon: "🐰" },
          { name: "Task Won't Do", status: "Won't do", icon: "☕" },
          {
            name: "Task To Do",
            status: "To Do",
            icon: "📚",
            description:
              "Work on a Challenge on devChallenges.io, learn TypeScript.",
          },
        ],
      },
    },
  });
  redirect(`/board/${newBoard.id}`);
}
