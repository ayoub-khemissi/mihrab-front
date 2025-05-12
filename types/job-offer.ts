import { Mosque } from "./mosque";
import { JobOfferSkill } from "./job-offer-skill";
import { JobOfferWorkingHour } from "./job-offer-working-hour";
import { JobOfferQuranReading } from "./job-offer-quran-reading";
import { JobOfferBenefit } from "./job-offer-benefit";
import { JobOfferContractType } from "./job-offer-contract-type";
import { JobOfferLanguage } from "./job-offer-language";

export type JobOffer = {
  id: number;
  mosque: Mosque;
  title: string;
  description: string;
  urgent: boolean;
  remuneration: number;
  status: "draft" | "published" | "archived";

  benefits: JobOfferBenefit[];
  contract_types: JobOfferContractType[];
  languages: JobOfferLanguage[];
  quran_readings: JobOfferQuranReading[];
  skills: JobOfferSkill[];
  working_hours: JobOfferWorkingHour[];

  created_at: number;
  updated_at: number | null;
};
