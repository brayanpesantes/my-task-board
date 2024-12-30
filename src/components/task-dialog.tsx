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
import { ICONS, STATUS_ICONS } from "@/lib/utils";
import { deleteTask, updateTask } from "@/actions/task";
import { toast } from "sonner";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "./ui/input";

interface Props {
  open: boolean;
  task: Task; // Ya no es null porque solo es para editar
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
      toast.success("Tarea eliminada exitosamente");
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
                      <Input placeholder="Nombre de la tarea" {...field} />
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
                        className="resize-none min-h-[100px]"
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
                            className="flex items-center justify-center"
                          >
                            <div className="p-3 size-5">{icon}</div>
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
                        className="grid grid-cols-1 md:grid-cols-2 gap-4"
                        variant="outline"
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        {Object.keys(STATUS_ICONS).map((status) => (
                          <ToggleGroupItem
                            key={status}
                            value={status}
                            className="flex items-center justify-start gap-3 py-[2px]"
                          >
                            <span className="p-3">
                              {
                                STATUS_ICONS[
                                  status as keyof typeof STATUS_ICONS
                                ]
                              }
                            </span>
                            {status}
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
