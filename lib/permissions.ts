import type { User } from "@/lib/auth";

type Task = { createdBy: string; assignedTo?: string | null };

export const isAdmin = (user: User) => user.role === "ADMIN";
export const isEmployee = (user: User) => user.role === "EMPLOYEE";

export const canCreateTask = (user: User) => isAdmin(user);
export const canDeleteTask = (user: User) => isAdmin(user);
export const canAssignTask = (user: User) => isAdmin(user);
export const canViewAllTasks = (user: User) => isAdmin(user);

export function canEditTask(user: User): boolean {
  return isAdmin(user);
}

export function canUpdateTaskStatus(user: User, task: Task): boolean {
  if (isAdmin(user)) return true;
  return task.assignedTo === user.id;
}

export function canViewTask(user: User, task: Task): boolean {
  if (isAdmin(user)) return true;
  return task.assignedTo === user.id;
}