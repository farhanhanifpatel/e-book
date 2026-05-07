export type UserRole = "ADMIN" | "USER";

export interface User {
  userId: string;
  name: string;
  email: string;
  role: UserRole;
}
