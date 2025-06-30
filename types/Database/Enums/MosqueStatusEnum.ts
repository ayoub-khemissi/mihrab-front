export const MosqueStatusEnum = {
  PENDING: "pending",
  APPROVED: "approved",
  REJECTED: "rejected",
} as const;

export type MosqueStatusEnum =
  (typeof MosqueStatusEnum)[keyof typeof MosqueStatusEnum];
