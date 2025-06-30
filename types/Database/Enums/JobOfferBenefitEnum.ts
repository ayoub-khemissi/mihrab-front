export const JobOfferBenefitEnum = {
  APARTMENT: "apartment",
  OFFICE: "office",
  LIBRARY: "library",
  ADMINISTRATIVE_ASSISTANT: "administrative_assistant",
} as const;

export type JobOfferBenefitEnum =
  (typeof JobOfferBenefitEnum)[keyof typeof JobOfferBenefitEnum];
