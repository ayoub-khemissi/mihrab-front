import { ImamProfile } from "./imam-profile";

export type MosqueManagerLike = {
  imam_profile: ImamProfile;
  created_at: number;
};
