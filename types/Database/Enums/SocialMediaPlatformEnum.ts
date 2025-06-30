export const SocialMediaPlatformEnum = {
  WEBSITE: "website",
  INSTAGRAM: "instagram",
  FACEBOOK: "facebook",
  YOUTUBE: "youtube",
  TWITTER: "twitter",
} as const;

export type SocialMediaPlatformEnum =
  (typeof SocialMediaPlatformEnum)[keyof typeof SocialMediaPlatformEnum];
