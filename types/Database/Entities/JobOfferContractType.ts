import { ContractTypeEnum } from "../Enums/ContractTypeEnum";

export type JobOfferContractType = {
  job_offer_id: string;
  contract_type: ContractTypeEnum;
  created_at: string;
};
