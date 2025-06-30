import { ImamSkillEnum } from "../Enums/ImamSkillEnum";

export type JobOfferSkill = {
  job_offer_id: string;
  skill: ImamSkillEnum;
  created_at: string;
};
