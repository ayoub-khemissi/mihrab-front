export const LanguageEnum = {
  ARABIC: "arabic",
  FRENCH: "french",
} as const;

export type LanguageEnum = (typeof LanguageEnum)[keyof typeof LanguageEnum];
