import { LanguageEnum } from "../Enums/LanguageEnum";
import { LanguageLevelEnum } from "../Enums/LanguageLevelEnum";

export type JobOfferLanguage = {
  job_offer_id: string;
  language: LanguageEnum;
  level: LanguageLevelEnum;
  created_at: string;
};
