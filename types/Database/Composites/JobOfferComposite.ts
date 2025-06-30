import {
  JobOffer,
  JobOfferBenefit,
  JobOfferContractType,
  JobOfferLanguage,
  JobOfferQuranReading,
  JobOfferSkill,
  JobOfferWorkingHour,
} from "..";

import { MosqueComposite } from "./MosqueComposite";

export type JobOfferComposite = {
  jobOffer: JobOffer;
  mosque: MosqueComposite;
  benefits: JobOfferBenefit[];
  contractTypes: JobOfferContractType[];
  languages: JobOfferLanguage[];
  quranReadings: JobOfferQuranReading[];
  skills: JobOfferSkill[];
  workingHours: JobOfferWorkingHour[];
};
