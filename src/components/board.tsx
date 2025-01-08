"use client";
import { BoardTask } from "@/lib/types";
import { HeaderBoard } from "./header-board";
import { TaskList } from "./task-list";

interface Props {
  initialBoard: BoardTask;
}
export const Board = ({ initialBoard }: Props) => {
  return (
    <div className="container mx-auto max-w-[552px] max-h-dvh flex flex-col py-12  px-4 md:px-0">
      <HeaderBoard board={initialBoard} />
      <TaskList tasks={initialBoard.tasks} boardId={initialBoard.id} />
    </div>
  );
};
