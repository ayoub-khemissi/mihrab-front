export const SocialMediaPlatform = {
  WEBSITE: "website",
  INSTAGRAM: "instagram",
  FACEBOOK: "facebook",
  YOUTUBE: "youtube",
  TWITTER: "twitter",
} as const;

export type SocialMediaPlatform =
  (typeof SocialMediaPlatform)[keyof typeof SocialMediaPlatform];
