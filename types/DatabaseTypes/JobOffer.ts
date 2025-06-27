import { JobOfferLanguage } from "./JobOfferLanguage";
import { JobOfferContractType } from "./JobOfferContractType";
import { JobOfferWorkingHour } from "./JobOfferWorkingHour";
import { JobOfferQuranReading } from "./JobOfferQuranReading";

export interface Mosque {
  id: number;
  name: string;
  city: string;
  zip_code: string;
  picture?: string;
}

export interface JobOffer {
  id: number;
  mosque: Mosque;
  title: string;
  description: string;
  urgent: boolean;
  status: string;
  benefits: Array<{ benefit: string; created_at: number; updated_at: number }>;
  contract_types: JobOfferContractType[];
  languages: JobOfferLanguage[];
  quran_readings: JobOfferQuranReading[];
  remuneration: number;
  skills: Array<{ skill: string; created_at: number; updated_at: number }>;
  working_hours: JobOfferWorkingHour[];
  created_at: number;
  updated_at: number;
}
