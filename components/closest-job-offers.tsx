import Image from "next/image";
import {
  FaLocationDot,
  FaCalendarDays,
  FaLanguage,
  FaMoneyBill,
} from "react-icons/fa6";
import { FaMosque } from "react-icons/fa6";
import clsx from "clsx";

import { mockJobOffers } from "@/mocks/job-offers";
import { JobOfferLanguage } from "@/types/DatabaseTypes/JobOfferLanguage";
import { JobOfferContractType } from "@/types/DatabaseTypes/JobOfferContractType";
import { JobOfferWorkingHour } from "@/types/DatabaseTypes/JobOfferWorkingHour";
import { JobOfferQuranReading } from "@/types/DatabaseTypes/JobOfferQuranReading";
import { JobOffer } from "@/types/DatabaseTypes/JobOffer";

const languageToText = (language: JobOfferLanguage) => {
  switch (language.language) {
    case "arabic":
      return "Arabe";
    case "french":
      return "Français";
  }
};

const workingHourToText = (workingHour: JobOfferWorkingHour) => {
  switch (workingHour.working_hour) {
    case "full_time":
      return "Temps plein";
    case "part_time":
      return "Temps partiel";
  }
};

const contractTypeToText = (contractType: JobOfferContractType) => {
  switch (contractType.contract_type) {
    case "fixed_term":
      return "CDD";
    case "permanent":
      return "CDI";
    case "occasional":
      return "Intervention";
  }
};

const quranReadingToText = (quranReading: JobOfferQuranReading) => {
  switch (quranReading.riwaya) {
    case "hafs":
      return "Hafs";
    case "warsh":
      return "Warsh";
    case "qalun":
      return "Qalun";
    case "al_duri":
      return "Al-Duri";
    case "al_susi":
      return "Al-Susi";
    case "shubah":
      return "Shu'bah";
    case "khalaf":
      return "Khalaf";
  }
};

export default function ClosestJobOffers() {
  const jobOffers: JobOffer[] = mockJobOffers;

  return jobOffers.map((jobOffer, idx) => {
    const mosque = jobOffer.mosque;
    const urgent = jobOffer.urgent;
    const languages = jobOffer.languages
      .map((language) => languageToText(language))
      .join(", ");
    const dateDebut = jobOffer.working_hours
      .map((workingHour) => workingHourToText(workingHour))
      .join(", ");
    const typeContrat = jobOffer.contract_types
      .map((contractType) => contractTypeToText(contractType))
      .join(", ");
    const lecture =
      "Lecture " +
      jobOffer.quran_readings
        .map((quranReading) => quranReadingToText(quranReading))
        .join(", ");
    const remuneration = jobOffer.remuneration;

    return (
      <button
        key={jobOffer.id + "-" + idx}
        className="bg-secondary rounded-xl shadow-md w-full max-w-[420px] flex flex-col p-6 gap-4 border border-gray-200 hover:shadow-lg transition-shadow relative text-sm"
        type="button"
      >
        <div className="flex gap-4 w-full">
          <div className="min-w-12 min-h-12 max-w-12 max-h-12 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden">
            {mosque.picture ? (
              <Image
                alt={mosque.name || "Mosquée"}
                className="w-12 h-12 object-cover rounded-full border border-gray-100 bg-gray-50"
                height={48}
                src={mosque.picture}
                width={48}
              />
            ) : (
              <FaMosque className="w-6 h-6 text-primary" />
            )}
          </div>
          <div className="flex justify-between w-full flex-col gap-1">
            <div className="flex items-start justify-between w-full">
              <span className="font-dmSerifText text-xl text-primary text-left">
                {jobOffer.title}
              </span>
              <span
                className={clsx(
                  `bg-danger font-semibold text-secondary text-xs py-2 px-3 rounded-md ml-2 uppercase`,
                  urgent ? "visible" : "invisible",
                )}
              >
                Urgent
              </span>
            </div>
            <div className="flex items-center text-primary gap-2">
              <FaLocationDot className="w-4 h-4" />
              <span>
                {mosque.city} ({mosque.zip_code.substring(0, 2)})
              </span>
            </div>
            <div className="flex items-center text-primary gap-2">
              <FaLanguage className="w-4 h-4" />
              <span>{languages}</span>
            </div>
            <div className="flex items-center text-primary gap-2">
              <FaCalendarDays className="w-4 h-4" />
              <span>{dateDebut}</span>
            </div>
            {remuneration > 0 && (
              <div className="flex items-center text-primary gap-2">
                <FaMoneyBill className="w-4 h-4" />
                <span>
                  {Intl.NumberFormat("fr-FR", {
                    style: "currency",
                    currency: "EUR",
                  }).format(remuneration)}
                </span>
              </div>
            )}
          </div>
        </div>
        <div className="h-px bg-black/5 w-24" />
        <div className="flex gap-4">
          <span className="bg-tertiary text-primary font-medium px-4 py-2 rounded-md shadow-sm">
            {typeContrat}
          </span>
          <span className="bg-tertiary text-quaternary font-medium px-4 py-2 rounded-md shadow-sm">
            {lecture}
          </span>
        </div>
      </button>
    );
  });
}
