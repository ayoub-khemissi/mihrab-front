import { Mosque } from "./mosque";
import { User } from "./user";
import { MosqueManagerLike } from "./mosque-manager-like";

export type MosqueManagerProfile = {
  user: User;
  mosque: Mosque;
  position: "president" | "secretary" | "treasurer" | "mosque_manager";
  mosque_manager_likes: MosqueManagerLike[];
  created_at: number;
  updated_at: number;
};
