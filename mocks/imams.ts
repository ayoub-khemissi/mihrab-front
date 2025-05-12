import { mockJobOffers } from "./job-offers";

import { User } from "@/types/user";
import { ImamProfile } from "@/types/imam-profile";
import { ImamZone } from "@/types/imam-zone";
import { ImamSkill } from "@/types/imam-skill";
import { ImamDiploma } from "@/types/imam-diploma";
import { ImamExperience } from "@/types/imam-experience";
import { ImamWorkingHour } from "@/types/imam-working-hour";
import { ImamQuranReading } from "@/types/imam-quran-reading";
import { ImamContractType } from "@/types/imam-contract-type";

export const mockImams: ImamProfile[] = [
  {
    user: {
      id: 1,
      email: "ahmed.bensalah@email.com",
      first_name: "Ahmed",
      last_name: "Ben Salah",
      photo: null,
      created_at: 0,
      updated_at: 0,
    } as User,
    bio: "Imam passionné avec 10 ans d'expérience. Spécialisé dans l'enseignement du Coran et la conduite des prières.",
    contract_type: [
      {
        contract_type: "permanent",
        created_at: 0,
      } as ImamContractType,
    ],
    diploma: [
      {
        diploma_name: "Licence Théologie",
        institution: "Université Al Azhar",
        city: "Le Caire",
        year_obtained: 2015,
        description: "Formation complète en sciences islamiques.",
        created_at: 0,
        updated_at: 0,
      } as ImamDiploma,
    ],
    working_hours: [
      {
        working_hour: "full_time",
        created_at: 0,
        updated_at: 0,
      } as ImamWorkingHour,
    ],
    experience: [
      {
        title: "Imam principal",
        city: "Paris",
        zip_code: "75001",
        country: "France",
        latitude: 48.8566,
        longitude: 2.3522,
        start_date: 2016,
        end_date: 2024,
        created_at: 0,
        updated_at: 0,
      } as ImamExperience,
    ],
    skills: [
      {
        skill: "five_prayers",
        created_at: 0,
        updated_at: 0,
      },
      {
        skill: "jumuah",
        created_at: 0,
        updated_at: 0,
      },
      {
        skill: "tarawih",
        created_at: 0,
        updated_at: 0,
      },
      {
        skill: "quran_classes",
        created_at: 0,
        updated_at: 0,
      },
    ] as ImamSkill[],
    zones: [
      {
        address: "123 Rue de la Mosquée",
        city: "Paris",
        zip_code: "75001",
        country: "France",
        latitude: 48.8566,
        longitude: 2.3522,
        created_at: 0,
        updated_at: 0,
      } as ImamZone,
    ],
    quran_readings: [
      {
        riwaya: "hafs",
        hizb_hifz: "hafiz",
        tajweed_mastery: true,
        ijazah: true,
        created_at: 0,
      } as ImamQuranReading,
    ],
    created_at: 0,
    updated_at: 0,
    languages: [
      {
        language: "arabic",
        level: "fluent",
        created_at: 0,
        updated_at: 0,
      },
    ],
    likes: [
      {
        job_offer: mockJobOffers[0],
        created_at: 0,
      },
    ],
  },
  {
    user: {
      id: 2,
      email: "youssef.elamrani@email.com",
      first_name: "Youssef",
      last_name: "El Amrani",
      photo: null,
      created_at: 0,
      updated_at: 0,
    } as User,
    bio: "Imam dynamique, expert en conférences et dialogue interreligieux.",
    contract_type: [
      {
        contract_type: "fixed_term",
        created_at: 0,
      } as ImamContractType,
    ],
    diploma: [
      {
        diploma_name: "Master Sciences Religieuses",
        institution: "Université de Lyon",
        city: "Lyon",
        year_obtained: 2018,
        description: "Expertise en dialogue interreligieux et conférences.",
        created_at: 0,
        updated_at: 0,
      } as ImamDiploma,
    ],
    working_hours: [
      {
        working_hour: "part_time",
        created_at: 0,
        updated_at: 0,
      } as ImamWorkingHour,
    ],
    experience: [
      {
        title: "Imam remplaçant",
        city: "Lyon",
        zip_code: "69000",
        country: "France",
        latitude: 45.75,
        longitude: 4.85,
        start_date: 2019,
        end_date: 2024,
        created_at: 0,
        updated_at: 0,
      } as ImamExperience,
    ],
    skills: [
      {
        skill: "five_prayers",
        created_at: 0,
        updated_at: 0,
      },
      {
        skill: "aid_prayer",
        created_at: 0,
        updated_at: 0,
      },
      {
        skill: "conferences",
        created_at: 0,
        updated_at: 0,
      },
    ] as ImamSkill[],
    zones: [
      {
        address: "45 Avenue des Fleurs",
        city: "Lyon",
        zip_code: "69000",
        country: "France",
        latitude: 45.75,
        longitude: 4.85,
        created_at: 0,
        updated_at: 0,
      } as ImamZone,
    ],
    quran_readings: [
      {
        riwaya: "warsh",
        hizb_hifz: "21-30",
        tajweed_mastery: true,
        ijazah: false,
        created_at: 0,
      } as ImamQuranReading,
    ],
    created_at: 0,
    updated_at: 0,
    languages: [
      {
        language: "arabic",
        level: "fluent",
        created_at: 0,
        updated_at: 0,
      },
    ],
    likes: [
      {
        job_offer: mockJobOffers[0],
        created_at: 0,
      },
    ],
  },
  {
    user: {
      id: 3,
      email: "omar.bouzid@email.com",
      first_name: "Omar",
      last_name: "Bouzid",
      photo: null,
      created_at: 0,
      updated_at: 0,
    } as User,
    bio: "Imam expérimenté, pédagogue et proche des jeunes.",
    contract_type: [
      {
        contract_type: "occasional",
        created_at: 0,
      } as ImamContractType,
    ],
    diploma: [
      {
        diploma_name: "Licence Études Islamiques",
        institution: "Université de Marseille",
        city: "Marseille",
        year_obtained: 2012,
        description: "Formation axée sur la pédagogie et la transmission.",
        created_at: 0,
        updated_at: 0,
      } as ImamDiploma,
    ],
    working_hours: [
      {
        working_hour: "part_time",
        created_at: 0,
        updated_at: 0,
      } as ImamWorkingHour,
    ],
    experience: [
      {
        title: "Imam suppléant",
        city: "Marseille",
        zip_code: "13000",
        country: "France",
        latitude: 43.2965,
        longitude: 5.3698,
        start_date: 2013,
        end_date: 2024,
        created_at: 0,
        updated_at: 0,
      } as ImamExperience,
    ],
    skills: [
      {
        skill: "five_prayers",
        created_at: 0,
        updated_at: 0,
      },
      {
        skill: "quran_classes",
        created_at: 0,
        updated_at: 0,
      },
      {
        skill: "questions_answers",
        created_at: 0,
        updated_at: 0,
      },
    ] as ImamSkill[],
    zones: [
      {
        address: "78 Boulevard Central",
        city: "Marseille",
        zip_code: "13000",
        country: "France",
        latitude: 43.2965,
        longitude: 5.3698,
        created_at: 0,
        updated_at: 0,
      } as ImamZone,
    ],
    quran_readings: [
      {
        riwaya: "qalun",
        hizb_hifz: "11-20",
        tajweed_mastery: false,
        ijazah: false,
        created_at: 0,
        updated_at: 0,
      } as ImamQuranReading,
    ],
    created_at: 0,
    updated_at: 0,
    languages: [
      {
        language: "arabic",
        level: "fluent",
        created_at: 0,
        updated_at: 0,
      },
    ],
    likes: [
      {
        job_offer: mockJobOffers[0],
        created_at: 0,
      },
    ],
  },
];
