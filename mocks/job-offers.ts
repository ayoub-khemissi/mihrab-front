import { mockMosques } from "./mosques";

import { JobOfferComposite } from "@/types/Database/Composites/JobOfferComposite";
import {
  JobOffer,
  JobOfferBenefit,
  JobOfferContractType,
  JobOfferLanguage,
  JobOfferQuranReading,
  JobOfferSkill,
  JobOfferWorkingHour,
} from "@/types/Database";

export const mockJobOffers: JobOfferComposite[] = [
  {
    jobOffer: {
      id: "1",
      mosque_id: mockMosques[0].mosque.id,
      title: "Imam Ramadan 2026",
      description: "Nous recherchons un imam pour le mois de Ramadan.",
      remuneration: 2150,
      urgent: true,
      status: "published",
      created_at: "1724832000000",
      updated_at: "1724832000000",
    } as JobOffer,
    mosque: mockMosques[0],
    benefits: [
      {
        job_offer_id: "1",
        benefit: "apartment",
        created_at: "1724832000000",
      },
      {
        job_offer_id: "1",
        benefit: "administrative_assistant",
        created_at: "1724832000000",
      },
    ] as JobOfferBenefit[],
    contractTypes: [
      { contract_type: "fixed_term", created_at: "1724832000000" },
    ] as JobOfferContractType[],
    languages: [
      { language: "arabic", level: "fluent", created_at: "1724832000000" },
      { language: "french", level: "advanced", created_at: "1724832000000" },
    ] as JobOfferLanguage[],
    quranReadings: [
      {
        job_offer_id: "1",
        riwaya: "hafs",
        hizb_hifz: "twenty_thirty",
        tajweed_mastery: true,
        ijazah: false,
        created_at: "1724832000000",
      },
    ] as JobOfferQuranReading[],
    skills: [
      { skill: "five_prayers", created_at: "1724832000000" },
      { skill: "jumuah", created_at: "1724832000000" },
    ] as JobOfferSkill[],
    workingHours: [
      { working_hour: "full_time", created_at: "1724832000000" },
    ] as JobOfferWorkingHour[],
  },
  {
    jobOffer: {
      id: "2",
      mosque_id: mockMosques[1].mosque.id,
      title: "Imam annuel",
      description: "Poste d'imam à plein temps.",
      remuneration: 2000,
      urgent: false,
      status: "published",
      created_at: "1724832000000",
      updated_at: "1724832000000",
    } as JobOffer,
    mosque: mockMosques[1],
    benefits: [
      { benefit: "apartment", created_at: "1724832000000" },
      { benefit: "library", created_at: "1724832000000" },
    ] as JobOfferBenefit[],
    contractTypes: [
      { contract_type: "permanent", created_at: "1724832000000" },
    ] as JobOfferContractType[],
    languages: [
      { language: "arabic", level: "advanced", created_at: "1724832000000" },
      { language: "french", level: "fluent", created_at: "1724832000000" },
    ] as JobOfferLanguage[],
    quranReadings: [
      {
        riwaya: "hafs",
        hizb_hifz: "hafiz",
        tajweed_mastery: true,
        ijazah: true,
        created_at: "1724832000000",
      },
    ] as JobOfferQuranReading[],
    skills: [
      { skill: "jumuah", created_at: "1724832000000" },
      { skill: "conferences", created_at: "1724832000000" },
    ] as JobOfferSkill[],
    workingHours: [
      { working_hour: "full_time", created_at: "1724832000000" },
    ] as JobOfferWorkingHour[],
  },
  {
    jobOffer: {
      id: "3",
      mosque_id: mockMosques[2].mosque.id,
      title: "Imam remplaçant",
      description: "Remplacement durant les vacances d'été.",
      remuneration: 1900,
      urgent: false,
      status: "published",
      created_at: "1724832000000",
      updated_at: "1724832000000",
    } as JobOffer,
    mosque: mockMosques[2],
    benefits: [
      { benefit: "apartment", created_at: "1724832000000" },
    ] as JobOfferBenefit[],
    contractTypes: [
      { contract_type: "occasional", created_at: "1724832000000" },
    ] as JobOfferContractType[],
    languages: [
      {
        language: "french",
        level: "advanced",
        created_at: "1724832000000",
        job_offer_id: "3",
      },
    ] as JobOfferLanguage[],
    quranReadings: [
      {
        riwaya: "al_duri",
        hizb_hifz: "zero_ten",
        tajweed_mastery: false,
        ijazah: false,
        created_at: "1724832000000",
        job_offer_id: "3",
      },
    ] as JobOfferQuranReading[],
    skills: [
      { skill: "aid_prayer", created_at: "1724832000000" },
    ] as JobOfferSkill[],
    workingHours: [
      { working_hour: "part_time", created_at: "1724832000000" },
    ] as JobOfferWorkingHour[],
  },
];
