import { SocialMediaPlatformEnum } from "../Enums/SocialMediaPlatformEnum";

export type MosqueSocialMedia = {
  mosque_id: string;
  platform: SocialMediaPlatformEnum;
  url: string;
  created_at: string;
  updated_at: string | null;
};
