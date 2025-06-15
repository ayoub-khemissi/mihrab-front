export const MosqueManagerPosition = {
  PRESIDENT: "president",
  SECRETARY: "secretary",
  TREASURER: "treasurer",
  MOSQUE_MANAGER: "mosque_manager",
} as const;

export type MosqueManagerPosition =
  (typeof MosqueManagerPosition)[keyof typeof MosqueManagerPosition];
