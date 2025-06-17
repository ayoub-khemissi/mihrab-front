"use client";

import { useRouter } from "next/navigation";

import { UserRole } from "@/types/DatabaseTypes";
import Section from "@/components/section";

export default function RoleSelectionPage() {
  const router = useRouter();

  const handleRoleSelection = (role: UserRole) => {
    switch (role) {
      case UserRole.IMAM:
      case UserRole.MOSQUE_MANAGER:
        localStorage.setItem("role", role);
        router.push("/register-profile");
        break;
      default:
        break;
    }
  };

  return (
    <Section className="flex flex-col justify-center items-center text-center">
      <h1 className="font-dmSerifText text-4xl text-primary pb-8">
        Qui êtes-vous ?
      </h1>
      <div className="flex lg:flex-nowrap flex-wrap justify-between items-center gap-16 text-center w-full">
        <div className="w-full">
          <button
            className="group relative flex flex-col justify-center items-center w-full min-h-[300px] lg:min-h-[500px] rounded-xl bg-[url('/assets/bg/mosque-inside.jpg')] bg-cover bg-center shadow-lg overflow-hidden cursor-pointer hover:scale-105 transition-all duration-300"
            type="button"
            onClick={() => handleRoleSelection(UserRole.IMAM)}
          >
            <div className="absolute left-0 top-0 h-full w-full bg-primary/60 group-hover:bg-primary/30 transition-all duration-300 z-0" />
            <div className="relative z-10 space-y-4">
              <p className="lg:text-4xl text-3xl text-secondary font-dmSerifText px-4 drop-shadow-[0_4px_8px_rgba(0,0,0,0.7)] font-bold">
                Je suis Imam
              </p>
            </div>
          </button>
        </div>
        <div className="w-full">
          <button
            className="group relative flex flex-col justify-center items-center w-full min-h-[300px] lg:min-h-[500px] rounded-xl bg-[url('/assets/bg/mosque-6.jpg')] bg-cover bg-center shadow-lg overflow-hidden cursor-pointer hover:scale-105 transition-all duration-300"
            type="button"
            onClick={() => handleRoleSelection(UserRole.MOSQUE_MANAGER)}
          >
            <div className="absolute left-0 top-0 h-full w-full bg-primary/60 group-hover:bg-primary/30 transition-all duration-300 z-0" />
            <div className="relative z-10 space-y-4">
              <p className="lg:text-4xl text-3xl text-secondary font-dmSerifText px-4 drop-shadow-[0_4px_8px_rgba(0,0,0,0.7)] font-bold">
                Je représente une Mosquée
              </p>
            </div>
          </button>
        </div>
      </div>
    </Section>
  );
}
