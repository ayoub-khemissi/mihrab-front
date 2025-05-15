"use client";

import { Accordion, AccordionItem } from "@heroui/accordion";
import { Link } from "@heroui/link";

import Section from "@/components/section";

export default function Faq() {
  return (
    <Section>
      <h1 className="text-3xl text-primary font-dmSerifText text-center pb-6 pt-10">
        Questions les plus fréquentes
      </h1>
      <div>
        <Accordion>
          <AccordionItem
            key="1"
            aria-label="Qui peut déposer une offre d'emploi sur Mihrab ?"
            title="Qui peut déposer une offre d'emploi sur Mihrab ?"
          >
            <p className="text-primary bg-secondary">
              Sur Mihrab, vous pouvez déposer une offre d&apos;emploi si vous
              êtes responsable d&apos;une mosquée. Pour cela, vous devez vous
              inscrire en renseignant vos informations générales ainsi que les
              informations de votre mosquée. Rendez-vous sur la page d&apos;
              <Link href="/register">inscription</Link> pour déposer une offre
              d&apos;emploi.
            </p>
          </AccordionItem>
          <AccordionItem
            key="2"
            aria-label="Pourquoi avoir recours à Mihrab plutôt que mon réseau personnel ?"
            title="Pourquoi avoir recours à Mihrab plutôt que mon réseau personnel ?"
          >
            <p className="text-primary">
              Chez Mihrab, vous pouvez avoir accès à un large réseau
              d&apos;imams et de mosquées. En effet, Mihrab est une plateforme
              qui permet de connecter les imams et les mosquées de manière
              simple et rapide. Vous pouvez rechercher des imams et des mosquées
              en fonction de vos besoins et de vos critères. Alors
              n&apos;attendez plus et{" "}
              <Link href="/register">inscrivez-vous</Link> !
            </p>
          </AccordionItem>
          <AccordionItem
            key="3"
            aria-label="Est-ce que je peux avoir confiance aux profils que vous proposez sur Mihrab ?"
            title="Est-ce que je peux avoir confiance aux profils que vous proposez sur Mihrab ?"
          >
            <p className="text-primary">
              Nous sélectionnons les profils qui correspondent aux critères que
              vous avez renseigné lors de votre inscription. Nous vérifions
              également les profils des imams et des mosquées pour vous assurer
              des matchs pertinents et de qualité.
            </p>
          </AccordionItem>
        </Accordion>
      </div>
    </Section>
  );
}
