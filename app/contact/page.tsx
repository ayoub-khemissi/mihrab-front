"use client";

import { Button } from "@heroui/button";
import { Input, Textarea } from "@heroui/input";

import Section from "@/components/section";

export default function Contact() {
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
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="flex flex-col gap-2">
            <label
              className="text-xs font-bold text-primary uppercase"
              htmlFor="email"
            >
              Adresse email
            </label>
            <Input
              className="bg-transparent border-b border-gray-200 rounded-none px-0 py-2 placeholder:text-gray-400 focus:ring-0 focus:border-primary"
              id="email"
              name="email"
              placeholder="exemple@mosquee.fr"
              type="email"
            />
          </div>
          <div className="flex flex-col gap-2 relative">
            <label
              className="text-xs font-bold text-primary uppercase"
              htmlFor="subject"
            >
              Sujet
            </label>
            <div className="relative">
              <Input
                className="relative bg-transparent border-b border-gray-200 rounded-none px-0 py-2 placeholder:text-gray-400 focus:ring-0 focus:border-primary"
                id="subject"
                name="subject"
                placeholder="L'objet de votre message"
                type="text"
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label
              className="text-xs font-bold text-primary uppercase"
              htmlFor="message"
            >
              Message
            </label>
            <div className="relative">
              <Textarea
                className="relative bg-transparent border-b border-gray-200 rounded-none px-0 py-2 placeholder:text-gray-400 focus:ring-0 focus:border-primary resize"
                id="message"
                name="message"
                placeholder="Dites-nous ce que vous souhaitez !"
              />
            </div>
          </div>
          <Button
            className="bg-primary text-secondary py-3 rounded-md font-normal"
            type="submit"
          >
            Envoyer
          </Button>
        </form>
      </Section>
    </>
  );
}
