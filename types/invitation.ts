import { JobOffer } from "./job-offer";
import { User } from "./user";

export type Invitation = {
  job_offer: JobOffer;
  imam: User;
  message: string;
  status: "pending" | "accepted" | "declined";
  created_at: number;
  updated_at: number | null;
};
