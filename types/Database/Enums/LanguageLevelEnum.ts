export const LanguageLevelEnum = {
  BEGINNER: "beginner",
  INTERMEDIATE: "intermediate",
  ADVANCED: "advanced",
  FLUENT: "fluent",
} as const;

export type LanguageLevelEnum =
  (typeof LanguageLevelEnum)[keyof typeof LanguageLevelEnum];
