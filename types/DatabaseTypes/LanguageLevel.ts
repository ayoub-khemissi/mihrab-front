export const LanguageLevel = {
  BEGINNER: "beginner",
  INTERMEDIATE: "intermediate",
  ADVANCED: "advanced",
  FLUENT: "fluent",
} as const;

export type LanguageLevel = (typeof LanguageLevel)[keyof typeof LanguageLevel];
