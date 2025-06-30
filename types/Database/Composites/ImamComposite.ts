import {
  ImamContract,
  ImamDiploma,
  ImamExperience,
  ImamLanguage,
  ImamLike,
  ImamProfile,
  ImamQuranReading,
  ImamSkill,
  ImamWorkingHour,
  ImamZone,
  User,
} from "..";

export type ImamComposite = {
  user: User;
  profile: ImamProfile;
  contracts: ImamContract[];
  diplomas: ImamDiploma[];
  workingHours: ImamWorkingHour[];
  experiences: ImamExperience[];
  skills: ImamSkill[];
  languages: ImamLanguage[];
  quranReadings: ImamQuranReading[];
  likes: ImamLike[];
  zones: ImamZone[];
};
