export type MosqueSocialMedia = {
  platform: "website" | "instagram" | "facebook" | "youtube" | "twitter";
  url: string;
  created_at: number;
  updated_at: number | null;
};
