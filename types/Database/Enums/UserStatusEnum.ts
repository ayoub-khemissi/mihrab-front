export const UserStatusEnum = {
  ACTIVE: "active",
  SUSPENDED: "suspended",
  DISABLED: "disabled",
} as const;

export type UserStatusEnum =
  (typeof UserStatusEnum)[keyof typeof UserStatusEnum];
