import { JobOfferBenefitEnum } from "../Enums/JobOfferBenefitEnum";

export type JobOfferBenefit = {
  job_offer_id: string;
  benefit: JobOfferBenefitEnum;
  created_at: string;
};
