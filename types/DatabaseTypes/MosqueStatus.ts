export const MosqueStatus = {
  PENDING: "pending",
  APPROVED: "approved",
  REJECTED: "rejected",
} as const;

export type MosqueStatus = (typeof MosqueStatus)[keyof typeof MosqueStatus];
