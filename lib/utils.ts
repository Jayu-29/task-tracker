import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function calculatePriority(
  importance: "LOW" | "MEDIUM" | "HIGH",
  urgency: "LOW" | "MEDIUM" | "HIGH"
): number {
  const score = { LOW: 1, MEDIUM: 2, HIGH: 3 };
  return score[importance] * score[urgency];
}