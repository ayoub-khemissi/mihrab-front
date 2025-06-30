export const MosqueManagerPositionEnum = {
  NONE: "none",
  PRESIDENT: "president",
  SECRETARY: "secretary",
  TREASURER: "treasurer",
  MOSQUE_MANAGER: "mosque_manager",
} as const;

export type MosqueManagerPositionEnum =
  (typeof MosqueManagerPositionEnum)[keyof typeof MosqueManagerPositionEnum];
