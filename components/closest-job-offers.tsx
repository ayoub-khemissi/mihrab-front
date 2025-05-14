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
import { JobOffer } from "@/types/job-offer";
import { JobOfferLanguage } from "@/types/job-offer-language";
import { JobOfferWorkingHour } from "@/types/job-offer-working-hour";
import { JobOfferContractType } from "@/types/job-offer-contract-type";
import { JobOfferQuranReading } from "@/types/job-offer-quran-reading";

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
      return "Contrat à durée déterminée";
    case "permanent":
      return "Contrat à durée indéterminée";
    case "occasional":
      return "Intervention ponctuelle";
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

  return (
    <div className="flex flex-wrap gap-8 w-full justify-center">
      {jobOffers.map((jobOffer) => {
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
            key={jobOffer.id}
            className="bg-secondary rounded-xl shadow-md flex flex-col w-full max-w-md p-6 gap-4 items-start border border-gray-200 hover:shadow-lg transition-shadow relative"
          >
            <div className="flex justify-between gap-4 w-full">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden">
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
              <div className="flex-1 flex flex-col gap-1">
                <div className="flex items-start justify-between w-full">
                  <span className="font-dmSerifText text-lg text-primary text-left">
                    {jobOffer.title}
                  </span>
                  <span
                    className={clsx(
                      `bg-danger font-semibold text-secondary text-xs p-3 rounded-md ml-2 uppercase`,
                      urgent ? "visible" : "invisible",
                    )}
                  >
                    Urgent
                  </span>
                </div>
                <div className="flex items-center text-sm text-primary gap-2">
                  <FaLocationDot className="w-4 h-4" />
                  <span>
                    {mosque.city} ({mosque.zip_code.substring(0, 2)})
                  </span>
                </div>
                <div className="flex items-center text-sm text-primary gap-2">
                  <FaLanguage className="w-4 h-4" />
                  <span>{languages}</span>
                </div>
                <div className="flex items-center text-sm text-primary gap-2">
                  <FaCalendarDays className="w-4 h-4" />
                  <span>{dateDebut}</span>
                </div>
                {remuneration > 0 && (
                  <div className="flex items-center text-sm text-primary gap-2">
                    <FaMoneyBill className="w-4 h-4" />
                    <span>{remuneration} €</span>
                  </div>
                )}
              </div>
            </div>
            <div className="h-px bg-black/5 w-24" />
            <div className="flex gap-4">
              <span className="bg-tertiary text-primary font-medium px-4 py-2 rounded-md text-sm shadow-sm">
                {typeContrat}
              </span>
              <span className="bg-tertiary text-quaternary font-medium px-4 py-2 rounded-md text-sm shadow-sm">
                {lecture}
              </span>
            </div>
          </button>
        );
      })}
    </div>
  );
}
