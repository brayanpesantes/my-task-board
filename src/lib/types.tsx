import { Board, Task } from "@prisma/client";

export type BoardTask = Board & {
  tasks: Task[];
};
