"use client";
import { Task } from "@prisma/client";
import React from "react";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import { addTask } from "@/actions/task";
import { toast } from "sonner";
import { TaskItem } from "./task-item";
import { TaskDialog } from "./task-dialog";

interface Props {
  tasks: Task[];
  boardId: string;
}

export const TaskList = ({ tasks, boardId }: Props) => {
  const [open, setOpen] = React.useState(false);
  const [selectedTask, setSelectedTask] = React.useState<Task>({} as Task);
  const [isLoading, setIsLoading] = React.useState(false);

  const listRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (tasks.length > 0) {
      listRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [tasks]);

  const handleTaskClick = (task: Task) => {
    setOpen(true);
    setSelectedTask(task);
  };

  const handleAddTask = async () => {
    try {
      setIsLoading(true);
      await addTask(boardId);
      toast.success("Task added successfully");
      setTimeout(() => {
        listRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
      }, 100);
    } catch (error) {
      console.log(error);
      toast.error("Failed to add task");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col flex-1 py-10 overflow-auto">
      <div className="flex flex-col gap-5 py-2">
        {tasks.length === 0 ? (
          <div className="flex items-center justify-center h-20 text-gray-500">
            No tasks yet. Add one below!
          </div>
        ) : (
          tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onClick={() => handleTaskClick(task)}
            />
          ))
        )}
      </div>
      <div className="mt-auto pt-5" ref={listRef}>
        <Button
          size="lg"
          className="w-full bg-[#F5E8D5] hover:bg-[#F5D565] h-14 justify-start text-gray-800"
          onClick={handleAddTask}
          disabled={isLoading}
          aria-label="Add new task"
        >
          <div className=" bg-[#E9A23B] rounded flex items-center justify-center  size-10">
            <span className="flex items-center justify-center size-6 bg-[#F5E8D5] rounded-full">
              <Plus className="h-4 w-4 text-[#E9A23B]" />
            </span>
          </div>
          {isLoading ? "Adding..." : "Add New Task"}
        </Button>
      </div>
      <TaskDialog open={open} setOpen={setOpen} task={selectedTask} />
    </div>
  );
};
