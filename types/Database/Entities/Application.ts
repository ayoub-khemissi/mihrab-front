import { ApplicationStatusEnum } from "../Enums/ApplicationStatusEnum";

export type Application = {
  job_offer_id: string;
  imam_id: string;
  status: ApplicationStatusEnum;
  message: string;
  created_at: string;
  updated_at: string | null;
};
