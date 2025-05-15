"use client";

import {
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarBrand,
} from "@heroui/navbar";
import clsx from "clsx";
import { Button } from "@heroui/button";
import { useEffect, useState } from "react";
import { Link } from "@heroui/link";
import { useRouter, useSearchParams } from "next/navigation";

import { CrossIcon, Logo, MenuIcon } from "@/components/icons";

export const Header = () => {
  const searchParams = useSearchParams();
  const [profileSelected, setProfileSelected] = useState(
    (searchParams.get("profile") as "imam" | "mosque") || "mosque",
  );

  const router = useRouter();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
    <div className="container mx-auto max-w-7xl">
      <HeroUINavbar
        className="py-4 bg-secondary fixed top-0 z-50 w-full xl:h-24 h-16"
        maxWidth="xl"
      >
        <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
          <NavbarBrand as="li" className="gap-3 max-w-fit">
            <Link className="flex justify-start items-center gap-1" href="/">
              <Logo />
            </Link>
          </NavbarBrand>
        </NavbarContent>
        <NavbarContent justify="end">
          <div className="hidden md:flex gap-6 justify-start text-nowrap">
            <Button
              className={clsx(
                "border-primary border-2 rounded-sm font-normal",
                profileSelected === "imam"
                  ? "bg-primary text-secondary font-medium"
                  : "bg-transparent text-primary",
              )}
              onPress={() => {
                handleProfileChange("imam");
              }}
            >
              Je suis Imam
            </Button>
            <Button
              className={clsx(
                "border-primary border-2 rounded-sm font-normal",
                profileSelected === "mosque"
                  ? "bg-primary text-secondary font-medium"
                  : "bg-transparent text-primary",
              )}
              onPress={() => {
                handleProfileChange("mosque");
              }}
            >
              Je suis une Mosquée
            </Button>
            <div className="w-0.5 h-auto bg-black/5" />
            <Link className="text-primary text-sm font-medium" href="/login">
              Se connecter
            </Link>
          </div>
          <div className="flex md:hidden items-center">
            <button
              aria-label={mobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
              className="p-2 rounded focus:outline-none focus:ring-2 focus:ring-primary z-50"
              onClick={() => setMobileMenuOpen((open) => !open)}
            >
              {mobileMenuOpen ? <CrossIcon /> : <MenuIcon />}
            </button>
          </div>
        </NavbarContent>
      </HeroUINavbar>
      {mobileMenuOpen && (
        <div className="fixed top-0 z-40 flex md:hidden w-full h-full">
          <nav className="bg-primary/95 text-secondary w-full h-full flex flex-col items-center justify-center">
            <div className="flex flex-col justify-center items-center text-center gap-6">
              <Link
                className="text-secondary text-2xl font-medium"
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
              >
                Se connecter
              </Link>
            </div>
          </nav>
        </div>
      )}
    </div>
  );
};
