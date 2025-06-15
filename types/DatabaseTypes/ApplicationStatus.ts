export const ApplicationStatus = {
  PENDING: "pending",
  REJECTED: "rejected",
  ACCEPTED: "accepted",
  CANCELED: "canceled",
} as const;

export type ApplicationStatus =
  (typeof ApplicationStatus)[keyof typeof ApplicationStatus];
