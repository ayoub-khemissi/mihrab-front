"use client";

import { Button } from "@heroui/button";
import clsx from "clsx";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import Faq from "@/components/faq";
import Section from "@/components/section";
import ClosestImams from "@/components/closest-imams";
import ClosestJobOffers from "@/components/closest-job-offers";

const howItWorksTexts = {
  imam: [
    {
      step: (
        <>
          Étape <span className="text-3xl">١</span>
        </>
      ),
      title: "Je créé mon compte",
      description:
        "Je renseigne mes informations d'identité générales ainsi que mes préférences de mission",
    },
    {
      step: (
        <>
          Étape <span className="text-3xl">٢</span>
        </>
      ),
      title: "Je consulte les missions",
      description:
        "Je consulte les missions qui m'intéressent et qui me correspondent",
    },
    {
      step: (
        <>
          Étape <span className="text-3xl">٣</span>
        </>
      ),
      title: "Je postule",
      description:
        "Je réponds aux offres d'emploi afin d'être mis en relation avec un Responsable de Mosquée",
    },
  ],
  mosque: [
    {
      step: (
        <>
          Étape <span className="text-3xl">١</span>
        </>
      ),
      title: "Je créé mon compte",
      description:
        "Je renseigne mes informations d'identité générales ainsi que celle de ma mosquée",
    },
    {
      step: (
        <>
          Étape <span className="text-3xl">٢</span>
        </>
      ),
      title: "Je rédige l'offre d'emploi",
      description:
        "Je détaille les missions, le profil et l'expérience requise...",
    },
    {
      step: (
        <>
          Étape <span className="text-3xl">٣</span>
        </>
      ),
      title: "Je gère mes candidatures",
      description:
        "Je trie les candidatures et organise des entretiens avec les profils retenus",
    },
  ],
};

export default function Home() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [profileSelected, setProfileSelected] = useState<"imam" | "mosque">(
    (searchParams.get("profile") as "imam" | "mosque") || "imam",
  );

  const handleProfileChange = (profile: "imam" | "mosque") => {
    setProfileSelected(profile);
    router.push(`/?profile=${profile}`, { scroll: false });
  };

  useEffect(() => {
    const profile = searchParams.get("profile");

    if (profile) {
      setProfileSelected(profile as "imam" | "mosque");
    }
  }, [searchParams]);

  return (
    <div className="flex flex-col gap-16 pt-32 pb-20 w-full">
      <Section
        className="relative flex flex-col justify-center w-full min-h-[500px] rounded-xl bg-[url('/assets/bg/mosque-inside.jpg')] bg-cover bg-center shadow-lg"
        id="top"
      >
        <div className="absolute left-0 top-0 h-full w-full rounded-xl bg-gradient-to-r from-primary to-transparent z-0 pointer-events-none" />
        <div className="relative z-10 space-y-4">
          <h1 className={clsx("text-4xl text-secondary font-dmSerifText")}>
            La Plateforme de recherche <br />
            d&apos;Emploi pour Imams et Mosquées.
          </h1>
          <div className="bg-secondary gap-2 flex justify-center items-center flex-wrap w-fit p-2 rounded-md">
            <Button
              className={clsx(
                "rounded-sm font-normal",
                profileSelected === "imam"
                  ? "bg-primary text-secondary font-medium"
                  : "bg-transparent text-primary",
              )}
              onPress={() => {
                handleProfileChange("imam");
                window.scrollTo({
                  top: document.getElementById("how-it-works")!.offsetTop,
                  behavior: "smooth",
                });
              }}
            >
              Je suis Imam
            </Button>
            <Button
              className={clsx(
                "rounded-sm font-normal",
                profileSelected === "mosque"
                  ? "bg-primary text-secondary font-medium"
                  : "bg-transparent text-primary",
              )}
              onPress={() => {
                handleProfileChange("mosque");
                window.scrollTo({
                  top: document.getElementById("how-it-works")!.offsetTop,
                  behavior: "smooth",
                });
              }}
            >
              Je suis une Mosquée
            </Button>
          </div>
        </div>
      </Section>

      <Section
        className="relative flex flex-col items-center gap-y-10 justify-center w-full min-h-[700px] bg-gradient-to-b from-primary via-primary to-primary rounded-xl shadow-lg"
        id="how-it-works"
      >
        <div className="absolute left-0 top-0 h-full w-full rounded-xl bg-[url('/assets/svg/bg-flowers-light.svg')] opacity-10 bg-cover bg-center z-0 pointer-events-none" />
        <h2 className="text-center relative z-10 text-3xl text-secondary font-dmSerifText">
          Comment ça marche
        </h2>
        <div className="bg-secondary gap-2 flex justify-center items-center flex-wrap w-fit p-2 rounded-md">
          <Button
            className={clsx(
              "rounded-sm font-normal",
              profileSelected === "imam"
                ? "bg-primary text-secondary font-medium"
                : "bg-transparent text-primary",
            )}
            onPress={() => handleProfileChange("imam")}
          >
            Imam
          </Button>
          <Button
            className={clsx(
              "rounded-sm font-normal",
              profileSelected === "mosque"
                ? "bg-primary text-secondary font-medium"
                : "bg-transparent text-primary",
            )}
            onPress={() => handleProfileChange("mosque")}
          >
            Mosquée
          </Button>
        </div>
        <div className="flex justify-center flex-wrap gap-6 text-primary">
          {howItWorksTexts[profileSelected].map((step, index) => (
            <div
              key={index}
              className="max-w-[370px] p-8 bg-secondary rounded-md"
            >
              <h3 className="text-base uppercase">{step.step}</h3>
              <div className="w-12 h-px bg-primary my-4" />
              <p className="text-lg mb-2 font-dmSerifText">{step.title}</p>
              <p className="text-sm">{step.description}</p>
            </div>
          ))}
        </div>
      </Section>
      <Section
        fullWidth
        className="relative flex flex-col items-center gap-y-10 justify-center min-h-[700px] bg-tertiary"
        id="suggestions"
      >
        <h2 className="text-center relative z-10 text-3xl text-primary font-dmSerifText">
          {profileSelected === "imam"
            ? "Ces Missions pourraient vous intéresser"
            : "Ces Imams pourraient vous intéresser"}
        </h2>
        <div className="bg-secondary gap-2 flex justify-center items-center flex-wrap w-fit p-2 rounded-md">
          <Button
            className={clsx(
              "rounded-sm font-normal",
              profileSelected === "imam"
                ? "bg-primary text-secondary font-medium"
                : "bg-transparent text-primary",
            )}
            onPress={() => handleProfileChange("imam")}
          >
            Je cherche une Mission
          </Button>
          <Button
            className={clsx(
              "rounded-sm font-normal",
              profileSelected === "mosque"
                ? "bg-primary text-secondary font-medium"
                : "bg-transparent text-primary",
            )}
            onPress={() => handleProfileChange("mosque")}
          >
            Je cherche un Imam
          </Button>
        </div>
        <div className="flex justify-center flex-wrap gap-6 text-primary">
          {profileSelected === "imam" ? <ClosestJobOffers /> : <ClosestImams />}
        </div>
      </Section>
      <Section className="relative flex flex-col items-center rounded-xl gap-y-10 justify-center min-h-[700px] bg-tertiary overflow-hidden">
        <div className="absolute left-0 top-0 h-full w-full bg-[url('/assets/svg/bg-flowers-light.svg')] opacity-80 bg-cover bg-center z-0 pointer-events-none" />
        <h2 className="text-center relative z-10 text-3xl text-primary font-dmSerifText">
          Pourquoi avoir recours à Mihrab ?
        </h2>
        <div className="bg-secondary gap-2 flex justify-center items-center flex-wrap w-fit p-2 rounded-md z-10">
          <Button
            className={clsx(
              "rounded-sm font-normal",
              profileSelected === "imam"
                ? "bg-primary text-secondary font-medium"
                : "bg-transparent text-primary",
            )}
            onPress={() => handleProfileChange("imam")}
          >
            Imam
          </Button>
          <Button
            className={clsx(
              "rounded-sm font-normal",
              profileSelected === "mosque"
                ? "bg-primary text-secondary font-medium"
                : "bg-transparent text-primary",
            )}
            onPress={() => handleProfileChange("mosque")}
          >
            Mosquée
          </Button>
        </div>
        <div className="flex w-full justify-evenly items-center flex-wrap gap-6 text-primary z-10">
          {profileSelected === "imam" ? (
            <>
              <div className="max-w-[370px] p-8 bg-primary rounded-md text-secondary space-y-4">
                <div className="relative flex items-center rounded-full w-16 h-16 bg-black/50 p-2">
                  <Image
                    alt="clock"
                    className="absolute left-[-12px] top-0"
                    height={64}
                    src="/assets/svg/clock-lightgreen.svg"
                    width={64}
                  />
                </div>
                <h3 className="text-lg font-medium font-dmSerifText">
                  Gain de temps
                </h3>
                <p className="text-sm">
                  Trouvez et gérez facilement les candidats grâce à Mihrab.
                  Évitez les longs processus et recrutez plus rapidement et
                  efficacement.
                </p>
              </div>
              <div className="max-w-[370px] p-8 bg-primary rounded-md text-secondary space-y-4">
                <div className="relative flex items-center rounded-full w-16 h-16 bg-black/50 p-2">
                  <Image
                    alt="network"
                    className="absolute left-[-12px] top-0"
                    height={64}
                    src="/assets/svg/network-lightgreen.svg"
                    width={64}
                  />
                </div>
                <h3 className="text-lg font-medium font-dmSerifText">
                  Accès à un large réseau d&apos;imams
                </h3>
                <p className="text-sm">
                  Réseau d&apos;imams qualifiés dans toute la France, maximisant
                  vos chances de recruter le candidat idéal pour votre mosquée.
                </p>
              </div>
              <div className="max-w-[370px] p-8 bg-primary rounded-md text-secondary space-y-4">
                <div className="relative flex items-center rounded-full w-16 h-16 bg-black/50 p-2">
                  <Image
                    alt="files"
                    className="absolute left-[-12px] top-0"
                    height={64}
                    src="/assets/svg/files-lightgreen.svg"
                    width={64}
                  />
                </div>
                <h3 className="text-lg font-medium font-dmSerifText">
                  Gestion simplifiée des candidatures
                </h3>
                <p className="text-sm">
                  Suivez les candidatures, organisez des entretiens et
                  communiquez avec les candidats en toute simplicité.
                </p>
              </div>
            </>
          ) : (
            <>
              <div className="max-w-[370px] p-8 bg-primary rounded-md text-secondary space-y-4">
                <div className="relative flex items-center rounded-full w-16 h-16 bg-black/50 p-2">
                  <Image
                    alt="clock"
                    className="absolute left-[-12px] top-0"
                    height={64}
                    src="/assets/svg/clock-lightgreen.svg"
                    width={64}
                  />
                </div>
                <h3 className="text-lg font-medium font-dmSerifText">
                  Gain de temps
                </h3>
                <p className="text-sm">
                  Trouvez facilement des missions autour de vous grâce à Mihrab.
                  Ne perdez plus de temps à chercher des mosquées, désormais
                  réalisez une recherche et trouvez rapidement ce que vous
                  convient.
                </p>
              </div>
              <div className="max-w-[370px] p-8 bg-primary rounded-md text-secondary space-y-4">
                <div className="relative flex items-center rounded-full w-16 h-16 bg-black/50 p-2">
                  <Image
                    alt="network"
                    className="absolute left-[-12px] top-0"
                    height={64}
                    src="/assets/svg/network-lightgreen.svg"
                    width={64}
                  />
                </div>
                <h3 className="text-lg font-medium font-dmSerifText">
                  Accès à un large réseau de responsables de Mosquées
                </h3>
                <p className="text-sm">
                  Réseau de responsables de mosquées qualifiés dans toute la
                  France, maximisant vos chances de trouver l&apos;emploi idéal
                  à proximité de chez vous.
                </p>
              </div>
              <div className="max-w-[370px] p-8 bg-primary rounded-md text-secondary space-y-4">
                <div className="relative flex items-center rounded-full w-16 h-16 bg-black/50 p-2">
                  <Image
                    alt="files"
                    className="absolute left-[-12px] top-0"
                    height={64}
                    src="/assets/svg/files-lightgreen.svg"
                    width={64}
                  />
                </div>
                <h3 className="text-lg font-medium font-dmSerifText">
                  Gestion simplifiée des candidatures
                </h3>
                <p className="text-sm">
                  Suivez les candidatures, préparez vos entretiens et
                  communiquez avec les responsables de mosquées en toute
                  simplicité.
                </p>
              </div>
            </>
          )}
        </div>
      </Section>
      <Faq />
    </div>
  );
}
