export const NotificationType = {
  APPLICATION: "application",
  JOB_OFFER: "job_offer",
  LIKE: "like",
  NOTIFICATION: "notification",
  INVITATION: "invitation",
} as const;

export type NotificationType =
  (typeof NotificationType)[keyof typeof NotificationType];
