"use client";

import { Button } from "@heroui/button";
import { Input, Textarea } from "@heroui/input";
import { useState } from "react";
import { useReCaptcha } from "next-recaptcha-v3";
import { addToast } from "@heroui/toast";

import Section from "@/components/section";
import { fetchWrapper } from "@/lib/Fetcher";

export default function ContactPage() {
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const { executeRecaptcha } = useReCaptcha();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !subject || !content) {
      addToast({
        title: "Champs manquants",
        description: "Veuillez remplir tous les champs.",
        color: "danger",
        timeout: 3000,
        shouldShowTimeoutProgress: true,
      });

      return;
    }

    setLoading(true);

    try {
      const token = await executeRecaptcha("contact");

      const response = await fetchWrapper("/contact", "POST", {
        email,
        subject,
        content,
        recaptchaToken: token,
      });

      if (response?.ok) {
        const responseData = await response.json();

        addToast({
          title: "Message envoyé",
          description:
            responseData.msg || "Votre message a été envoyé avec succès.",
          color: "success",
          timeout: 3000,
          shouldShowTimeoutProgress: true,
        });

        setEmail("");
        setSubject("");
        setContent("");
      } else {
        const errorData = await response?.json();

        addToast({
          title: "Erreur",
          description:
            errorData.msg ||
            "Une erreur est survenue lors de l'envoi du message.",
          color: "danger",
          timeout: 3000,
          shouldShowTimeoutProgress: true,
        });
      }
    } catch {
      addToast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'envoi du message.",
        color: "danger",
        timeout: 3000,
        shouldShowTimeoutProgress: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <title>Contact | Mihrab</title>
      <meta content="Écrivez-nous sur Mihrab" name="description" />
      <Section className="min-h-screen flex flex-col items-center w-full">
        <h1 className="text-4xl md:text-4xl text-center xl:text-left text-primary font-dmSerifText mb-8 w-full max-w-md pt-10">
          Écrivez-nous
        </h1>
        <form
          className="w-full max-w-md bg-secondary p-0 flex flex-col gap-6"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col gap-2">
            <label
              className="text-xs font-bold text-primary uppercase"
              htmlFor="email"
            >
              Adresse email *
            </label>
            <Input
              isRequired
              className="bg-transparent border-b border-gray-200 rounded-none px-0 py-2 placeholder:text-gray-400 focus:ring-0 focus:border-primary"
              id="email"
              name="email"
              placeholder="exemple@mosquee.fr"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2 relative">
            <label
              className="text-xs font-bold text-primary uppercase"
              htmlFor="subject"
            >
              Sujet *
            </label>
            <div className="relative">
              <Input
                isRequired
                className="relative bg-transparent border-b border-gray-200 rounded-none px-0 py-2 placeholder:text-gray-400 focus:ring-0 focus:border-primary"
                id="subject"
                name="subject"
                placeholder="L'objet de votre message"
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label
              className="text-xs font-bold text-primary uppercase"
              htmlFor="message"
            >
              Message *
            </label>
            <div className="relative">
              <Textarea
                isRequired
                className="relative bg-transparent border-b border-gray-200 rounded-none px-0 py-2 placeholder:text-gray-400 focus:ring-0 focus:border-primary resize-y"
                id="message"
                minRows={4}
                name="message"
                placeholder="Dites-nous ce que vous souhaitez !"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </div>
          </div>
          <Button
            className="bg-primary text-secondary py-3 rounded-md font-normal"
            disabled={loading}
            isLoading={loading}
            type="submit"
          >
            Envoyer
          </Button>
          <p className="w-full text-center text-sm text-gray-500">
            Ce site est protégé par reCAPTCHA et les{" "}
            <a
              className="text-inherit text-sm underline underline-offset-2"
              href="https://policies.google.com/privacy"
              rel="noreferrer"
              target="_blank"
            >
              Politique de confidentialité
            </a>{" "}
            et{" "}
            <a
              className="text-inherit text-sm underline underline-offset-2"
              href="https://policies.google.com/terms"
              rel="noreferrer"
              target="_blank"
            >
              Conditions d&apos;utilisation
            </a>{" "}
            s&apos;appliquent.
          </p>
        </form>
      </Section>
    </>
  );
}
