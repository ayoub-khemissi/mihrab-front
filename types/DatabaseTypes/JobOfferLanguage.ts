import { Language, LanguageLevel } from ".";

export interface JobOfferLanguage {
  language: Language;
  level: LanguageLevel;
  created_at: number;
  updated_at: number;
}
