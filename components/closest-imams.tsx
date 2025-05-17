import Image from "next/image";
import {
  FaLanguage,
  FaLocationDot,
  FaRegClock,
  FaRegFileLines,
  FaRegHeart,
} from "react-icons/fa6";

import { mockImams } from "@/mocks/imams";
import { ImamWorkingHour } from "@/types/imam-working-hour";
import { ImamProfile } from "@/types/imam-profile";
import { ImamLanguage } from "@/types/imam-language";
import { ImamContractType } from "@/types/imam-contract-type";

const languageToText = (language: ImamLanguage) => {
  switch (language.language) {
    case "arabic":
      return "Arabe";
    case "french":
      return "Français";
  }
};

const contractTypeToText = (contractType: ImamContractType) => {
  switch (contractType.contract_type) {
    case "permanent":
      return "CDI";
    case "fixed_term":
      return "CDD";
    case "occasional":
      return "Occasionnel";
  }
};

const workingHourToText = (workingHour: ImamWorkingHour) => {
  switch (workingHour.working_hour) {
    case "full_time":
      return "Temps plein";
    case "part_time":
      return "Temps partiel";
  }
};

const getLocation = (imam: ImamProfile) => {
  if (imam.zones && imam.zones.length > 0) {
    return `${imam.zones[0].city} (${imam.zones[0].zip_code?.substring(0, 2)})`;
  }

  return "";
};

const getFullName = (imam: ImamProfile) => {
  return `${imam.user.first_name} ${imam.user.last_name?.[0]}.`;
};

const getLanguages = (imam: ImamProfile) => {
  if (imam.languages && imam.languages.length > 0) {
    return imam.languages.map((l) => languageToText(l)).join(", ");
  }

  return "";
};

const getContractType = (imam: ImamProfile) => {
  if (imam.contract_type && imam.contract_type.length > 0) {
    return contractTypeToText(imam.contract_type[0]);
  }

  return "";
};

const getWorkingHour = (imam: ImamProfile) => {
  if (imam.working_hours && imam.working_hours.length > 0) {
    return workingHourToText(imam.working_hours[0]);
  }

  return "";
};

export default function ClosestImams() {
  return mockImams.map((imam, idx) => {
    const fullName = getFullName(imam);
    const location = getLocation(imam);
    const languages = getLanguages(imam);
    const contractType = getContractType(imam);
    const workingHour = getWorkingHour(imam);

    return (
      <button
        key={imam.user.id + "-" + idx}
        className="bg-secondary rounded-xl shadow-md w-full max-w-[420px] flex flex-col p-6 items-start border border-gray-200 hover:shadow-lg transition-shadow relative"
      >
        <div className="flex items-center justify-between w-full mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden">
              {imam.user.photo ? (
                <Image
                  alt={fullName}
                  className="w-12 h-12 object-cover rounded-full"
                  height={48}
                  src={imam.user.photo}
                  width={48}
                />
              ) : (
                <Image
                  alt={fullName}
                  className="w-7 h-7 object-cover rounded-full"
                  height={28}
                  src="/assets/svg/imam.svg"
                  width={28}
                />
              )}
            </div>
            <span className="font-bold text-lg text-primary">{fullName}</span>
          </div>
          <div className="rounded-full bg-secondary p-2 hover:bg-tertiary transition-colors">
            <FaRegHeart className="w-5 h-5 text-primary" />
          </div>
        </div>
        <div className="h-px bg-black/5 w-full mb-3" />
        <div className="flex flex-col gap-2 mb-3">
          <div className="flex items-center gap-2 text-primary text-base">
            <FaLocationDot className="w-4 h-4 text-primary" />
            <span>{location}</span>
          </div>
          <div className="flex items-center gap-2 text-primary text-base">
            <FaLanguage className="w-4 h-4 text-primary" />
            <span>{languages}</span>
          </div>
        </div>
        <div className="flex justify-between items-center w-full gap-x-2 mb-3">
          <div className="uppercase text-nowrap text-xs font-semibold text-gray-500 w-auto">
            Contrat recherché
          </div>
          <div className="h-px bg-black/5 w-full" />
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 text-primary text-base">
            <FaRegFileLines className="w-4 h-4 text-primary" />
            <span>{contractType}</span>
          </div>
          <div className="flex items-center gap-2 text-primary text-base">
            <FaRegClock className="w-4 h-4 text-primary" />
            <span>{workingHour}</span>
          </div>
        </div>
      </button>
    );
  });
}
