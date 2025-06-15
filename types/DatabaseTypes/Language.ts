export const Language = {
  ARABIC: "arabic",
  FRENCH: "french",
} as const;

export type Language = (typeof Language)[keyof typeof Language];
