"use client";
import React, { useEffect } from "react";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Task } from "@prisma/client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group";
import { cn, ICONS, STATUS_ICONS } from "@/lib/utils";
import { deleteTask, updateTask } from "@/actions/task";
import { toast } from "sonner";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "./ui/input";
import { Check } from "lucide-react";

interface Props {
  open: boolean;
  task: Task;
  setOpen: (open: boolean) => void;
}

export const taskSchema = z.object({
  name: z.string().min(1, "El nombre es requerido"),
  description: z.string(),
  icon: z.string().min(1, "El ícono es requerido"),
  status: z.string().min(1, "El estado es requerido"),
});

type TaskFormValues = z.infer<typeof taskSchema>;

export const TaskDialog = ({ open, setOpen, task }: Props) => {
  const form = useForm<TaskFormValues>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      name: task?.name,
      description: task?.description || "",
      icon: task?.icon,
      status: task?.status,
    },
  });

  useEffect(() => {
    if (task) {
      form.reset({
        name: task.name,
        description: task.description || "",
        icon: task.icon,
        status: task.status,
      });
    }
  }, [task, form]);

  const onSubmit = async (values: TaskFormValues) => {
    try {
      await updateTask(task.id, values);
      toast.success("Tarea actualizada exitosamente");
      setOpen(false);
    } catch (error) {
      console.log(error);
      toast.error("Error al actualizar la tarea");
    }
  };

  const handleDelete = async () => {
    try {
      await deleteTask(task.id);
      toast.success("Tarea eliminada exitosamente", { description: task.name });
      setOpen(false);
    } catch (error) {
      console.log(error);

      toast.error("Error al eliminar la tarea");
    }
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Editar Tarea</SheetTitle>
        </SheetHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="h-full flex flex-col justify-between pb-8"
          >
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Nombre de la tarea"
                        {...field}
                        className="focus-visible:ring-blue-500 "
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descripción</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Descripción de la tarea..."
                        className="resize-none min-h-[100px] focus-visible:ring-blue-500 "
                        maxLength={500}
                        rows={4}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="icon"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ícono</FormLabel>
                    <FormControl>
                      <ToggleGroup
                        type="single"
                        className="flex flex-wrap gap-2 py-[2px] justify-start"
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        {ICONS.map((icon) => (
                          <ToggleGroupItem
                            key={icon}
                            value={icon}
                            className="flex items-center justify-center hover:bg-yellow-500  data-[state=on]:bg-yellow-500 bg-gray-300"
                          >
                            <span className="size-5">{icon}</span>
                          </ToggleGroupItem>
                        ))}
                      </ToggleGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Estado</FormLabel>
                    <FormControl>
                      <ToggleGroup
                        type="single"
                        className="grid grid-cols-1 md:grid-cols-2 gap-2"
                        variant="outline"
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        {Object.keys(STATUS_ICONS).map((status) => (
                          <ToggleGroupItem
                            key={status}
                            value={status}
                            variant={"outline"}
                            className="flex items-center justify-start gap-1 py-[2px] border-2 hover:border-blue-500 data-[state=on]:border-blue-500"
                          >
                            <span className="p-3">
                              {
                                STATUS_ICONS[
                                  status as keyof typeof STATUS_ICONS
                                ]
                              }
                            </span>
                            {status}
                            <span
                              className={cn([
                                "ml-auto size-5 text-white bg-blue-500 opacity-0 rounded-full flex items-center justify-center",
                                {
                                  "opacity-100": field.value === status,
                                },
                              ])}
                            >
                              <Check
                                className="size-3"
                                aria-hidden="true"
                                size={16}
                              />
                            </span>
                          </ToggleGroupItem>
                        ))}
                      </ToggleGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <SheetFooter className="gap-2">
              <Button
                type="button"
                variant="destructive"
                onClick={handleDelete}
              >
                Eliminar
              </Button>
              <Button type="submit">Guardar cambios</Button>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
};
