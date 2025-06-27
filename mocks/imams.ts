import { mockJobOffers } from "./job-offers";

import { ImamProfile } from "@/types/DatabaseTypes/ImamProfile";
import { User } from "@/types/DatabaseTypes/User";
import { UserRole, UserStatus } from "@/types/DatabaseTypes";

export const mockImams: ImamProfile[] = [
  {
    user: {
      id: 1,
      email: "ahmed.bensalah@email.com",
      first_name: "Ahmed",
      last_name: "Ben Salah",
      role: UserRole.IMAM,
      status: UserStatus.ACTIVE,
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
      created_at: 0,
      updated_at: 0,
    } as User,
    bio: "Imam passionné avec 10 ans d'expérience. Spécialisé dans l'enseignement du Coran et la conduite des prières.",
    contract_type: [
      {
        contract_type: "permanent",
        created_at: 0,
      },
    ],
    diploma: [
      {
        diplomaName: "Licence Théologie",
        organizationName: "Université Al Azhar",
        city: "Le Caire",
        country: "Égypte",
        yearObtained: 2015,
        description: "Formation complète en sciences islamiques.",
      },
    ],
    working_hours: [
      {
        working_hour: "full_time",
        created_at: 0,
        updated_at: 0,
      },
    ],
    experience: [
      {
        title: "Imam principal",
        city: "Paris",
        country: "France",
        latitude: 48.8566,
        longitude: 2.3522,
        startDate: "2016",
        endDate: "2024",
      },
    ],
    skills: [
      "five_prayers",
      "jumuah",
      "tarawih",
      "quran_classes",
    ],
    zones: [
      {
        address: "123 Rue de la Mosquée",
        city: "Paris",
        zipCode: "75001",
        country: "France",
        latitude: 48.8566,
        longitude: 2.3522,
      },
    ],
    quran_readings: [
      {
        riwaya: "al_duri",
        hizb_hifz: "zero_ten",
        tajweed_mastery: false,
        ijazah: false,
        created_at: 0,
      },
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
      role: UserRole.IMAM,
      status: UserStatus.ACTIVE,
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
      created_at: 0,
      updated_at: 0,
    } as User,
    bio: "Imam dynamique, expert en conférences et dialogue interreligieux.",
    contract_type: [
      {
        contract_type: "fixed_term",
        created_at: 0,
      },
    ],
    diploma: [
      {
        diplomaName: "Master Sciences Religieuses",
        organizationName: "Université de Lyon",
        city: "Lyon",
        country: "France",
        yearObtained: 2018,
        description: "Expertise en dialogue interreligieux et conférences.",
      },
    ],
    working_hours: [
      {
        working_hour: "part_time",
        created_at: 0,
        updated_at: 0,
      },
    ],
    experience: [
      {
        title: "Imam remplaçant",
        city: "Lyon",
        country: "France",
        latitude: 45.75,
        longitude: 4.85,
        startDate: "2019",
        endDate: "2024",
      },
    ],
    skills: [
      "five_prayers",
      "aid_prayer",
      "conferences",
    ],
    zones: [
      {
        address: "45 Avenue des Fleurs",
        city: "Lyon",
        zipCode: "69000",
        country: "France",
        latitude: 45.75,
        longitude: 4.85,
      },
    ],
    quran_readings: [
      {
        riwaya: "warsh",
        hizb_hifz: "twenty_thirty",
        tajweed_mastery: true,
        ijazah: false,
        created_at: 0,
      },
    ],
    created_at: 0,
    updated_at: 0,
    languages: [
      {
        language: "french",
        level: "advanced",
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
      email: "karim.benali@email.com",
      first_name: "Karim",
      last_name: "Ben Ali",
      role: UserRole.IMAM,
      status: UserStatus.ACTIVE,
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
      created_at: 0,
      updated_at: 0,
    } as User,
    bio: "Imam expérimenté, pédagogue et proche des jeunes.",
    contract_type: [
      {
        contract_type: "occasional",
        created_at: 0,
      },
    ],
    diploma: [
      {
        diplomaName: "Licence Arabe",
        organizationName: "Université Aix-Marseille",
        city: "Marseille",
        country: "France",
        yearObtained: 2017,
        description: "Formation en langue arabe et culture islamique.",
      },
    ],
    working_hours: [
      {
        working_hour: "part_time",
        created_at: 0,
        updated_at: 0,
      },
    ],
    experience: [
      {
        title: "Imam de quartier",
        city: "Marseille",
        country: "France",
        latitude: 43.2965,
        longitude: 5.3698,
        startDate: "2018",
        endDate: "2024",
      },
    ],
    skills: [
      "five_prayers",
      "aid_prayer",
      "quran_classes",
    ],
    zones: [
      {
        address: "78 Boulevard Central",
        city: "Marseille",
        zipCode: "13000",
        country: "France",
        latitude: 43.2965,
        longitude: 5.3698,
      },
    ],
    quran_readings: [
      {
        riwaya: "qalun",
        hizb_hifz: "ten_twenty",
        tajweed_mastery: false,
        ijazah: false,
        created_at: 0,
      },
    ],
    created_at: 0,
    updated_at: 0,
    languages: [
      {
        language: "arabic",
        level: "intermediate",
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
