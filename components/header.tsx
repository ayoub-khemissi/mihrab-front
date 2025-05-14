"use client";

import {
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarBrand,
} from "@heroui/navbar";
import NextLink from "next/link";
import clsx from "clsx";
import { Button } from "@heroui/button";
import { useState } from "react";
import { Link } from "@heroui/link";

import { CrossIcon, Logo, MenuIcon } from "@/components/icons";

export const Header = () => {
  const [profileSelected, setProfileSelected] = useState("mosque");

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <HeroUINavbar
        className="py-4 bg-secondary fixed top-0 z-50 w-full h-24"
        maxWidth="xl"
      >
        <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
          <NavbarBrand as="li" className="gap-3 max-w-fit">
            <NextLink
              className="flex justify-start items-center gap-1"
              href="/"
            >
              <Logo />
            </NextLink>
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
              onPress={() => setProfileSelected("imam")}
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
              onPress={() => setProfileSelected("mosque")}
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
        <div className="fixed z-20 flex md:hidden w-full h-full">
          <nav className="bg-primary/90 text-secondary w-full h-full flex flex-col items-center justify-center gap-6 p-8">
            <div>
              <Link
                className="text-secondary text-2xl font-medium w-full"
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
              >
                Se connecter
              </Link>
            </div>
          </nav>
        </div>
      )}
    </>
  );
};
