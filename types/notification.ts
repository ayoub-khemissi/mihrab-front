import { User } from "./user";

export type Notification = {
  id: number;
  user: User;
  type: "application" | "job_offer" | "like" | "notification" | "invitation";
  message: string;
  url: string;
  is_read: boolean;
  created_at: number;
  updated_at: number;
};
