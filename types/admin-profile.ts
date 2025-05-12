import { User } from "./user";

export type AdminProfile = {
  user: User;
  created_at: number;
  updated_at: number | null;
};
