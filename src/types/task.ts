export type TaskStatus = "PENDING" | "COMPLETED";

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  dueDate: string | null;
  createdAt: string;
}
