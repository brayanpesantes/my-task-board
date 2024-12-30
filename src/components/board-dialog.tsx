"use client";
import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Board } from "@prisma/client";
import { UpdateBoardForm } from "./update-board-form";
import Image from "next/image";
interface Props {
  board: Board;
}
export const BoardDialog = ({ board }: Props) => {
  const [open, setOpen] = React.useState(false);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button className="text-gray-400 hover:text-gray-600">
          <Image
            src="/edit_duotone.svg"
            alt="image-edit"
            width={24}
            height={24}
          />
        </button>
      </SheetTrigger>
      <SheetContent className="w-full md:w-96">
        <SheetHeader>
          <SheetTitle>Actualiza del Board?</SheetTitle>
          <SheetDescription>
            Puedes cambiar el nombre y la descripción de este board.
          </SheetDescription>
        </SheetHeader>
        <UpdateBoardForm board={board} isOpen={() => setOpen(false)} />
      </SheetContent>
    </Sheet>
  );
};
