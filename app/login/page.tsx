"use client";

import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Link } from "@heroui/link";
import { Checkbox } from "@heroui/checkbox";
import { FaGoogle, FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { useState } from "react";

import Section from "@/components/section";
import HalfPageBg from "@/components/half-page-bg";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <title>Se connecter | Mihrab</title>
      <Section className="min-h-screen flex w-full gap-12">
        <div className="flex flex-col items-center h-full xl:w-1/2 w-full pt-10">
          <h1 className="text-4xl md:text-4xl text-center xl:text-left text-primary font-dmSerifText mb-8 w-full max-w-md">
            Se connecter
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
                htmlFor="password"
              >
                Mot de passe
              </label>
              <div className="relative">
                <Input
                  className="relative bg-transparent border-b border-gray-200 rounded-none px-0 py-2 placeholder:text-gray-400 focus:ring-0 focus:border-primary"
                  id="password"
                  name="password"
                  placeholder="••••••••••"
                  type={showPassword ? "text" : "password"}
                />
                <button
                  aria-label={
                    showPassword
                      ? "Masquer le mot de passe"
                      : "Afficher le mot de passe"
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-primary"
                  tabIndex={-1}
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                >
                  {showPassword ? (
                    <FaRegEyeSlash className="w-5 h-5" />
                  ) : (
                    <FaRegEye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>
            <Checkbox className="w-full accent-primary border-gray-200">
              Se souvenir de moi
            </Checkbox>
            <Button
              className="bg-primary text-secondary py-3 rounded-md font-normal"
              type="submit"
            >
              Me connecter
            </Button>
            <div className="flex items-center my-2">
              <hr className="flex-grow border-black/10" />
              <span className="mx-3 text-primary font-medium uppercase">
                ou
              </span>
              <hr className="flex-grow border-black/10" />
            </div>
            <Button
              className="flex items-center justify-center gap-2 bg-black/5 text-primary border-none py-3 hover:bg-primary hover:text-secondary"
              type="button"
            >
              <FaGoogle className="text-xl" /> Continuer avec Google
            </Button>
            <div className="flex justify-center mt-2">
              <Link
                className="text-primary underline underline-offset-2 text-base uppercase"
                href="/register"
              >
                Créer un compte
              </Link>
            </div>
          </form>
        </div>
        <div className="xl:w-1/2 hidden xl:block">
          <HalfPageBg />
        </div>
      </Section>
    </>
  );
}
