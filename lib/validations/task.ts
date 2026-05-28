import { z } from "zod";

export const createTaskSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().optional(),
  dueDate: z.coerce.date().optional(),
  importance: z.enum(["LOW", "MEDIUM", "HIGH"]).default("MEDIUM"),
  urgency: z.enum(["LOW", "MEDIUM", "HIGH"]).default("MEDIUM"),
  status: z.enum(["TODO", "IN_PROGRESS", "DONE", "BLOCKED"]).default("TODO"),
  category: z
    .enum([
      "OPERATIONS",
      "PURCHASE",
      "SALES",
      "MARKETING",
      "R_AND_D",
      "FINANCE",
      "EXPANSION",
      "PERSONAL",
    ])
    .default("OPERATIONS"),
  assignedTo: z.string().optional(),
});

export const updateTaskSchema = createTaskSchema.partial();

export const updateTaskStatusSchema = z.object({
  status: z.enum(["TODO", "IN_PROGRESS", "DONE", "BLOCKED"]),
});

export type CreateTaskInput = z.infer<typeof createTaskSchema>;
export type UpdateTaskInput = z.infer<typeof updateTaskSchema>;
export type UpdateTaskStatusInput = z.infer<typeof updateTaskStatusSchema>;