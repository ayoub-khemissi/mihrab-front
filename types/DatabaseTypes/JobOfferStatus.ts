export const JobOfferStatus = {
  DRAFT: "draft",
  PUBLISHED: "published",
  ARCHIVED: "archived",
} as const;

export type JobOfferStatus =
  (typeof JobOfferStatus)[keyof typeof JobOfferStatus];
