export const InvitationStatusEnum = {
  PENDING: "pending",
  ACCEPTED: "accepted",
  DECLINED: "declined",
} as const;

export type InvitationStatusEnum =
  (typeof InvitationStatusEnum)[keyof typeof InvitationStatusEnum];
