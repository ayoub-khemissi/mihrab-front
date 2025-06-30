import { ContractTypeEnum, ImamSkillEnum, WorkingHourEnum } from "../Database";
import { ImamDiploma } from "../Database/Entities/ImamDiploma";
import { ImamExperience } from "../Database/Entities/ImamExperience";
import { ImamZone } from "../Database/Entities/ImamZone";
import { QuranReading } from "../Database/Entities/QuranReading";
import { Media } from "../Database/Entities/Media";
import { ImamLanguage } from "../Database/Entities/ImamLanguage";

export interface RegisterProfileImamFormData {
  firstName: string;
  lastName: string;
  phone: string;
  bio: string;
  photo?: Media | null;
  workingHours: WorkingHourEnum[];
  contractTypes: ContractTypeEnum[];
  zones: ImamZone[];
  skills: ImamSkillEnum[];
  languages: ImamLanguage[];
  quranReadings: QuranReading[];
  experiences: ImamExperience[];
  diplomas: ImamDiploma[];
  currentExperienceIndex: number | null;
}
