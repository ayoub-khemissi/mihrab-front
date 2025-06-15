export const JobOfferBenefit = {
  APARTMENT: "apartment",
  OFFICE: "office",
  LIBRARY: "library",
  ADMINISTRATIVE_ASSISTANT: "administrative_assistant",
} as const;

export type JobOfferBenefit =
  (typeof JobOfferBenefit)[keyof typeof JobOfferBenefit];
