import { JobOffer } from "./job-offer";
import { User } from "./user";

export type Application = {
  job_offer: JobOffer;
  imam: User;
  status: "pending" | "rejected" | "interview" | "accepted";
  message: string;
  created_at: number;
  updated_at: number;
};
