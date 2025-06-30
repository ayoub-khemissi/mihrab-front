export const ApplicationStatusEnum = {
  PENDING: "pending",
  REJECTED: "rejected",
  ACCEPTED: "accepted",
  CANCELED: "canceled",
} as const;

export type ApplicationStatusEnum =
  (typeof ApplicationStatusEnum)[keyof typeof ApplicationStatusEnum];
