import { LanguageEnum } from "../Enums/LanguageEnum";
import { LanguageLevelEnum } from "../Enums/LanguageLevelEnum";

export type ImamLanguage = {
  imam_id: string;
  language: LanguageEnum;
  level: LanguageLevelEnum;
  created_at: string;
};
