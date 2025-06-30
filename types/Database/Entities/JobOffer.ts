import { JobOfferStatusEnum } from "../Enums/JobOfferStatusEnum";

export type JobOffer = {
  id: string;
  mosque_id: string;
  title: string;
  description: string;
  remuneration: number;
  urgent: boolean;
  status: JobOfferStatusEnum;
  created_at: string;
  updated_at: string | null;
};
