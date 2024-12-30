import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const colors = {
  "In Progress": "#F5E8D5",
  Completed: "#A0ECB1",
  "Won't do": "#F7D4D3",
  "To Do": "#E3E8EF",
};

export const ICONS = ["👩‍💻", "💬", "☕", "📚", "⏰"];

export const STATUS_ICONS = {
  "In Progress": "🚀",
  Completed: "✅",
  "Won't do": "❌",
};
