import { mockJobOffers } from "./job-offers";

import { ImamProfile } from "@/types/Database/Entities/ImamProfile";
import { User } from "@/types/Database/Entities/User";
import { UserRoleEnum } from "@/types/Database/Enums/UserRoleEnum";
import { UserStatusEnum } from "@/types/Database/Enums/UserStatusEnum";
import { ImamComposite } from "@/types/Database/Composites/ImamComposite";
import {
  ImamContract,
  ImamDiploma,
  ImamExperience,
  ImamLanguage,
  ImamLike,
  ImamQuranReading,
  ImamSkill,
  ImamWorkingHour,
} from "@/types/Database";

export const mockImams: ImamComposite[] = [
  {
    user: {
      id: "1",
      email: "ahmed.bensalah@email.com",
      first_name: "Ahmed",
      last_name: "Ben Salah",
      role: UserRoleEnum.IMAM,
      status: UserStatusEnum.ACTIVE,
      photo: null,
      alert_email: true,
      alert_sms: true,
      alert_browser: true,
      alert_push: true,
      marketing_email: true,
      alert_browser_subscription: null,
      alert_push_subscription: null,
      reset_password_code: null,
      verify_phone_code: null,
      phone_candidate: null,
      verify_phone_code_created_at: null,
      created_at: "1724832000000",
      updated_at: null,
    } as User,
    profile: {
      user_id: "1",
      bio: "Imam passionné avec 10 ans d'expérience. Spécialisé dans l'enseignement du Coran et la conduite des prières.",
      created_at: "1724832000000",
      updated_at: null,
    } as ImamProfile,
    contracts: [
      {
        user_id: "1",
        contract_type: "permanent",
        created_at: "1724832000000",
      },
      {
        user_id: "1",
        contract_type: "fixed_term",
        created_at: "1724832000000",
      },
      {
        user_id: "1",
        contract_type: "occasional",
        created_at: "1724832000000",
      },
    ] as ImamContract[],
    diplomas: [
      {
        diploma_name: "Licence Théologie",
        organization_name: "Université Al Azhar",
        city: "Le Caire",
        country: "Égypte",
        year_obtained: 2015,
        description: "Formation complète en sciences islamiques.",
      },
    ] as ImamDiploma[],
    workingHours: [
      {
        working_hour: "full_time",
        created_at: "1724832000000",
        user_id: "1",
      },
    ] as ImamWorkingHour[],
    experiences: [
      {
        user_id: "1",
        title: "Imam principal",
        city: "Paris",
        country: "France",
        latitude: 48.8566,
        longitude: 2.3522,
        start_date: "2016",
        end_date: "2024",
        created_at: "1724832000000",
      },
    ] as ImamExperience[],
    skills: [
      {
        skill: "five_prayers",
        created_at: "1724832000000",
        user_id: "1",
      },
      {
        skill: "jumuah",
        created_at: "1724832000000",
        user_id: "1",
      },
      {
        skill: "tarawih",
        created_at: "1724832000000",
        user_id: "1",
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
        created_at: "1724832000000",
        user_id: "1",
      },
    ],
    quranReadings: [
      {
        riwaya: "al_duri",
        hizb_hifz: "zero_ten",
        tajweed_mastery: false,
        ijazah: false,
        created_at: "1724832000000",
        imam_id: "1",
      },
    ] as ImamQuranReading[],
    languages: [
      {
        language: "arabic",
        level: "fluent",
        created_at: "1724832000000",
        imam_id: "1",
      },
    ] as ImamLanguage[],
    likes: [
      {
        job_offer_id: mockJobOffers[0].jobOffer.id,
        created_at: "1724832000000",
        imam_id: "1",
      },
    ] as ImamLike[],
  },
  {
    user: {
      id: "2",
      email: "mohamed.benali@email.com",
      first_name: "Mohamed",
      last_name: "Ben Ali",
      role: UserRoleEnum.IMAM,
      status: UserStatusEnum.ACTIVE,
      photo: null,
      alert_email: true,
      alert_sms: true,
      alert_browser: true,
      alert_push: true,
      marketing_email: true,
      alert_browser_subscription: null,
      alert_push_subscription: null,
      reset_password_code: null,
      verify_phone_code: null,
      phone_candidate: null,
      verify_phone_code_created_at: null,
      created_at: "1724832000000",
      updated_at: null,
    } as User,
    profile: {
      user_id: "2",
      bio: "Imam passionné avec 10 ans d'expérience. Spécialisé dans l'enseignement du Coran et la conduite des prières.",
      created_at: "1724832000000",
      updated_at: null,
    } as ImamProfile,
    contracts: [
      {
        user_id: "2",
        contract_type: "permanent",
        created_at: "1724832000000",
      },
      {
        user_id: "2",
        contract_type: "fixed_term",
        created_at: "1724832000000",
      },
      {
        user_id: "2",
        contract_type: "occasional",
        created_at: "1724832000000",
      },
    ] as ImamContract[],
    diplomas: [
      {
        diploma_name: "Licence Théologie",
        organization_name: "Université Al Azhar",
        city: "Le Caire",
        country: "Égypte",
        year_obtained: 2015,
        description: "Formation complète en sciences islamiques.",
      },
    ] as ImamDiploma[],
    workingHours: [
      {
        working_hour: "full_time",
        created_at: "1724832000000",
        user_id: "2",
      },
    ] as ImamWorkingHour[],
    experiences: [
      {
        user_id: "2",
        title: "Imam principal",
        city: "Paris",
        country: "France",
        latitude: 48.8566,
        longitude: 2.3522,
        start_date: "2016",
        end_date: "2024",
        created_at: "1724832000000",
      },
    ] as ImamExperience[],
    skills: [
      {
        skill: "five_prayers",
        created_at: "1724832000000",
        user_id: "2",
      },
      {
        skill: "jumuah",
        created_at: "1724832000000",
        user_id: "2",
      },
      {
        skill: "tarawih",
        created_at: "1724832000000",
        user_id: "2",
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
        created_at: "1724832000000",
        user_id: "2",
      },
    ],
    quranReadings: [
      {
        riwaya: "warsh",
        hizb_hifz: "hafiz",
        tajweed_mastery: true,
        ijazah: true,
        created_at: "1724832000000",
        imam_id: "2",
      },
      {
        riwaya: "hafs",
        hizb_hifz: "thirty_forty",
        tajweed_mastery: true,
        ijazah: false,
        created_at: "1724832000000",
        imam_id: "2",
      },
    ] as ImamQuranReading[],
    languages: [
      {
        language: "french",
        level: "fluent",
        created_at: "1724832000000",
        imam_id: "2",
      },
      {
        language: "arabic",
        level: "fluent",
        created_at: "1724832000000",
        imam_id: "1",
      },
    ] as ImamLanguage[],
    likes: [
      {
        job_offer_id: mockJobOffers[0].jobOffer.id,
        created_at: "1724832000000",
        imam_id: "1",
      },
    ] as ImamLike[],
  },
  {
    user: {
      id: "3",
      email: "yassine.benali@email.com",
      first_name: "Yassine",
      last_name: "El Amrani",
      role: UserRoleEnum.IMAM,
      status: UserStatusEnum.ACTIVE,
      photo: null,
      alert_email: true,
      alert_sms: true,
      alert_browser: true,
      alert_push: true,
      marketing_email: true,
      alert_browser_subscription: null,
      alert_push_subscription: null,
      reset_password_code: null,
      verify_phone_code: null,
      phone_candidate: null,
      verify_phone_code_created_at: null,
      created_at: "1724832000000",
      updated_at: null,
    } as User,
    profile: {
      user_id: "3",
      bio: "Imam passionné avec 10 ans d'expérience. Spécialisé dans l'enseignement du Coran et la conduite des prières.",
      created_at: "1724832000000",
      updated_at: null,
    } as ImamProfile,
    contracts: [
      {
        user_id: "3",
        contract_type: "permanent",
        created_at: "1724832000000",
      },
      {
        user_id: "3",
        contract_type: "fixed_term",
        created_at: "1724832000000",
      },
      {
        user_id: "3",
        contract_type: "occasional",
        created_at: "1724832000000",
      },
    ] as ImamContract[],
    diplomas: [
      {
        diploma_name: "Licence Théologie",
        organization_name: "Université Al Azhar",
        city: "Le Caire",
        country: "Égypte",
        year_obtained: 2015,
        description: "Formation complète en sciences islamiques.",
      },
    ] as ImamDiploma[],
    workingHours: [
      {
        working_hour: "full_time",
        created_at: "1724832000000",
        user_id: "3",
      },
      {
        working_hour: "part_time",
        created_at: "1724832000000",
        user_id: "3",
      },
    ] as ImamWorkingHour[],
    experiences: [
      {
        user_id: "3",
        title: "Imam principal",
        city: "Paris",
        country: "France",
        latitude: 48.8566,
        longitude: 2.3522,
        start_date: "2016",
        end_date: "2024",
        created_at: "1724832000000",
      },
    ] as ImamExperience[],
    skills: [
      {
        skill: "five_prayers",
        created_at: "1724832000000",
        user_id: "3",
      },
      {
        skill: "jumuah",
        created_at: "1724832000000",
        user_id: "3",
      },
      {
        skill: "tarawih",
        created_at: "1724832000000",
        user_id: "3",
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
        created_at: "1724832000000",
        user_id: "3",
      },
    ],
    quranReadings: [
      {
        riwaya: "al_duri",
        hizb_hifz: "zero_ten",
        tajweed_mastery: false,
        ijazah: false,
        created_at: "1724832000000",
        imam_id: "3",
      },
    ] as ImamQuranReading[],
    languages: [
      {
        language: "arabic",
        level: "fluent",
        created_at: "1724832000000",
        imam_id: "3",
      },
    ] as ImamLanguage[],
    likes: [
      {
        job_offer_id: mockJobOffers[0].jobOffer.id,
        created_at: "1724832000000",
        imam_id: "3",
      },
    ] as ImamLike[],
  },
];
