"use client";
import React, { useTransition } from "react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Board } from "@prisma/client";
import { updateBoard } from "@/actions/board";
import { toast } from "sonner";
interface Props {
  board: Board;
  isOpen: () => void;
}
export const UpdateBoardForm = ({ board, isOpen }: Props) => {
  const [name, setName] = React.useState(board?.name);
  const [description, setDescription] = React.useState(
    board?.description ?? ""
  );
  const [isPending, startTransition] = useTransition();
  const handleOnSSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    startTransition(() => {
      updateBoard(board.id, { name, description }).then((success) => {
        if (success) {
          toast.success("Baoard actualizado correctamente.");
          isOpen();
        } else {
          toast.error("No se pudo actualizar el Board.");
        }
      });
    });
  };
  return (
    <div className="mt-10 space-y-2">
      <form className=" space-y-3" onSubmit={handleOnSSubmit}>
        <Input
          placeholder="Nombre del Board"
          defaultValue={name}
          onChange={(e) => setName(e.target.value)}
        />

        <Textarea
          className="input"
          placeholder="Descripción del Board"
          defaultValue={description}
          onChange={(e) => setDescription(e.target.value)}
        ></Textarea>
        <Button type="submit" disabled={isPending} className="w-full">
          {isPending ? "Actualizando..." : "Actualizar"}
        </Button>
      </form>
      <Button variant={"outline"} onClick={() => isOpen()} className="w-full">
        Cancelar
      </Button>
    </div>
  );
};
