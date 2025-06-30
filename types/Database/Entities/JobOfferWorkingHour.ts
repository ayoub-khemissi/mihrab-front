import { WorkingHourEnum } from "../Enums/WorkingHourEnum";

export type JobOfferWorkingHour = {
  job_offer_id: string;
  working_hour: WorkingHourEnum;
  created_at: string;
};
