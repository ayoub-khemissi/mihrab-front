"use client";

import { Link } from "@heroui/link";

import Section from "@/components/section";

export default function ErrorPage() {
  return (
    <Section className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-2xl font-bold text-primary">
        Une erreur est survenue !
      </h2>
      <Link className="mt-4" href="/">
        Retour à la page d&apos;accueil
      </Link>
    </Section>
  );
}
