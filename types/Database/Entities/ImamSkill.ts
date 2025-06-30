import { ImamSkillEnum } from "../Enums/ImamSkillEnum";

export type ImamSkill = {
  user_id: string;
  skill: ImamSkillEnum;
  created_at: string;
};
