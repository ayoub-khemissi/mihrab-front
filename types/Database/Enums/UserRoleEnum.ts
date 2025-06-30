export const UserRoleEnum = {
  NONE: "none",
  IMAM: "imam",
  MOSQUE_MANAGER: "mosque_manager",
  ADMIN: "admin",
} as const;

export type UserRoleEnum = (typeof UserRoleEnum)[keyof typeof UserRoleEnum];
