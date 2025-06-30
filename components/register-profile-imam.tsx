"use client";

import { useEffect, useRef, useState } from "react";
import { Alert } from "@heroui/alert";
import { Input, Textarea } from "@heroui/input";
import { Button } from "@heroui/button";
import { Form } from "@heroui/form";
import { useRouter } from "next/navigation";
import { FaCamera, FaSpinner } from "react-icons/fa6";
import { Link } from "@heroui/link";
import { addToast } from "@heroui/toast";
import Image from "next/image";
import clsx from "clsx";
import { Select, SelectItem } from "@heroui/select";
import { Checkbox } from "@heroui/checkbox";
import { Calendar } from "@heroui/calendar";
import { parseDate } from "@internationalized/date";
import { isValidPhoneNumber } from "libphonenumber-js";

import Section from "@/components/section";
import HalfPageBg from "@/components/half-page-bg";
import {
  WorkingHourEnum,
  ContractTypeEnum,
  ImamSkillEnum,
  HizbHifzEnum,
  RiwayaEnum,
  LanguageEnum,
  LanguageLevelEnum,
} from "@/types/Database/Enums";
import { RegisterProfileImamFormData } from "@/types/Form/RegisterProfileImamFormData";
import { fetchWrapper } from "@/lib/Fetcher";
import getResponseCodeMessage from "@/utils/ResponseCodesMessages";
import { Media } from "@/types/Database/Entities/Media";
import { QuranReading } from "@/types/Database/Entities/QuranReading";
import { ImamExperience } from "@/types/Database/Entities/ImamExperience";
import { ImamDiploma } from "@/types/Database/Entities/ImamDiploma";
import { LocalStorageKeys } from "@/types/LocalStorageKeys";
import { ImamZone } from "@/types/Database";
import { ImamLanguage } from "@/types/Database/Entities/ImamLanguage";

const STEPS = {
  YOUR_PROFILE: 1,
  DESIRED_JOB_OFFER: 2,
  MY_SKILLS: 3,
  MY_EXPERIENCES: 4,
  MY_DIPLOMAS: 5,
  FINISHED: 6,
};

const STEP_TITLES = [
  "Votre profil",
  "Mission recherchée",
  "Mes compétences",
  "Mes expériences",
  "Mes diplômes",
  "Terminé",
];

const VALID_PHOTO_EXTENSIONS = [".jpg", ".jpeg", ".png"];

const BIO_MIN_LENGTH = 20;
const BIO_MAX_LENGTH = 500;
const ZONES_MAX_LENGTH = 3;
const QURAN_READINGS_MAX_LENGTH = 3;
const EXPERIENCES_MAX_LENGTH = 3;
const DIPLOMAS_MAX_LENGTH = 3;

const IMAM_SKILLS = [
  { value: ImamSkillEnum.FIVE_PRAYERS, label: "5 prières" },
  { value: ImamSkillEnum.JUMUAH, label: "Jumu'ah" },
  { value: ImamSkillEnum.AID_PRAYER, label: "Salat 'eid" },
  { value: ImamSkillEnum.TARAWIH, label: "Tarawih" },
  { value: ImamSkillEnum.QURAN_CLASSES, label: "Cours de Coran" },
  { value: ImamSkillEnum.CONFERENCES, label: "Conférences" },
  { value: ImamSkillEnum.QUESTIONS_ANSWERS, label: "Questions/Réponses" },
];
const RIWAYA_OPTIONS = [
  { value: RiwayaEnum.HAFS, label: "Hafs" },
  { value: RiwayaEnum.WARSH, label: "Warsh" },
  { value: RiwayaEnum.QALUN, label: "Qalun" },
  { value: RiwayaEnum.AL_DURI, label: "Al Duri" },
  { value: RiwayaEnum.AL_SUSI, label: "Al Susi" },
  { value: RiwayaEnum.SHUBAH, label: "Shubah" },
  { value: RiwayaEnum.KHALAF, label: "Khalaf" },
];
const HIZB_HIFZ_OPTIONS = [
  { value: HizbHifzEnum.ZERO_TEN, label: "0-10 Hizb" },
  { value: HizbHifzEnum.TEN_TWENTY, label: "10-20 Hizb" },
  { value: HizbHifzEnum.TWENTY_THIRTY, label: "20-30 Hizb" },
  { value: HizbHifzEnum.THIRTY_FORTY, label: "30-40 Hizb" },
  { value: HizbHifzEnum.FORTY_FIFTY, label: "40-50 Hizb" },
  { value: HizbHifzEnum.FIFTY_SIXTY, label: "50-60 Hizb" },
  { value: HizbHifzEnum.HAFIZ, label: "Hafiz (entier)" },
];

const LANGUAGE_OPTIONS = [
  { value: LanguageEnum.ARABIC, label: "Arabe" },
  { value: LanguageEnum.FRENCH, label: "Français" },
];

const LANGUAGE_LEVEL_OPTIONS = [
  { value: LanguageLevelEnum.BEGINNER, label: "Débutant" },
  { value: LanguageLevelEnum.INTERMEDIATE, label: "Intermédiaire" },
  { value: LanguageLevelEnum.ADVANCED, label: "Avancé" },
  { value: LanguageLevelEnum.FLUENT, label: "Courant" },
];

export default function RegisterProfileImam() {
  const router = useRouter();
  const [step, setStep] = useState(STEPS.YOUR_PROFILE);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<RegisterProfileImamFormData>({
    firstName: "",
    lastName: "",
    phone: "",
    bio: "",
    photo: null,
    workingHours: [] as WorkingHourEnum[],
    contractTypes: [] as ContractTypeEnum[],
    zones: [] as ImamZone[],
    skills: [] as ImamSkillEnum[],
    languages: [] as ImamLanguage[],
    quranReadings: [] as QuranReading[],
    experiences: [] as ImamExperience[],
    currentExperienceIndex: null,
    diplomas: [] as ImamDiploma[],
  } as RegisterProfileImamFormData);

  const photoRef = useRef<HTMLInputElement>(null);

  const resetPhotoRefValue = () => {
    if (photoRef.current) {
      photoRef.current.value = "";
    }
  };

  const validateStep = (currentStep: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (currentStep === STEPS.YOUR_PROFILE) {
      if (!isValidPhoneNumber(formData.phone, "FR")) {
        newErrors.phone =
          "Numéro de téléphone invalide. (Exemple: +33 6 07 08 09 10 ou 06 07 08 09 10)";
      }
    }

    if (currentStep === STEPS.DESIRED_JOB_OFFER) {
      if (formData.workingHours.length === 0) {
        addToast({
          title: "Le temps de travail est requis.",
          description: "Veuillez sélectionner un temps de travail.",
          color: "danger",
          timeout: 3000,
          shouldShowTimeoutProgress: true,
        });

        return false;
      }

      if (formData.contractTypes.length === 0) {
        addToast({
          title: "Les types de contrat sont requis.",
          description: "Veuillez sélectionner au moins un type de contrat.",
          color: "danger",
          timeout: 3000,
          shouldShowTimeoutProgress: true,
        });

        return false;
      }

      if (formData.zones.length === 0) {
        addToast({
          title: "Les zones géographiques sont requises.",
          description: "Veuillez sélectionner au moins une zone géographique.",
          color: "danger",
          timeout: 3000,
          shouldShowTimeoutProgress: true,
        });

        return false;
      }

      const zonesSet = new Set(
        formData.zones.map((zone) => `${zone.city}-${zone.zip_code}`),
      );

      if (zonesSet.size !== formData.zones.length) {
        addToast({
          title: "Zones en double.",
          description:
            "Vous avez ajouté la même zone géographique plusieurs fois.",
          color: "danger",
          timeout: 3000,
          shouldShowTimeoutProgress: true,
        });

        return false;
      }
    }

    if (currentStep === STEPS.MY_SKILLS) {
      if (formData.skills.length === 0) {
        addToast({
          title: "Les compétences sont requises.",
          description: "Veuillez sélectionner au moins une compétence.",
          color: "danger",
          timeout: 3000,
          shouldShowTimeoutProgress: true,
        });

        return false;
      }

      if (formData.languages.length === 0) {
        addToast({
          title: "Les langues sont requises.",
          description: "Veuillez sélectionner au moins une langue.",
          color: "danger",
          timeout: 3000,
          shouldShowTimeoutProgress: true,
        });

        return false;
      }

      const languagesSet = new Set(
        formData.languages.map((lang) => lang.language),
      );

      if (languagesSet.size !== formData.languages.length) {
        addToast({
          title: "Langues en double.",
          description: "Vous avez ajouté la même langue plusieurs fois.",
          color: "danger",
          timeout: 3000,
          shouldShowTimeoutProgress: true,
        });

        return false;
      }

      if (formData.quranReadings.length === 0) {
        addToast({
          title: "Les lectures coraniques sont requises.",
          description: "Veuillez sélectionner au moins une lecture coranique.",
          color: "danger",
          timeout: 3000,
          shouldShowTimeoutProgress: true,
        });

        return false;
      }

      const quranReadingsSet = new Set(
        formData.quranReadings.map((reading) => reading.riwaya),
      );

      if (quranReadingsSet.size !== formData.quranReadings.length) {
        addToast({
          title: "Lectures coraniques en double.",
          description: "Vous avez ajouté la même récitation plusieurs fois.",
          color: "danger",
          timeout: 3000,
          shouldShowTimeoutProgress: true,
        });

        return false;
      }
    }

    if (currentStep === STEPS.MY_EXPERIENCES) {
      if (formData.experiences.length === 0) {
        addToast({
          title: "Les expériences sont requises.",
          description: "Veuillez sélectionner au moins une expérience.",
          color: "danger",
          timeout: 3000,
          shouldShowTimeoutProgress: true,
        });

        return false;
      }

      const experiencesSet = new Set(
        formData.experiences.map(
          (exp) =>
            `${exp.title}-${exp.start_date}-${exp.end_date || "current"}`,
        ),
      );

      if (experiencesSet.size !== formData.experiences.length) {
        addToast({
          title: "Expériences en double.",
          description: "Vous avez ajouté la même expérience plusieurs fois.",
          color: "danger",
          timeout: 3000,
          shouldShowTimeoutProgress: true,
        });

        return false;
      }

      const now = new Date();

      for (let i = 0; i < formData.experiences.length; i++) {
        const exp = formData.experiences[i];
        const isCurrentExperience = formData.currentExperienceIndex === i;

        if (!exp.title || exp.title.trim() === "") {
          addToast({
            title: "Titre d'expérience requis",
            description: `Veuillez renseigner le titre de l'expérience n°${i + 1}.`,
            color: "danger",
            timeout: 3000,
            shouldShowTimeoutProgress: true,
          });

          return false;
        }

        if (!exp.city || exp.city.trim() === "") {
          addToast({
            title: "Ville d'expérience requise",
            description: `Veuillez renseigner la ville de l'expérience n°${i + 1}.`,
            color: "danger",
            timeout: 3000,
            shouldShowTimeoutProgress: true,
          });

          return false;
        }

        if (!exp.country || exp.country.trim() === "") {
          addToast({
            title: "Pays d'expérience requis",
            description: `Veuillez renseigner le pays de l'expérience n°${i + 1}.`,
            color: "danger",
            timeout: 3000,
            shouldShowTimeoutProgress: true,
          });

          return false;
        }

        if (!exp.start_date) {
          addToast({
            title: "Date de début requise",
            description: `Veuillez renseigner la date de début de l'expérience n°${i + 1}.`,
            color: "danger",
            timeout: 3000,
            shouldShowTimeoutProgress: true,
          });

          return false;
        }

        if (!isCurrentExperience && !exp.end_date) {
          addToast({
            title: "Date de fin requise",
            description: `Veuillez renseigner la date de fin de l'expérience n°${i + 1} ou cocher 'Expérience actuelle'.`,
            color: "danger",
            timeout: 6000,
            shouldShowTimeoutProgress: true,
          });

          return false;
        }

        if (
          new Date(exp.start_date) > now ||
          (!isCurrentExperience && exp.end_date && new Date(exp.end_date) > now)
        ) {
          addToast({
            title: "Date dans le futur",
            description: `Les dates de l'expérience n°${i + 1} ne peuvent pas être dans le futur.`,
            color: "danger",
            timeout: 3000,
            shouldShowTimeoutProgress: true,
          });

          return false;
        }

        if (
          !isCurrentExperience &&
          exp.end_date &&
          new Date(exp.end_date).getFullYear() < 1900
        ) {
          addToast({
            title: "Date de fin invalide",
            description: `La date de fin de l'expérience n°${i + 1} doit être après 1900.`,
            color: "danger",
            timeout: 3000,
            shouldShowTimeoutProgress: true,
          });

          return false;
        }

        if (
          !isCurrentExperience &&
          exp.start_date &&
          exp.end_date &&
          new Date(exp.start_date) > new Date(exp.end_date)
        ) {
          addToast({
            title: "Dates incohérentes",
            description: `La date de début de l'expérience n°${i + 1} doit être avant la date de fin.`,
            color: "danger",
            timeout: 3000,
            shouldShowTimeoutProgress: true,
          });

          return false;
        }

        if (
          !isCurrentExperience &&
          exp.start_date &&
          exp.end_date &&
          exp.start_date === exp.end_date
        ) {
          addToast({
            title: "Dates identiques",
            description: `Les dates de début et de fin de l'expérience n°${i + 1} doivent être différentes.`,
            color: "danger",
            timeout: 3000,
            shouldShowTimeoutProgress: true,
          });

          return false;
        }
      }
    }

    if (currentStep === STEPS.MY_DIPLOMAS) {
      if (formData.diplomas.length === 0) {
        addToast({
          title: "Les diplômes sont requis.",
          description: "Veuillez sélectionner au moins un diplôme.",
          color: "danger",
          timeout: 3000,
          shouldShowTimeoutProgress: true,
        });

        return false;
      }

      const diplomasSet = new Set(
        formData.diplomas.map(
          (diploma) => `${diploma.diploma_name}-${diploma.organization_name}`,
        ),
      );

      if (diplomasSet.size !== formData.diplomas.length) {
        addToast({
          title: "Diplômes en double.",
          description:
            "Vous avez ajouté le même diplôme du même établissement plusieurs fois.",
          color: "danger",
          timeout: 3000,
          shouldShowTimeoutProgress: true,
        });

        return false;
      }
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    try {
      const saved = localStorage.getItem(LocalStorageKeys.PROFILE_IMAM);

      if (saved) {
        const parsed = JSON.parse(saved);

        parsed.photo = null;

        setFormData((prev) => ({ ...prev, ...parsed }));
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!isLoading) {
      const formDataCopy = structuredClone(formData);

      formDataCopy.photo = null;

      localStorage.setItem(
        LocalStorageKeys.PROFILE_IMAM,
        JSON.stringify(formDataCopy),
      );
    }
  }, [formData, isLoading]);

  const clearProfileStorage = () => {
    localStorage.removeItem(LocalStorageKeys.PROFILE_IMAM);
  };

  const handleSubmitProfile = async () => {
    if (!validateStep(step)) {
      return;
    }

    setIsSubmitting(true);

    if (formData.currentExperienceIndex !== null) {
      formData.experiences[formData.currentExperienceIndex].end_date = null;
    }

    const response = await fetchWrapper(
      "/register/profile/imam",
      "POST",
      formData,
    );

    if (response?.ok) {
      const responseData = await response?.json();
      const code = responseData?.code;
      const data = responseData?.data;

      const userData = localStorage.getItem(LocalStorageKeys.USER_DATA);

      if (userData) {
        const userDataParsed = JSON.parse(userData);

        localStorage.setItem(
          LocalStorageKeys.USER_DATA,
          JSON.stringify({ ...userDataParsed, ...data }),
        );
      } else {
        localStorage.setItem(LocalStorageKeys.USER_DATA, JSON.stringify(data));
      }

      clearProfileStorage();

      addToast({
        title: "Profil enregistré avec succès.",
        description: getResponseCodeMessage(code),
        color: "success",
        timeout: 3000,
        shouldShowTimeoutProgress: true,
      });

      setStep(STEPS.FINISHED);
    } else {
      const responseData = await response?.json();
      const code = responseData?.code;

      addToast({
        title: "Erreur lors de l'enregistrement du profil.",
        description: getResponseCodeMessage(code),
        color: "danger",
        timeout: 3000,
        shouldShowTimeoutProgress: true,
      });
    }

    setIsSubmitting(false);
  };

  const handleNext = () => {
    if (!validateStep(step)) {
      return;
    }

    if (step === STEPS.YOUR_PROFILE) {
      setStep(STEPS.DESIRED_JOB_OFFER);
    } else if (step === STEPS.DESIRED_JOB_OFFER) {
      setStep(STEPS.MY_SKILLS);
    } else if (step === STEPS.MY_SKILLS) {
      setStep(STEPS.MY_EXPERIENCES);
    } else if (step === STEPS.MY_EXPERIENCES) {
      setStep(STEPS.MY_DIPLOMAS);
    } else if (step === STEPS.MY_DIPLOMAS) {
      handleSubmitProfile();
    }
  };

  const handlePrev = () => {
    if (step === STEPS.YOUR_PROFILE) {
      router.push("/role-selection");
    } else {
      setStep(step - 1);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handlePhotoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) {
      setFormData((prev) => ({ ...prev, photo: null }));

      resetPhotoRefValue();

      return;
    }

    const fileName = file.name;
    const fileExtension = fileName.split(".").pop()?.toLowerCase() || "";
    const fileSize = file.size;
    const fileContent = Buffer.from(await file.arrayBuffer()).toString(
      "base64",
    );

    if (fileSize > 10 * 1024 * 1024) {
      addToast({
        title: "Fichier trop volumineux.",
        description: "Le fichier ne doit pas dépasser 10MB.",
        color: "danger",
        timeout: 3000,
        shouldShowTimeoutProgress: true,
      });

      setFormData((prev) => ({ ...prev, photo: null }));

      resetPhotoRefValue();

      return;
    } else if (!VALID_PHOTO_EXTENSIONS.includes(`.${fileExtension}`)) {
      addToast({
        title: "Format de fichier non supporté.",
        description: `Le fichier doit être au format ${VALID_PHOTO_EXTENSIONS.join(
          ", ",
        )}.`,
        color: "danger",
        timeout: 6000,
        shouldShowTimeoutProgress: true,
      });

      resetPhotoRefValue();

      setFormData((prev) => ({ ...prev, photo: null }));

      return;
    }

    const photo: Media = {
      id: "",
      name: fileName,
      extension: fileExtension,
      size: fileSize,
      content: fileContent,
      created_at: "",
    };

    setFormData((prev) => ({
      ...prev,
      photo: photo,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleNext();
  };

  const handleWorkingHourToggle = (value: WorkingHourEnum) => {
    setFormData((prev) => ({
      ...prev,
      workingHours: prev.workingHours.includes(value)
        ? prev.workingHours.filter((v) => v !== value)
        : [...prev.workingHours, value],
    }));
  };

  const handleContractTypeToggle = (value: ContractTypeEnum) => {
    setFormData((prev) => ({
      ...prev,
      contractTypes: prev.contractTypes.includes(value)
        ? prev.contractTypes.filter((v) => v !== value)
        : [...prev.contractTypes, value],
    }));
  };

  const handleZoneChange = (
    idx: number,
    field: keyof ImamZone,
    value: string | number | null,
  ) => {
    setFormData((prev) => {
      const zones = [...prev.zones];

      zones[idx] = { ...zones[idx], [field]: value };

      return { ...prev, zones };
    });
  };

  const handleAddZone = () => {
    if (formData.zones.length >= ZONES_MAX_LENGTH) {
      addToast({
        title: "Limite atteinte.",
        description: `Vous ne pouvez pas ajouter plus de ${ZONES_MAX_LENGTH} zones.`,
        color: "danger",
        timeout: 3000,
        shouldShowTimeoutProgress: true,
      });

      return;
    }

    setFormData((prev) => ({
      ...prev,
      zones: [
        ...prev.zones,
        {
          user_id: "",
          address: "",
          city: "",
          zip_code: "",
          country: "France",
          latitude: null,
          longitude: null,
          created_at: "",
        } as ImamZone,
      ],
    }));
  };

  const handleRemoveZone = (idx: number) => {
    setFormData((prev) => {
      const zones = [...prev.zones];

      zones.splice(idx, 1);

      return { ...prev, zones };
    });
  };

  const handleSkillToggle = (value: ImamSkillEnum) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.includes(value)
        ? prev.skills.filter((v) => v !== value)
        : [...prev.skills, value],
    }));
  };

  const handleLanguageChange = (
    idx: number,
    field: keyof ImamLanguage,
    value: any,
  ) => {
    setFormData((prev) => {
      const languages = [...prev.languages];

      languages[idx] = { ...languages[idx], [field]: value };

      return { ...prev, languages };
    });
  };

  const handleAddLanguage = () => {
    if (formData.languages.length >= 2) {
      addToast({
        title: "Limite atteinte.",
        description: "Vous ne pouvez pas ajouter plus de 2 langues.",
        color: "danger",
        timeout: 3000,
        shouldShowTimeoutProgress: true,
      });

      return;
    }

    setFormData((prev) => ({
      ...prev,
      languages: [
        ...prev.languages,
        {
          imam_id: "",
          language: LanguageEnum.ARABIC,
          level: LanguageLevelEnum.BEGINNER,
          created_at: "",
        } as ImamLanguage,
      ],
    }));
  };

  const handleRemoveLanguage = (idx: number) => {
    setFormData((prev) => {
      const languages = [...prev.languages];

      languages.splice(idx, 1);

      return { ...prev, languages };
    });
  };

  const handleQuranReadingChange = (
    idx: number,
    field: keyof QuranReading,
    value: any,
  ) => {
    setFormData((prev) => {
      const quranReadings = [...prev.quranReadings];

      quranReadings[idx] = { ...quranReadings[idx], [field]: value };

      return { ...prev, quranReadings };
    });
  };

  const handleAddQuranReading = () => {
    if (formData.quranReadings.length >= QURAN_READINGS_MAX_LENGTH) {
      addToast({
        title: "Limite atteinte.",
        description: `Vous ne pouvez pas ajouter plus de ${QURAN_READINGS_MAX_LENGTH} lectures coraniques.`,
        color: "danger",
        timeout: 3000,
        shouldShowTimeoutProgress: true,
      });

      return;
    }

    setFormData((prev) => ({
      ...prev,
      quranReadings: [
        ...prev.quranReadings,
        {
          imam_id: "",
          riwaya: RiwayaEnum.HAFS,
          hizb_hifz: HizbHifzEnum.ZERO_TEN,
          tajweed_mastery: false,
          ijazah: false,
          created_at: "",
        } as QuranReading,
      ],
    }));
  };

  const handleRemoveQuranReading = (idx: number) => {
    setFormData((prev) => {
      const quranReadings = [...prev.quranReadings];

      quranReadings.splice(idx, 1);

      return { ...prev, quranReadings };
    });
  };

  const handleExperienceChange = (
    idx: number,
    field: keyof ImamExperience,
    value: any,
  ) => {
    const newExperiences = [...formData.experiences];

    newExperiences[idx] = { ...newExperiences[idx], [field]: value };
    setFormData((prev) => ({ ...prev, experiences: newExperiences }));
  };

  const handleAddExperience = () => {
    if (formData.experiences.length >= EXPERIENCES_MAX_LENGTH) {
      addToast({
        title: "Limite atteinte.",
        description: `Vous ne pouvez pas ajouter plus de ${EXPERIENCES_MAX_LENGTH} expériences.`,
        color: "danger",
        timeout: 3000,
        shouldShowTimeoutProgress: true,
      });

      return;
    }

    setFormData((prev) => ({
      ...prev,
      experiences: [
        ...prev.experiences,
        {
          user_id: "",
          title: "",
          city: "",
          zipCode: "",
          country: "",
          latitude: null,
          longitude: null,
          start_date: "1980-01-01",
          end_date: "1980-01-01",
          created_at: "",
        } as ImamExperience,
      ],
    }));
  };

  const handleRemoveExperience = (idx: number) => {
    setFormData((prev) => {
      const experiences = [...prev.experiences];

      experiences.splice(idx, 1);

      return { ...prev, experiences };
    });
  };

  const handleDiplomaChange = (
    idx: number,
    field: keyof ImamDiploma,
    value: any,
  ) => {
    setFormData((prev) => {
      const diplomas = [...prev.diplomas];

      diplomas[idx] = { ...diplomas[idx], [field]: value };

      return { ...prev, diplomas };
    });
  };

  const handleAddDiploma = () => {
    if (formData.diplomas.length >= DIPLOMAS_MAX_LENGTH) {
      addToast({
        title: "Limite atteinte.",
        description: `Vous ne pouvez pas ajouter plus de ${DIPLOMAS_MAX_LENGTH} diplômes.`,
        color: "danger",
        timeout: 3000,
        shouldShowTimeoutProgress: true,
      });

      return;
    }

    setFormData((prev) => ({
      ...prev,
      diplomas: [
        ...prev.diplomas,
        {
          user_id: "",
          diploma_name: "",
          organization_name: "",
          city: "",
          country: "",
          year_obtained: new Date().getFullYear(),
          description: "",
        } as ImamDiploma,
      ],
    }));
  };

  const handleRemoveDiploma = (idx: number) => {
    setFormData((prev) => {
      const diplomas = [...prev.diplomas];

      diplomas.splice(idx, 1);

      return { ...prev, diplomas };
    });
  };

  const handleCurrentExperienceChange = (value: boolean, idx: number) => {
    setFormData((prev) => ({
      ...prev,
      currentExperienceIndex: value ? idx : null,
    }));
  };

  const handlePhotoClick = () => {
    photoRef.current?.click();
  };

  if (isLoading) {
    return (
      <Section className="min-h-screen flex w-full gap-12">
        <div className="flex flex-col items-center justify-center h-full xl:w-1/2 w-full">
          <div className="text-primary text-lg flex items-center gap-2">
            Chargement... <FaSpinner className="animate-spin text-primary" />
          </div>
        </div>
        <div className="xl:w-1/2 hidden xl:block">
          <HalfPageBg />
        </div>
      </Section>
    );
  }

  return (
    <Section className="min-h-screen flex w-full gap-12">
      <div className="flex flex-col items-center h-full xl:w-1/2 w-full">
        <div className="flex flex-col gap-4 mb-8 w-full max-w-xl">
          <div className="flex flex-col gap-2 w-full">
            <div className="flex justify-around">
              {STEP_TITLES.map((title, idx) => (
                <div
                  key={title}
                  className={`flex flex-col items-center ${
                    idx + 1 === step ? "text-primary" : "text-gray-400"
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                      idx + 1 === step
                        ? "bg-primary text-white"
                        : "bg-gray-200 text-gray-500"
                    }`}
                  >
                    {idx + 1}
                  </div>
                  <span className="text-xs mt-1 text-center max-w-20">
                    {title}
                  </span>
                </div>
              ))}
            </div>
            <div className="w-full bg-gray-200 h-1 rounded-full mt-2">
              <div
                className="bg-primary h-1 rounded-full transition-all duration-300"
                style={{ width: `${(step / STEP_TITLES.length) * 100}%` }}
              />
            </div>
          </div>
        </div>

        <h1 className="text-2xl md:text-3xl lg:text-4xl text-primary font-dmSerifText mb-8 w-full max-w-xl text-center">
          {STEP_TITLES[step - 1]}
        </h1>

        {step === STEPS.YOUR_PROFILE && (
          <Form
            className="w-full max-w-xl bg-secondary p-0 flex flex-col gap-6"
            onSubmit={handleSubmit}
          >
            <Alert
              hideIconWrapper
              className="flex justify-center items-center"
              color="primary"
              description={
                <span className="text-sm">
                  Ces données sont{" "}
                  <Link
                    className="underline text-sm text-inherit"
                    href="/privacy-policy"
                    title="Voir notre politique de confidentialité"
                  >
                    confidentielles et seront conservées en interne.
                  </Link>
                </span>
              }
              variant="flat"
            />
            <div className="flex flex-col gap-2 w-full items-center">
              {formData.photo ? (
                <Image
                  alt="Photo de profil"
                  className="w-20 h-20 rounded-full object-cover cursor-pointer"
                  height={80}
                  src={`data:image/${formData.photo.extension};base64,${formData.photo.content}`}
                  width={80}
                  onClick={handlePhotoClick}
                />
              ) : (
                <button
                  className="w-20 h-20 rounded-full cursor-pointer flex items-center justify-center bg-primary"
                  type="button"
                  onClick={handlePhotoClick}
                >
                  <FaCamera className="text-white text-3xl" />
                </button>
              )}
              <label
                className="text-xs font-bold text-primary uppercase text-center"
                htmlFor="photo"
              >
                Photo de profil
              </label>
              <Input
                ref={photoRef}
                accept={".jpg,.jpeg,.png"}
                className="hidden"
                id="photo"
                name="photo"
                type="file"
                onChange={handlePhotoChange}
              />
            </div>
            <div className="flex flex-col md:flex-row gap-4 w-full">
              <div className="flex-1 flex flex-col gap-2">
                <label
                  className="text-xs font-bold text-primary uppercase"
                  htmlFor="firstName"
                >
                  Prénom *
                </label>
                <Input
                  isRequired
                  id="firstName"
                  name="firstName"
                  placeholder="Prénom"
                  value={formData.firstName}
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex-1 flex flex-col gap-2">
                <label
                  className="text-xs font-bold text-primary uppercase"
                  htmlFor="lastName"
                >
                  Nom *
                </label>
                <Input
                  isRequired
                  id="lastName"
                  name="lastName"
                  placeholder="Nom"
                  value={formData.lastName}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-4 w-full">
              <div className="flex-1 flex flex-col gap-2">
                <label
                  className="text-xs font-bold text-primary uppercase"
                  htmlFor="phone"
                >
                  Téléphone *
                </label>
                <Input
                  isRequired
                  errorMessage={errors?.phone || ""}
                  id="phone"
                  isInvalid={!!errors?.phone || false}
                  name="phone"
                  placeholder="06 07 08 09 10"
                  value={formData.phone}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="flex flex-col gap-2 w-full">
              <label
                className="text-xs font-bold text-primary uppercase"
                htmlFor="bio"
              >
                Bio *
              </label>
              <Textarea
                isRequired
                id="bio"
                maxLength={BIO_MAX_LENGTH}
                minLength={BIO_MIN_LENGTH}
                name="bio"
                placeholder="Présentez-vous en quelques lignes..."
                value={formData.bio}
                onChange={handleInputChange}
              />
              <div className="flex justify-end">
                <span
                  className={clsx(
                    "text-xs",
                    formData.bio.length >= BIO_MAX_LENGTH
                      ? "text-danger"
                      : "text-primary",
                  )}
                >
                  {formData.bio.length} / {BIO_MAX_LENGTH}
                </span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row justify-between gap-4 mt-8 w-full">
              <Button
                className="bg-gray-200 text-primary w-full sm:w-auto"
                isDisabled={isSubmitting}
                type="button"
                onPress={handlePrev}
              >
                Précédent
              </Button>
              <Button
                className="bg-primary text-secondary w-full sm:w-auto"
                type="submit"
              >
                Continuer
              </Button>
            </div>
          </Form>
        )}

        {step === STEPS.DESIRED_JOB_OFFER && (
          <Form
            className="w-full max-w-xl bg-secondary p-0 flex flex-col gap-6"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col gap-2 w-full">
              <label
                className="text-xs font-bold text-primary uppercase"
                htmlFor="working-hours-group"
              >
                Temps de travail recherché *
              </label>
              <div className="flex gap-4" id="working-hours-group">
                <Button
                  className={clsx(
                    "px-4 py-2 rounded border",
                    formData.workingHours.includes("full_time")
                      ? "bg-primary text-white border-primary"
                      : "bg-white text-primary border-gray-300",
                  )}
                  type="button"
                  onPress={() => handleWorkingHourToggle("full_time")}
                >
                  Temps plein
                </Button>
                <Button
                  className={clsx(
                    "px-4 py-2 rounded border",
                    formData.workingHours.includes("part_time")
                      ? "bg-primary text-white border-primary"
                      : "bg-white text-primary border-gray-300",
                  )}
                  type="button"
                  onPress={() => handleWorkingHourToggle("part_time")}
                >
                  Temps partiel
                </Button>
              </div>
            </div>
            <div className="flex flex-col gap-2 w-full">
              <label
                className="text-xs font-bold text-primary uppercase"
                htmlFor="contract-types-group"
              >
                Type de contrat recherché *
              </label>
              <div className="flex gap-4 flex-wrap" id="contract-types-group">
                <Button
                  className={clsx(
                    "px-4 py-2 rounded border",
                    formData.contractTypes.includes("permanent")
                      ? "bg-primary text-white border-primary"
                      : "bg-white text-primary border-gray-300",
                  )}
                  type="button"
                  onPress={() => handleContractTypeToggle("permanent")}
                >
                  CDI
                </Button>
                <Button
                  className={clsx(
                    "px-4 py-2 rounded border",
                    formData.contractTypes.includes("fixed_term")
                      ? "bg-primary text-white border-primary"
                      : "bg-white text-primary border-gray-300",
                  )}
                  type="button"
                  onPress={() => handleContractTypeToggle("fixed_term")}
                >
                  CDD
                </Button>
                <Button
                  className={clsx(
                    "px-4 py-2 rounded border",
                    formData.contractTypes.includes("occasional")
                      ? "bg-primary text-white border-primary"
                      : "bg-white text-primary border-gray-300",
                  )}
                  type="button"
                  onPress={() => handleContractTypeToggle("occasional")}
                >
                  Occasionnel
                </Button>
              </div>
            </div>
            <div className="flex flex-col gap-2 w-full">
              <label
                className="text-xs font-bold text-primary uppercase"
                htmlFor="zones-group"
              >
                Zones géographiques souhaitées *
              </label>
              <div id="zones-group">
                {formData.zones.length === 0 && (
                  <div className="text-xs text-gray-500 mb-2">
                    Aucune zone ajoutée.
                  </div>
                )}
                {formData.zones.map((zone, idx) => (
                  <div
                    key={idx}
                    className="flex flex-wrap md:flex-nowrap items-start gap-2 border border-gray-200 bg-gray-50 rounded-md py-2 px-2 mb-2 transition-shadow hover:shadow-sm w-full relative"
                  >
                    <div className="absolute -top-2 -left-2 w-5 h-5 bg-primary text-white text-xs font-bold rounded-full flex items-center justify-center shadow-sm">
                      {idx + 1}
                    </div>
                    <Input
                      isRequired
                      className="flex-1 min-w-[120px] text-sm"
                      id={`zone-city-${idx}`}
                      placeholder="Ville *"
                      value={zone.city}
                      onChange={(e) =>
                        handleZoneChange(idx, "city", e.target.value)
                      }
                    />
                    <Input
                      isRequired
                      className="flex-1 min-w-[120px] text-sm"
                      id={`zone-zip_code-${idx}`}
                      placeholder="Code postal *"
                      value={zone.zip_code}
                      onChange={(e) =>
                        handleZoneChange(idx, "zip_code", e.target.value)
                      }
                    />
                    <Button
                      className="bg-transparent text-danger px-2 py-1 ml-2 hover:bg-danger/10 rounded-md text-sm w-auto flex-shrink-0"
                      type="button"
                      onPress={() => handleRemoveZone(idx)}
                    >
                      Supprimer
                    </Button>
                  </div>
                ))}
                <Button
                  className="bg-primary text-white w-fit"
                  type="button"
                  onPress={handleAddZone}
                >
                  Ajouter une zone
                </Button>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row justify-between gap-4 mt-8 w-full">
              <Button
                className="bg-gray-200 text-primary w-full sm:w-auto"
                type="button"
                onPress={handlePrev}
              >
                Précédent
              </Button>
              <Button
                className="bg-primary text-secondary w-full sm:w-auto"
                type="submit"
              >
                Continuer
              </Button>
            </div>
          </Form>
        )}

        {step === STEPS.MY_SKILLS && (
          <Form
            className="w-full max-w-xl bg-secondary p-0 flex flex-col gap-6"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col gap-2 w-full">
              <label
                className="text-xs font-bold text-primary uppercase"
                htmlFor="skills-group"
              >
                Compétences *
              </label>
              <div className="flex flex-wrap gap-2" id="skills-group">
                {IMAM_SKILLS.map((skill) => (
                  <Button
                    key={skill.value}
                    className={clsx(
                      "px-3 py-2 rounded border transition-all text-sm",
                      formData.skills.includes(skill.value as ImamSkillEnum)
                        ? "bg-primary text-white border-primary"
                        : "bg-white text-primary border-gray-300",
                    )}
                    type="button"
                    onPress={() =>
                      handleSkillToggle(skill.value as ImamSkillEnum)
                    }
                  >
                    {skill.label}
                  </Button>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-2 w-full">
              <label
                className="text-xs font-bold text-primary uppercase"
                htmlFor="languages-group"
              >
                Langues *
              </label>
              <div id="languages-group">
                {formData.languages.length === 0 && (
                  <div className="text-xs text-gray-500 mb-2">
                    Aucune langue ajoutée.
                  </div>
                )}
                {formData.languages.map((language, idx) => (
                  <div
                    key={idx}
                    className="border border-gray-200 bg-gray-50 rounded-md py-2 px-2 mb-2 transition-shadow hover:shadow-sm w-full flex flex-col gap-2 relative"
                  >
                    <div className="absolute -top-2 -left-2 w-5 h-5 bg-primary text-white text-xs font-bold rounded-full flex items-center justify-center shadow-sm">
                      {idx + 1}
                    </div>
                    <div className="flex flex-wrap md:flex-nowrap items-start gap-2 w-full">
                      <Select
                        isRequired
                        className="flex-1 min-w-[120px] w-full"
                        id={`language-language-${idx}`}
                        placeholder="Choisir une langue *"
                        selectedKeys={[formData.languages[idx].language || ""]}
                        value={formData.languages[idx].language || ""}
                        onChange={(e) =>
                          handleLanguageChange(idx, "language", e.target.value)
                        }
                      >
                        {LANGUAGE_OPTIONS.map((opt) => (
                          <SelectItem key={opt.value}>{opt.label}</SelectItem>
                        ))}
                      </Select>
                      <Select
                        isRequired
                        className="flex-1 min-w-[120px] w-full"
                        id={`language-level-${idx}`}
                        placeholder="Choisir un niveau *"
                        selectedKeys={[formData.languages[idx].level || ""]}
                        value={formData.languages[idx].level || ""}
                        onChange={(e) =>
                          handleLanguageChange(idx, "level", e.target.value)
                        }
                      >
                        {LANGUAGE_LEVEL_OPTIONS.map((opt) => (
                          <SelectItem key={opt.value}>{opt.label}</SelectItem>
                        ))}
                      </Select>
                    </div>
                    <Button
                      className="bg-transparent text-danger px-2 py-1 ml-2 hover:bg-danger/10 rounded-md text-sm w-auto flex-shrink-0 self-end"
                      type="button"
                      onPress={() => handleRemoveLanguage(idx)}
                    >
                      Supprimer
                    </Button>
                  </div>
                ))}
                <Button
                  className="bg-primary text-white w-fit"
                  type="button"
                  onPress={handleAddLanguage}
                >
                  Ajouter une langue
                </Button>
              </div>
            </div>
            <div className="flex flex-col gap-2 w-full">
              <label
                className="text-xs font-bold text-primary uppercase"
                htmlFor="quran-readings-group"
              >
                Lectures coraniques *
              </label>
              <div id="quran-readings-group">
                {formData.quranReadings.length === 0 && (
                  <div className="text-xs text-gray-500 mb-2">
                    Aucune lecture ajoutée.
                  </div>
                )}
                {formData.quranReadings.map((reading, idx) => (
                  <div
                    key={idx}
                    className="border border-gray-200 bg-gray-50 rounded-md py-2 px-2 mb-2 transition-shadow hover:shadow-sm w-full flex flex-col gap-2 relative"
                  >
                    <div className="absolute -top-2 -left-2 w-5 h-5 bg-primary text-white text-xs font-bold rounded-full flex items-center justify-center shadow-sm">
                      {idx + 1}
                    </div>
                    <div className="flex flex-wrap md:flex-nowrap items-start gap-2 w-full">
                      <Select
                        isRequired
                        className="flex-1 min-w-[120px] w-full"
                        id={`quranReading-riwaya-${idx}`}
                        placeholder="Choisir une récitation *"
                        selectedKeys={[
                          formData.quranReadings[idx].riwaya || "",
                        ]}
                        value={formData.quranReadings[idx].riwaya || ""}
                        onChange={(e) =>
                          handleQuranReadingChange(
                            idx,
                            "riwaya",
                            e.target.value,
                          )
                        }
                      >
                        {RIWAYA_OPTIONS.map((opt) => (
                          <SelectItem key={opt.value}>{opt.label}</SelectItem>
                        ))}
                      </Select>
                      <Select
                        isRequired
                        className="flex-1 min-w-[120px] w-full"
                        id={`quranReading-hizb_hifz-${idx}`}
                        placeholder="Choisir un niveau d'apprentissage *"
                        selectedKeys={[
                          formData.quranReadings[idx].hizb_hifz || "",
                        ]}
                        value={formData.quranReadings[idx].hizb_hifz || ""}
                        onChange={(e) =>
                          handleQuranReadingChange(
                            idx,
                            "hizb_hifz",
                            e.target.value,
                          )
                        }
                      >
                        {HIZB_HIFZ_OPTIONS.map((opt) => (
                          <SelectItem key={opt.value}>{opt.label}</SelectItem>
                        ))}
                      </Select>
                    </div>
                    <div className="flex flex-wrap gap-4 mt-2 w-full items-center">
                      <button
                        className="flex items-center gap-1 cursor-pointer"
                        type="button"
                        onClick={() =>
                          handleQuranReadingChange(
                            idx,
                            "tajweed_mastery",
                            !formData.quranReadings[idx].tajweed_mastery,
                          )
                        }
                      >
                        <Checkbox
                          id={`quranReading-tajweed_mastery-${idx}`}
                          isSelected={
                            formData.quranReadings[idx].tajweed_mastery
                          }
                          name="tajweed_mastery"
                          type="checkbox"
                          onChange={(e) =>
                            handleQuranReadingChange(
                              idx,
                              "tajweed_mastery",
                              e.target.checked,
                            )
                          }
                        />
                        Maîtrise du tajwid
                      </button>
                      <button
                        className="flex items-center gap-1 cursor-pointer"
                        type="button"
                        onClick={() =>
                          handleQuranReadingChange(
                            idx,
                            "ijazah",
                            !formData.quranReadings[idx].ijazah,
                          )
                        }
                      >
                        <Checkbox
                          id={`quranReading-ijazah-${idx}`}
                          isSelected={formData.quranReadings[idx].ijazah}
                          type="checkbox"
                          onChange={(e) =>
                            handleQuranReadingChange(
                              idx,
                              "ijazah",
                              e.target.checked,
                            )
                          }
                        />
                        Ijaza
                      </button>
                      <Button
                        className="bg-transparent text-danger px-2 py-1 ml-2 hover:bg-danger/10 rounded-md text-sm w-auto flex-shrink-0"
                        type="button"
                        onPress={() => handleRemoveQuranReading(idx)}
                      >
                        Supprimer
                      </Button>
                    </div>
                  </div>
                ))}
                <Button
                  className="bg-primary text-white w-fit"
                  type="button"
                  onPress={handleAddQuranReading}
                >
                  Ajouter une lecture
                </Button>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row justify-between gap-4 mt-8 w-full">
              <Button
                className="bg-gray-200 text-primary w-full sm:w-auto"
                type="button"
                onPress={handlePrev}
              >
                Précédent
              </Button>
              <Button
                className="bg-primary text-secondary w-full sm:w-auto"
                type="submit"
              >
                Continuer
              </Button>
            </div>
          </Form>
        )}

        {step === STEPS.MY_EXPERIENCES && (
          <Form
            className="w-full max-w-xl bg-secondary p-0 flex flex-col gap-6"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col gap-2 w-full">
              <label
                className="text-xs font-bold text-primary uppercase"
                htmlFor="experiences-group"
              >
                Expériences *
              </label>
              <div id="experiences-group">
                {formData.experiences.length === 0 && (
                  <div className="text-xs text-gray-500 mb-2">
                    Aucune expérience ajoutée.
                  </div>
                )}
                {formData.experiences.map((exp, idx) => (
                  <div
                    key={idx}
                    className="border border-gray-200 bg-gray-50 rounded-md py-2 px-2 mb-2 transition-shadow hover:shadow-sm w-full flex flex-col gap-2 relative"
                  >
                    <div className="absolute -top-2 -left-2 w-5 h-5 bg-primary text-white text-xs font-bold rounded-full flex items-center justify-center shadow-sm">
                      {idx + 1}
                    </div>
                    <div className="flex flex-wrap md:flex-nowrap gap-2 w-full">
                      <Input
                        isRequired
                        className="flex-1 min-w-[120px] w-full"
                        id={`exp-title-${idx}`}
                        placeholder="Intitulé du poste *"
                        value={exp.title}
                        onChange={(e) =>
                          handleExperienceChange(idx, "title", e.target.value)
                        }
                      />
                      <Input
                        isRequired
                        className="flex-1 min-w-[120px] w-full"
                        id={`exp-city-${idx}`}
                        placeholder="Ville *"
                        value={exp.city}
                        onChange={(e) =>
                          handleExperienceChange(idx, "city", e.target.value)
                        }
                      />
                    </div>
                    <div className="flex flex-wrap md:flex-nowrap gap-2 w-full">
                      <Input
                        isRequired
                        className="flex-1 min-w-[120px] w-full"
                        id={`exp-country-${idx}`}
                        placeholder="Pays *"
                        value={exp.country}
                        onChange={(e) =>
                          handleExperienceChange(idx, "country", e.target.value)
                        }
                      />
                    </div>
                    <div className="flex flex-wrap gap-2 w-full items-start justify-center md:justify-between">
                      <div className="flex flex-col gap-2">
                        <label
                          className="text-xs font-bold text-primary uppercase text-center"
                          htmlFor={`exp-start_date-${idx}`}
                        >
                          Date de début *
                        </label>
                        <Calendar
                          showMonthAndYearPickers
                          aria-label="Date de début *"
                          defaultValue={parseDate("1980-01-01")}
                          value={parseDate(exp.start_date || "1980-01-01")}
                          onChange={(e) =>
                            handleExperienceChange(
                              idx,
                              "start_date",
                              e.toString(),
                            )
                          }
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label
                          className="text-xs font-bold text-primary uppercase text-center"
                          htmlFor={`exp-start_date-${idx}`}
                        >
                          Date de fin
                        </label>
                        <Calendar
                          showMonthAndYearPickers
                          aria-label="Date de fin"
                          defaultValue={parseDate("1980-01-01")}
                          isDisabled={formData.currentExperienceIndex === idx}
                          value={parseDate(exp.end_date || "1980-01-01")}
                          onChange={(e) =>
                            handleExperienceChange(
                              idx,
                              "end_date",
                              e.toString(),
                            )
                          }
                        />
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 w-full items-center justify-center">
                      <label
                        className="text-xs font-bold text-primary uppercase"
                        htmlFor={`exp-current-${idx}`}
                      >
                        Expérience actuelle ?
                      </label>
                      <Checkbox
                        id={`exp-current-${idx}`}
                        isSelected={formData.currentExperienceIndex === idx}
                        type="checkbox"
                        onChange={(e) =>
                          handleCurrentExperienceChange(e.target.checked, idx)
                        }
                      />
                    </div>
                    <Button
                      className="bg-transparent text-danger px-2 py-1 ml-2 hover:bg-danger/10 rounded-md text-sm w-full md:w-auto self-end mt-2 md:mt-0 flex-shrink-0"
                      type="button"
                      onPress={() => handleRemoveExperience(idx)}
                    >
                      Supprimer
                    </Button>
                  </div>
                ))}
                <Button
                  className="bg-primary text-white w-fit"
                  type="button"
                  onPress={handleAddExperience}
                >
                  Ajouter une expérience
                </Button>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row justify-between gap-4 mt-8 w-full">
              <Button
                className="bg-gray-200 text-primary w-full sm:w-auto"
                type="button"
                onPress={handlePrev}
              >
                Précédent
              </Button>
              <Button
                className="bg-primary text-secondary w-full sm:w-auto"
                type="submit"
              >
                Continuer
              </Button>
            </div>
          </Form>
        )}

        {step === STEPS.MY_DIPLOMAS && (
          <Form
            className="w-full max-w-xl bg-secondary p-0 flex flex-col gap-6"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col gap-2 w-full">
              <label
                className="text-xs font-bold text-primary uppercase"
                htmlFor="diplomas-group"
              >
                Diplômes *
              </label>
              <div id="diplomas-group">
                {formData.diplomas.length === 0 && (
                  <div className="text-xs text-gray-500 mb-2">
                    Aucun diplôme ajouté.
                  </div>
                )}
                {formData.diplomas.map((diploma, idx) => (
                  <div
                    key={idx}
                    className="border border-gray-200 bg-gray-50 rounded-md py-2 px-2 mb-2 transition-shadow hover:shadow-sm w-full flex flex-col gap-2 relative"
                  >
                    <div className="absolute -top-2 -left-2 w-5 h-5 bg-primary text-white text-xs font-bold rounded-full flex items-center justify-center shadow-sm">
                      {idx + 1}
                    </div>
                    <div className="flex flex-wrap md:flex-nowrap gap-2 w-full">
                      <Input
                        isRequired
                        className="flex-1 min-w-[120px] w-full"
                        id={`diploma-diploma_name-${idx}`}
                        placeholder="Nom du diplôme *"
                        value={diploma.diploma_name}
                        onChange={(e) =>
                          handleDiplomaChange(
                            idx,
                            "diploma_name",
                            e.target.value,
                          )
                        }
                      />
                      <Input
                        isRequired
                        className="flex-1 min-w-[120px] w-full"
                        id={`diploma-organization_name-${idx}`}
                        placeholder="Établissement *"
                        value={diploma.organization_name}
                        onChange={(e) =>
                          handleDiplomaChange(
                            idx,
                            "organization_name",
                            e.target.value,
                          )
                        }
                      />
                    </div>
                    <div className="flex flex-wrap md:flex-nowrap gap-2 w-full">
                      <Input
                        isRequired
                        className="flex-1 min-w-[120px] w-full"
                        id={`diploma-city-${idx}`}
                        placeholder="Ville *"
                        value={diploma.city}
                        onChange={(e) =>
                          handleDiplomaChange(idx, "city", e.target.value)
                        }
                      />
                      <Input
                        isRequired
                        className="flex-1 min-w-[120px] w-full"
                        id={`diploma-yearObtained-${idx}`}
                        max={new Date().getFullYear()}
                        min={1900}
                        placeholder="Année d'obtention *"
                        type="number"
                        value={String(diploma.year_obtained) || ""}
                        onChange={(e) =>
                          handleDiplomaChange(
                            idx,
                            "year_obtained",
                            e.target.value === "" ? 0 : Number(e.target.value),
                          )
                        }
                      />
                    </div>
                    <div className="flex flex-wrap md:flex-nowrap gap-2 w-full">
                      <Input
                        className="flex-1 min-w-[120px] w-full"
                        id={`diploma-description-${idx}`}
                        placeholder="Description (optionnelle)"
                        value={diploma.description}
                        onChange={(e) =>
                          handleDiplomaChange(
                            idx,
                            "description",
                            e.target.value,
                          )
                        }
                      />
                    </div>
                    <Button
                      className="bg-transparent text-danger px-2 py-1 ml-2 hover:bg-danger/10 rounded-md text-sm w-full md:w-auto self-end mt-2 md:mt-0 flex-shrink-0"
                      type="button"
                      onPress={() => handleRemoveDiploma(idx)}
                    >
                      Supprimer
                    </Button>
                  </div>
                ))}
                <Button
                  className="bg-primary text-white w-fit"
                  type="button"
                  onPress={handleAddDiploma}
                >
                  Ajouter un diplôme
                </Button>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row justify-between gap-4 mt-8 w-full">
              <Button
                className="bg-gray-200 text-primary w-full sm:w-auto"
                isDisabled={isSubmitting}
                type="button"
                onPress={handlePrev}
              >
                Précédent
              </Button>
              <Button
                className="bg-primary text-secondary w-full sm:w-auto"
                isDisabled={isSubmitting}
                isLoading={isSubmitting}
                type="submit"
              >
                {isSubmitting ? "Enregistrement..." : "Terminer"}
              </Button>
            </div>
          </Form>
        )}

        {step === STEPS.FINISHED && (
          <div className="flex flex-col items-center justify-center w-full bg-secondary rounded-xl p-8 gap-6">
            <Image
              alt="Al Mihrab Logo"
              className="w-40 h-auto mb-2"
              height={160}
              src="/assets/svg/logo-mihrab-dark.svg"
              width={160}
            />
            <h1 className="text-3xl md:text-4xl font-bold text-primary text-center">
              Bienvenue, {formData.firstName}
            </h1>
            <p className="text-base text-gray-600 text-center max-w-md">
              Votre profil a bien été enregistré, vous pouvez dès à présent
              naviguer sur la plateforme Mihrab.
            </p>
            <Button
              className="mt-4 w-full max-w-md bg-primary text-secondary text-base font-medium rounded-lg py-3 transition hover:bg-primary/80"
              onPress={() => router.push("/home")}
            >
              Accéder à la plateforme
            </Button>
          </div>
        )}
      </div>
      <div className="xl:w-1/2 hidden xl:block">
        <HalfPageBg />
      </div>
    </Section>
  );
}
