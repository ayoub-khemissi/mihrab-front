export const NotificationTypeEnum = {
  APPLICATION: "application",
  JOB_OFFER: "job_offer",
  LIKE: "like",
  NOTIFICATION: "notification",
  INVITATION: "invitation",
} as const;

export type NotificationTypeEnum =
  (typeof NotificationTypeEnum)[keyof typeof NotificationTypeEnum];
