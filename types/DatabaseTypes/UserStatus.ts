export const UserStatus = {
  ACTIVE: "active",
  SUSPENDED: "suspended",
  DISABLED: "disabled",
} as const;

export type UserStatus = (typeof UserStatus)[keyof typeof UserStatus];
