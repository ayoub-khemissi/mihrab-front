import { User } from "./user";
import { ImamContractType } from "./imam-contract-type";
import { ImamDiploma } from "./imam-diploma";
import { ImamExperience } from "./imam-experience";
import { ImamLanguage } from "./imam-language";
import { ImamLike } from "./imam-like";
import { ImamQuranReading } from "./imam-quran-reading";
import { ImamSkill } from "./imam-skill";
import { ImamWorkingHour } from "./imam-working-hour";
import { ImamZone } from "./imam-zone";

export type ImamProfile = {
  user: User;
  bio: string;

  contract_type: ImamContractType[];
  diploma: ImamDiploma[];
  experience: ImamExperience[];
  languages: ImamLanguage[];
  likes: ImamLike[];
  quran_readings: ImamQuranReading[];
  skills: ImamSkill[];
  working_hours: ImamWorkingHour[];
  zones: ImamZone[];

  created_at: number;
  updated_at: number;
};
