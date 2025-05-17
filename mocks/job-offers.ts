import { mockMosques } from "./mosques";

import { JobOffer } from "@/types/job-offer";

export const mockJobOffers: JobOffer[] = [
  {
    id: 1,
    mosque: mockMosques[0],
    title: "Imam Ramadan 2026",
    description: "Nous recherchons un imam pour le mois de Ramadan.",
    urgent: true,
    status: "published",
    benefits: [
      { benefit: "apartment", created_at: 0, updated_at: 0 },
      { benefit: "administrative_assistant", created_at: 0, updated_at: 0 },
    ],
    contract_types: [{ contract_type: "fixed_term", created_at: 0 }],
    languages: [
      { language: "arabic", level: "fluent", created_at: 0, updated_at: 0 },
      { language: "french", level: "advanced", created_at: 0, updated_at: 0 },
    ],
    quran_readings: [
      {
        riwaya: "hafs",
        hizb_hifz: "twenty_thirty",
        tajweed_mastery: true,
        ijazah: false,
        created_at: 0,
        updated_at: 0,
      },
    ],
    remuneration: 2150,
    skills: [
      { skill: "five_prayers", created_at: 0, updated_at: 0 },
      { skill: "jumuah", created_at: 0, updated_at: 0 },
    ],
    working_hours: [{ working_hour: "full_time", created_at: 0 }],
    created_at: 0,
    updated_at: 0,
  },
  {
    id: 2,
    mosque: mockMosques[1],
    title: "Imam annuel",
    description: "Poste d'imam à plein temps.",
    urgent: false,
    status: "published",
    benefits: [
      { benefit: "apartment", created_at: 0, updated_at: 0 },
      { benefit: "library", created_at: 0, updated_at: 0 },
    ],
    contract_types: [{ contract_type: "permanent", created_at: 0 }],
    languages: [
      { language: "arabic", level: "advanced", created_at: 0, updated_at: 0 },
      { language: "french", level: "fluent", created_at: 0, updated_at: 0 },
    ],
    quran_readings: [
      {
        riwaya: "hafs",
        hizb_hifz: "hafiz",
        tajweed_mastery: true,
        ijazah: true,
        created_at: 0,
        updated_at: 0,
      },
    ],
    skills: [
      { skill: "jumuah", created_at: 0, updated_at: 0 },
      { skill: "conferences", created_at: 0, updated_at: 0 },
    ],
    working_hours: [{ working_hour: "full_time", created_at: 0 }],
    created_at: 0,
    updated_at: 0,
    remuneration: 2000,
  },
  {
    id: 3,
    mosque: mockMosques[2],
    title: "Imam remplaçant",
    description: "Remplacement durant les vacances d'été.",
    urgent: false,
    status: "published",
    benefits: [{ benefit: "apartment", created_at: 0, updated_at: 0 }],
    contract_types: [{ contract_type: "occasional", created_at: 0 }],
    languages: [
      { language: "french", level: "advanced", created_at: 0, updated_at: 0 },
    ],
    quran_readings: [
      {
        riwaya: "al_duri",
        hizb_hifz: "zero_ten",
        tajweed_mastery: false,
        ijazah: false,
        created_at: 0,
        updated_at: 0,
      },
    ],
    skills: [{ skill: "aid_prayer", created_at: 0, updated_at: 0 }],
    working_hours: [{ working_hour: "part_time", created_at: 0 }],
    created_at: 0,
    updated_at: 0,
    remuneration: 1900,
  },
];
