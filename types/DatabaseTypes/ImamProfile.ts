import { User } from "./User";
import { ImamZone } from "./ImamZone";
import { ImamLanguage } from "./ImamLanguage";
import { ImamContractType } from "./ImamContractType";
import { ImamWorkingHour } from "./ImamWorkingHour";
import { ImamQuranReading } from "./ImamQuranReading";
import { ImamSkill } from "./ImamSkill";
import { ImamDiploma } from "./ImamDiploma";
import { ImamExperience } from "./ImamExperience";

export interface ImamProfile {
  user: User;
  bio: string;
  contract_type: ImamContractType[];
  working_hours: ImamWorkingHour[];
  zones: ImamZone[];
  languages: ImamLanguage[];
  skills: ImamSkill[];
  diploma: ImamDiploma[];
  experience: ImamExperience[];
  quran_readings: ImamQuranReading[];
  likes: Array<{ job_offer: any; created_at: number }>;
  created_at: number;
  updated_at: number;
}
