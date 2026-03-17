import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const simLoading = (second: number = 5) =>
  new Promise((resolve) => setTimeout(() => resolve(null), second * 1000));
