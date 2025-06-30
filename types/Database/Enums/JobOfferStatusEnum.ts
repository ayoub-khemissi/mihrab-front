export const JobOfferStatusEnum = {
  DRAFT: "draft",
  PUBLISHED: "published",
  ARCHIVED: "archived",
} as const;

export type JobOfferStatusEnum =
  (typeof JobOfferStatusEnum)[keyof typeof JobOfferStatusEnum];
