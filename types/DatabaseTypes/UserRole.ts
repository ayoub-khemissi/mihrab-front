export const UserRole = {
  NONE: "none",
  IMAM: "imam",
  MOSQUE_MANAGER: "mosque_manager",
  ADMIN: "admin",
} as const;

export type UserRole = (typeof UserRole)[keyof typeof UserRole];
