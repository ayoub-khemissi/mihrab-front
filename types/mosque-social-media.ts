import { Mosque } from "./mosque";

export type MosqueSocialMedia = {
  mosque: Mosque;
  platform: "website" | "instagram" | "facebook" | "youtube" | "twitter";
  url: string;
  created_at: number;
  updated_at: number;
};
