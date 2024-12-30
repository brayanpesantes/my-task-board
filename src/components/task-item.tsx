import { cn, colors } from "@/lib/utils";
import { Task } from "@prisma/client";

interface Props {
  task: Task;
  onClick: () => void;
}
export const TaskItem = ({ task, onClick }: Props) => {
  return (
    <button
      onClick={onClick}
      className={cn("w-full flex gap-5 p-4 rounded-lg transition-colors")}
      style={{ backgroundColor: colors[task.status as keyof typeof colors] }}
    >
      <div className="bg-white py-2 px-3 rounded-lg">
        <span className="size-5">{task.icon}</span>
      </div>
      <div className="flex flex-col items-start gap-2 py-2">
        <span className="font-medium">{task.name}</span>
        {task.description && (
          <p className="mt-1 text-sm text-gray-600">{task.description}</p>
        )}
      </div>
    </button>
  );
};
