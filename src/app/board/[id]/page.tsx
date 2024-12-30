import { Board } from "@/components/board";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";

type Params = {
  params: Promise<{ id: string }>;
};
export default async function BoardIdPage({ params }: Params) {
  const { id } = await params;
  const board = await prisma.board.findFirst({
    where: {
      id,
    },
    include: {
      tasks: true,
    },
  });

  if (!board) {
    notFound();
  }

  return <Board initialBoard={board} />;
}
