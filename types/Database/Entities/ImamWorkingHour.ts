import { WorkingHourEnum } from "../Enums/WorkingHourEnum";

export type ImamWorkingHour = {
  user_id: string;
  working_hour: WorkingHourEnum;
  created_at: string;
};
