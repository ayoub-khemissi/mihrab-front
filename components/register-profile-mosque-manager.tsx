"use client";

import { useEffect, useRef, useState } from "react";
import { Alert } from "@heroui/alert";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { Select, SelectItem } from "@heroui/select";
import { Form } from "@heroui/form";
import { useRouter } from "next/navigation";
import {
  FaGlobe,
  FaInstagram,
  FaFacebook,
  FaYoutube,
  FaXTwitter,
  FaCamera,
  FaSpinner,
} from "react-icons/fa6";
import { Link } from "@heroui/link";
import { addToast } from "@heroui/toast";
import { isValidPhoneNumber } from "libphonenumber-js";
import Image from "next/image";

import Section from "@/components/section";
import HalfPageBg from "@/components/half-page-bg";
import { fetchWrapper } from "@/lib/Fetcher";
import getResponseCodeMessage from "@/utils/ResponseCodesMessages";
import { Media } from "@/types/Database/Entities/Media";
import { LocalStorageKeys } from "@/types/LocalStorageKeys";
import { RegisterProfileMosqueManagerFormData } from "@/types/Form/RegisterProfileMosqueManagerFormData";
import { MosqueServiceEnum } from "@/types/Database/Enums/MosqueServiceEnum";
import { MosqueManagerPositionEnum } from "@/types/Database/Enums/MosqueManagerPositionEnum";

const SERVICES = {
  [MosqueServiceEnum.ABLUTIONS]: "Salle d'ablution",
  [MosqueServiceEnum.WOMEN_SPACE]: "Espace pour femmes",
  [MosqueServiceEnum.CHILDREN_CLASSES]: "Cours pour enfants",
  [MosqueServiceEnum.ADULT_CLASSES]: "Cours pour adultes",
  [MosqueServiceEnum.JANAZA]: "Salat janaza",
  [MosqueServiceEnum.PARKING]: "Parking",
  [MosqueServiceEnum.AID_PRAYER]: "Salat 'eid",
};

const MOSQUE_MANAGER_POSITIONS = {
  [MosqueManagerPositionEnum.NONE]: "Choisir un poste",
  [MosqueManagerPositionEnum.PRESIDENT]: "Président",
  [MosqueManagerPositionEnum.SECRETARY]: "Secrétaire",
  [MosqueManagerPositionEnum.TREASURER]: "Trésorier",
  [MosqueManagerPositionEnum.MOSQUE_MANAGER]: "Responsable de la Mosquée",
};

const STEPS = {
  YOUR_MOSQUE: 1,
  SOCIAL_NETWORKS: 2,
  YOUR_PROFILE: 3,
  FINISHED: 4,
};

const STEP_TITLES = [
  "Votre mosquée",
  "Les réseaux sociaux",
  "Votre profil",
  "Terminé",
];

const VALID_SUPPORTING_DOCUMENT_EXTENSIONS = [
  ".pdf",
  ".doc",
  ".docx",
  ".jpg",
  ".jpeg",
  ".png",
];

const VALID_MOSQUE_PICTURE_EXTENSIONS = [".jpg", ".jpeg", ".png"];

export default function RegisterProfileMosqueManager() {
  const router = useRouter();
  const [step, setStep] = useState(STEPS.YOUR_MOSQUE);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    mosqueName: "",
    mosquePicture: null,
    organizationName: "",
    address: "",
    city: "",
    zipCode: "",
    phone: "",
    maxCapacity: 0,
    services: [] as MosqueServiceEnum[],
    social: {
      website: "",
      instagram: "",
      facebook: "",
      youtube: "",
      twitter: "",
    },
    firstName: "",
    lastName: "",
    personalEmail: "",
    personalPhone: "",
    mosquePosition: MosqueManagerPositionEnum.NONE,
    supportingDocument: null,
  } as RegisterProfileMosqueManagerFormData);

  const supportingDocumentRef = useRef<HTMLInputElement>(null);
  const mosquePictureRef = useRef<HTMLInputElement>(null);

  const resetSupportingDocumentRefValue = () => {
    if (supportingDocumentRef.current) {
      supportingDocumentRef.current.value = "";
    }
  };

  const resetMosquePictureRefValue = () => {
    if (mosquePictureRef.current) {
      mosquePictureRef.current.value = "";
    }
  };

  const handleMosquePictureClick = () => {
    if (mosquePictureRef.current) {
      mosquePictureRef.current.click();
    }
  };

  const validateMaxCapacity = (value: number): string => {
    if (value === 0) {
      return "Veuillez sélectionner une capacité d'accueil maximale.";
    }

    return "";
  };

  const validateMosquePosition = (value: MosqueManagerPositionEnum): string => {
    if (value === MosqueManagerPositionEnum.NONE) {
      return "Veuillez sélectionner votre poste à la mosquée.";
    }

    return "";
  };

  const validateStep = (currentStep: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (currentStep === STEPS.YOUR_MOSQUE) {
      const maxCapacityError = validateMaxCapacity(formData.maxCapacity);

      if (maxCapacityError) {
        newErrors.maxCapacity = maxCapacityError;
      }

      if (!isValidPhoneNumber(formData.phone, "FR")) {
        newErrors.phone =
          "Numéro de téléphone invalide. (Exemple: +33 6 07 08 09 10 ou 06 07 08 09 10)";
      }
    }

    if (currentStep === STEPS.YOUR_PROFILE) {
      const mosquePositionError = validateMosquePosition(
        formData.mosquePosition,
      );

      if (mosquePositionError) {
        newErrors.mosquePosition = mosquePositionError;
      }

      if (!isValidPhoneNumber(formData.personalPhone, "FR")) {
        newErrors.personalPhone =
          "Numéro de téléphone invalide. (Exemple: +33 6 07 08 09 10 ou 06 07 08 09 10)";
      }
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleServiceToggle = (service: MosqueServiceEnum) => {
    setFormData((prev) => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter((s) => s !== service)
        : [...prev.services, service],
    }));
  };

  useEffect(() => {
    try {
      const saved = localStorage.getItem(
        LocalStorageKeys.PROFILE_MOSQUE_MANAGER,
      );

      if (saved) {
        const parsed = JSON.parse(saved);

        parsed.supportingDocument = null;
        parsed.mosquePicture = null;

        setFormData((prev) => ({ ...prev, ...parsed }));
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!isLoading) {
      const formDataCopy = structuredClone(formData);

      formDataCopy.supportingDocument = null;
      formDataCopy.mosquePicture = null;

      localStorage.setItem(
        LocalStorageKeys.PROFILE_MOSQUE_MANAGER,
        JSON.stringify(formDataCopy),
      );
    }
  }, [formData, isLoading]);

  const clearProfileStorage = () => {
    localStorage.removeItem(LocalStorageKeys.PROFILE_MOSQUE_MANAGER);
  };

  const handleSubmitProfile = async () => {
    if (!validateStep(step)) {
      return;
    }

    setIsSubmitting(true);

    const response = await fetchWrapper(
      "/register/profile/mosque-manager",
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

    if (step === STEPS.YOUR_MOSQUE) {
      setStep(STEPS.SOCIAL_NETWORKS);
    } else if (step === STEPS.SOCIAL_NETWORKS) {
      setStep(STEPS.YOUR_PROFILE);
    } else if (step === STEPS.YOUR_PROFILE) {
      handleSubmitProfile();
    }
  };

  const handlePrev = () => {
    if (step === STEPS.YOUR_MOSQUE) {
      router.push("/role-selection");
    } else {
      setStep(step - 1);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSocialChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      social: { ...prev.social, [name]: value },
    }));
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = parseInt(event.target.value);

    setFormData((prev) => ({
      ...prev,
      maxCapacity: value,
    }));

    if (errors.maxCapacity) {
      setErrors((prev) => ({ ...prev, maxCapacity: "" }));
    }
  };

  const handleMosquePositionChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const value = event.target.value as MosqueManagerPositionEnum;

    setFormData((prev) => ({
      ...prev,
      mosquePosition: value,
    }));

    if (errors.mosquePosition) {
      setErrors((prev) => ({ ...prev, mosquePosition: "" }));
    }
  };

  const handleSupportingDocumentChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];

    if (!file) {
      setFormData((prev) => ({ ...prev, supportingDocument: null }));

      resetSupportingDocumentRefValue();

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

      setFormData((prev) => ({ ...prev, supportingDocument: null }));

      resetSupportingDocumentRefValue();

      return;
    } else if (
      !VALID_SUPPORTING_DOCUMENT_EXTENSIONS.includes(`.${fileExtension}`)
    ) {
      addToast({
        title: "Format de fichier non supporté.",
        description: `Le fichier doit être au format ${VALID_SUPPORTING_DOCUMENT_EXTENSIONS.join(
          ", ",
        )}.`,
        color: "danger",
        timeout: 6000,
        shouldShowTimeoutProgress: true,
      });

      resetSupportingDocumentRefValue();

      setFormData((prev) => ({ ...prev, supportingDocument: null }));

      return;
    }

    const supportingDocument: Media = {
      id: "",
      name: fileName,
      extension: fileExtension,
      size: fileSize,
      content: fileContent,
      created_at: "",
    };

    setFormData((prev) => ({
      ...prev,
      supportingDocument: supportingDocument,
    }));
  };

  const handleMosquePictureChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];

    if (!file) {
      setFormData((prev) => ({ ...prev, mosquePicture: null }));

      resetMosquePictureRefValue();

      return;
    }

    const fileName = file.name;
    const fileExtension = fileName.split(".").pop()?.toLowerCase() || "";
    const fileSize = file.size;
    const fileContent = Buffer.from(await file.arrayBuffer()).toString(
      "base64",
    );

    if (fileSize > 5 * 1024 * 1024) {
      addToast({
        title: "Fichier trop volumineux.",
        description: "Le fichier ne doit pas dépasser 5MB.",
        color: "danger",
        timeout: 3000,
        shouldShowTimeoutProgress: true,
      });

      setFormData((prev) => ({ ...prev, mosquePicture: null }));

      resetMosquePictureRefValue();

      return;
    }

    if (!VALID_MOSQUE_PICTURE_EXTENSIONS.includes(`.${fileExtension}`)) {
      addToast({
        title: "Format de fichier non supporté.",
        description: `Le fichier doit être au format ${VALID_MOSQUE_PICTURE_EXTENSIONS.join(
          ", ",
        )}.`,
        color: "danger",
        timeout: 6000,
        shouldShowTimeoutProgress: true,
      });

      resetMosquePictureRefValue();

      setFormData((prev) => ({ ...prev, mosquePicture: null }));

      return;
    }

    const mosquePicture: Media = {
      id: "",
      name: fileName,
      extension: fileExtension,
      size: fileSize,
      content: fileContent,
      created_at: "",
    };

    setFormData((prev) => ({ ...prev, mosquePicture: mosquePicture }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleNext();
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

        {step === STEPS.YOUR_MOSQUE && (
          <Form
            className="w-full max-w-xl bg-secondary p-0 flex flex-col gap-6"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col gap-2 w-full items-center">
              {formData.mosquePicture ? (
                <div className="flex flex-col gap-2">
                  <Image
                    alt="Mosque picture"
                    className="w-20 h-20 rounded-full object-cover cursor-pointer"
                    height={80}
                    src={`data:image/${formData.mosquePicture.extension};base64,${formData.mosquePicture.content}`}
                    width={80}
                    onClick={handleMosquePictureClick}
                  />
                </div>
              ) : (
                <button
                  className="w-20 h-20 rounded-full cursor-pointer flex items-center justify-center bg-primary"
                  onClick={handleMosquePictureClick}
                >
                  <FaCamera className="text-white text-3xl" />
                </button>
              )}
              <label
                className="text-xs font-bold text-primary uppercase text-center"
                htmlFor="mosquePicture"
              >
                Joindre une photo de la mosquée
              </label>
              <div className="flex flex-col gap-2">
                <Input
                  ref={mosquePictureRef}
                  accept={VALID_MOSQUE_PICTURE_EXTENSIONS.join(",")}
                  className="hidden bg-transparent border-b border-gray-200 rounded-none px-0 py-2 focus:ring-0 focus:border-primary"
                  id="mosquePicture"
                  name="mosquePicture"
                  type="file"
                  onChange={handleMosquePictureChange}
                />
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-4 w-full">
              <div className="flex-1 flex flex-col gap-2">
                <label
                  className="text-xs font-bold text-primary uppercase"
                  htmlFor="mosqueName"
                >
                  Nom de la mosquée *
                </label>
                <Input
                  isRequired
                  id="mosqueName"
                  minLength={3}
                  name="mosqueName"
                  placeholder="Nom de la mosquée"
                  value={formData.mosqueName}
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex-1 flex flex-col gap-2">
                <label
                  className="text-xs font-bold text-primary uppercase"
                  htmlFor="organizationName"
                >
                  Nom de l&apos;association
                </label>
                <Input
                  id="organizationName"
                  minLength={3}
                  name="organizationName"
                  placeholder="Nom de l'association"
                  value={formData.organizationName}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="flex flex-col gap-2 w-full">
              <label
                className="text-xs font-bold text-primary uppercase"
                htmlFor="address"
              >
                Adresse de la mosquée *
              </label>
              <Input
                isRequired
                id="address"
                minLength={3}
                name="address"
                placeholder="Adresse"
                value={formData.address}
                onChange={handleInputChange}
              />
            </div>
            <div className="flex flex-col md:flex-row gap-4 w-full">
              <div className="flex-1 flex flex-col gap-2">
                <label
                  className="text-xs font-bold text-primary uppercase"
                  htmlFor="city"
                >
                  Ville *
                </label>
                <Input
                  isRequired
                  id="city"
                  minLength={2}
                  name="city"
                  placeholder="Ville"
                  value={formData.city}
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex-1 flex flex-col gap-2">
                <label
                  className="text-xs font-bold text-primary uppercase"
                  htmlFor="zipCode"
                >
                  Code postal *
                </label>
                <Input
                  isRequired
                  id="zipCode"
                  maxLength={5}
                  minLength={5}
                  name="zipCode"
                  placeholder="XXXXX"
                  value={formData.zipCode}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="flex flex-col gap-2 w-full">
              <label
                className="text-xs font-bold text-primary uppercase"
                htmlFor="phone"
              >
                Numéro de téléphone de la mosquée *
              </label>
              <Input
                isRequired
                errorMessage={errors?.phone || ""}
                id="phone"
                isInvalid={!!errors?.phone || false}
                name="phone"
                placeholder="06 07 08 09 10"
                type="tel"
                value={formData.phone}
                onChange={handleInputChange}
              />
            </div>
            <div className="flex flex-col gap-2 w-full">
              <label
                className="text-xs font-bold text-primary uppercase"
                htmlFor="maxCapacity"
              >
                La mosquée possède une capacité d&apos;accueil maximale de *
              </label>
              <Select
                isRequired
                className="bg-transparent border-b border-gray-200 rounded-none px-0 py-2 focus:ring-0 focus:border-primary"
                errorMessage={errors.maxCapacity}
                id="maxCapacity"
                isInvalid={!!errors.maxCapacity}
                placeholder="Choisir une capacité d'accueil maximale"
                selectedKeys={[formData.maxCapacity.toString()]}
                value={formData.maxCapacity.toString()}
                onChange={handleSelectChange}
              >
                <SelectItem key="0">
                  Choisir une capacité d&apos;accueil maximale
                </SelectItem>
                <SelectItem key="50">Jusqu&apos;à 50 personnes</SelectItem>
                <SelectItem key="100">Jusqu&apos;à 100 personnes</SelectItem>
                <SelectItem key="200">Jusqu&apos;à 200 personnes</SelectItem>
                <SelectItem key="500">Jusqu&apos;à 500 personnes</SelectItem>
                <SelectItem key="1000">Plus de 500 personnes</SelectItem>
              </Select>
            </div>
            <div className="flex flex-col gap-2 w-full">
              <label
                className="text-xs font-bold text-primary uppercase"
                htmlFor="services"
              >
                Sélectionnez les services que votre mosquée propose
              </label>
              <div className="flex flex-wrap gap-2">
                {Object.entries(SERVICES).map(([key, value]) => (
                  <Button
                    key={key}
                    className={`px-3 py-2 rounded border transition-all text-sm ${
                      formData.services.includes(key as MosqueServiceEnum)
                        ? "bg-primary text-white border-primary"
                        : "bg-white text-primary border-gray-300"
                    } hover:bg-primary hover:text-white hover:border-primary`}
                    type="button"
                    onPress={() =>
                      handleServiceToggle(key as MosqueServiceEnum)
                    }
                  >
                    {value}
                  </Button>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-2 w-full">
              <label
                className="text-xs font-bold text-primary uppercase"
                htmlFor="supportingDocument"
              >
                Joindre un document justificatif *
              </label>
              <div className="flex flex-col gap-2">
                <Input
                  ref={supportingDocumentRef}
                  isRequired
                  accept={VALID_SUPPORTING_DOCUMENT_EXTENSIONS.join(",")}
                  id="supportingDocument"
                  name="supportingDocument"
                  type="file"
                  onChange={handleSupportingDocumentChange}
                />
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

        {step === STEPS.SOCIAL_NETWORKS && (
          <Form
            className="w-full max-w-xl bg-secondary p-0 flex flex-col gap-6"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col gap-6 w-full">
              <div className="flex items-center gap-2 text-primary font-bold text-lg">
                <FaGlobe />
                <label className="uppercase" htmlFor="website">
                  Site web
                </label>
              </div>
              <Input
                id="website"
                name="website"
                placeholder="https://www.example.com"
                type="url"
                value={formData.social.website}
                onChange={handleSocialChange}
              />
            </div>
            <div className="flex flex-col lg:flex-row gap-4 mt-4 w-full">
              <div className="flex-1 flex flex-col gap-6">
                <div className="flex items-center gap-2 text-primary font-bold text-lg">
                  <FaInstagram />
                  <label className="uppercase" htmlFor="instagram">
                    Instagram
                  </label>
                </div>
                <Input
                  id="instagram"
                  name="instagram"
                  placeholder="https://www.instagram.com/..."
                  type="url"
                  value={formData.social.instagram}
                  onChange={handleSocialChange}
                />
              </div>
              <div className="flex-1 flex flex-col gap-6">
                <div className="flex items-center gap-2 text-primary font-bold text-lg">
                  <FaFacebook />
                  <label className="uppercase" htmlFor="facebook">
                    Facebook
                  </label>
                </div>
                <Input
                  id="facebook"
                  name="facebook"
                  placeholder="https://www.facebook.com/..."
                  type="url"
                  value={formData.social.facebook}
                  onChange={handleSocialChange}
                />
              </div>
            </div>
            <div className="flex flex-col lg:flex-row gap-4 mt-4 w-full">
              <div className="flex-1 flex flex-col gap-6">
                <div className="flex items-center gap-2 text-primary font-bold text-lg">
                  <FaYoutube />
                  <label className="uppercase" htmlFor="youtube">
                    YouTube
                  </label>
                </div>
                <Input
                  id="youtube"
                  name="youtube"
                  placeholder="https://www.youtube.com/..."
                  type="url"
                  value={formData.social.youtube}
                  onChange={handleSocialChange}
                />
              </div>
              <div className="flex-1 flex flex-col gap-6">
                <div className="flex items-center gap-2 text-primary font-bold text-lg">
                  <FaXTwitter />
                  <label className="uppercase" htmlFor="twitter">
                    Twitter / X
                  </label>
                </div>
                <Input
                  id="twitter"
                  name="twitter"
                  placeholder="https://x.com/..."
                  type="url"
                  value={formData.social.twitter}
                  onChange={handleSocialChange}
                />
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
                  minLength={2}
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
                  Nom de famille *
                </label>
                <Input
                  isRequired
                  id="lastName"
                  minLength={2}
                  name="lastName"
                  placeholder="Nom de famille"
                  value={formData.lastName}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="flex flex-col gap-2 w-full">
              <label
                className="text-xs font-bold text-primary uppercase"
                htmlFor="personalEmail"
              >
                Mon adresse e-mail personnelle *
              </label>
              <Input
                isRequired
                id="personalEmail"
                name="personalEmail"
                placeholder="exemple@mail.fr"
                type="email"
                value={formData.personalEmail}
                onChange={handleInputChange}
              />
            </div>
            <div className="flex flex-col gap-2 w-full">
              <label
                className="text-xs font-bold text-primary uppercase"
                htmlFor="personalPhone"
              >
                Numéro de téléphone personnel *
              </label>
              <Input
                isRequired
                errorMessage={errors?.personalPhone || ""}
                id="personalPhone"
                isInvalid={!!errors?.personalPhone || false}
                name="personalPhone"
                placeholder="06 07 08 09 10"
                type="tel"
                value={formData.personalPhone}
                onChange={handleInputChange}
              />
            </div>
            <div className="flex flex-col gap-2 w-full">
              <label
                className="text-xs font-bold text-primary uppercase"
                htmlFor="mosquePosition"
              >
                À la mosquée j&apos;occupe le poste de... *
              </label>
              <Select
                isRequired
                errorMessage={errors.mosquePosition}
                id="mosquePosition"
                isInvalid={!!errors.mosquePosition}
                name="mosquePosition"
                placeholder="Choisir un poste"
                selectedKeys={[formData.mosquePosition]}
                value={formData.mosquePosition}
                onChange={handleMosquePositionChange}
              >
                {Object.entries(MOSQUE_MANAGER_POSITIONS).map(
                  ([key, value]) => (
                    <SelectItem key={key}>{value}</SelectItem>
                  ),
                )}
              </Select>
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
              className="mt-4 w-full max-w-md bg-primary text-secondary py-3 transition hover:bg-primary/80"
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
