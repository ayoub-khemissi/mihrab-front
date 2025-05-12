"use client";

import { Link } from "@heroui/link";

import Section from "@/components/section";

export default function NotFound() {
  return (
    <div className="flex flex-col flex-1 w-full min-h-screen">
      <Section className="flex flex-1 h-full min-h-0 flex-col items-center justify-center w-full">
        <h1 className="text-3xl text-primary font-dmSerifText text-center">
          Page non trouvée
        </h1>
        <Link className="mt-4" href="/">
          Retour à la page d&apos;accueil
        </Link>
      </Section>
    </div>
  );
}
