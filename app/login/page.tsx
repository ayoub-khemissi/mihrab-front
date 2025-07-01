"use client";

import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Link } from "@heroui/link";
import { Checkbox } from "@heroui/checkbox";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { addToast } from "@heroui/toast";

import { fetchWrapper } from "@/lib/Fetcher";
import getResponseCodeMessage from "@/utils/ResponseCodesMessages";
import Section from "@/components/section";
import HalfPageBg from "@/components/half-page-bg";
import { GoogleAuthButton } from "@/components/google-auth-button";
import { LocalStorageKeys } from "@/types/LocalStorageKeys";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const response = await fetchWrapper(`/login/classical`, "POST", {
      email,
      password,
    });

    if (response?.ok) {
      const responseData = await response?.json();
      const code = responseData?.code;
      const data = responseData?.data;

      localStorage.setItem(LocalStorageKeys.USER_DATA, JSON.stringify(data));
      addToast({
        title: "Connexion réussie",
        description: getResponseCodeMessage(code),
        color: "success",
        timeout: 3000,
        shouldShowTimeoutProgress: true,
      });
      router.push("/home");
    } else {
      const data = await response?.json();
      const code = data?.code;

      addToast({
        title: "Erreur lors de la connexion",
        description: getResponseCodeMessage(code),
        color: "danger",
        timeout: 3000,
        shouldShowTimeoutProgress: true,
      });
    }
    setLoading(false);
  };

  return (
    <>
      <title>Se connecter | Mihrab</title>
      <Section className="min-h-screen flex w-full gap-12">
        <div className="flex flex-col items-center h-full xl:w-1/2 w-full">
          <h1 className="text-4xl md:text-4xl text-center xl:text-left text-primary font-dmSerifText mb-8 w-full max-w-md">
            Se connecter
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
                Adresse email
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
                htmlFor="password"
              >
                Mot de passe
              </label>
              <div className="relative">
                <Input
                  isRequired
                  className="relative bg-transparent border-b border-gray-200 rounded-none px-0 py-2 placeholder:text-gray-400 focus:ring-0 focus:border-primary"
                  id="password"
                  name="password"
                  placeholder="••••••••••"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
              disabled={loading}
              isLoading={loading}
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
            <GoogleAuthButton />
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
