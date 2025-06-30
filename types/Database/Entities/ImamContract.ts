import { ContractTypeEnum } from "../Enums/ContractTypeEnum";

export type ImamContract = {
  user_id: string;
  contract_type: ContractTypeEnum;
  created_at: string;
};
