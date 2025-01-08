import { Board } from "@prisma/client";
import React from "react";
import { BoardDialog } from "./board-dialog";
import Image from "next/image";

interface Props {
  board: Board;
}

export const HeaderBoard = ({ board }: Props) => {
  return (
    <div className="flex flex-col gap-3 items-start">
      <div className="inline-flex gap-2 items-center">
        <Image src="/logo.svg" width={50} height={50} alt="logo task" />
        <h1 className="text-4xl font-bold">{board.name}</h1>
        <BoardDialog board={board} />
      </div>
      <div className="ml-16">
        <p className="text-gray-600">{board.description}</p>
      </div>
    </div>
  );
};
