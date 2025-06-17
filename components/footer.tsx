"use client";

import { Link } from "@heroui/link";
import { useEffect, useState } from "react";
import { FaFacebook, FaInstagram, FaXTwitter } from "react-icons/fa6";

import { Logo } from "./icons";

export const Footer = () => {
  const [year, setYear] = useState<string>("");

  useEffect(() => {
    const yearCalc = new Date().getFullYear();

    setYear(yearCalc.toString());
  }, []);

  return (
    <footer className="container mx-auto max-w-7xl">
      <div className="relative w-full bg-primary xl:rounded-xl p-8 xl:p-12 shadow-lg overflow-hidden">
        <div className="absolute left-0 top-0 h-full w-full bg-[url('/assets/svg/bg-flowers-light.svg')] opacity-10 bg-cover bg-center z-0 pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-start gap-10 justify-between">
          <div className="flex flex-col items-center md:items-start gap-3 min-w-[180px]">
            <Link className="flex justify-start items-center gap-1" href="/">
              <Logo type="light" />
            </Link>
            <span className="text-secondary/80 text-sm mt-2 text-center md:text-left">
              Mihrab - Plateforme de mise en relation Imams & Mosquées
            </span>
          </div>
          <div className="flex flex-col gap-3 min-w-[180px]">
            <h3 className="text-secondary font-semibold mb-1">Liens utiles</h3>
            <ul className="flex flex-col gap-1 text-secondary/90 text-sm">
              <li>
                <Link
                  className="text-secondary/80 hover:text-secondary"
                  href="/"
                >
                  Accueil
                </Link>
              </li>
              <li>
                <Link
                  className="text-secondary/80 hover:text-secondary"
                  href="/about"
                >
                  À propos
                </Link>
              </li>
              <li>
                <Link
                  className="text-secondary/80 hover:text-secondary"
                  href="/faq"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  className="text-secondary/80 hover:text-secondary"
                  href="/contact"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div className="flex flex-col gap-3 min-w-[180px]">
            <h3 className="text-secondary font-semibold mb-1">
              Informations légales
            </h3>
            <ul className="flex flex-col gap-1 text-secondary/90 text-sm">
              <li>
                <Link
                  className="text-secondary/80 hover:text-secondary"
                  href="/terms-of-service"
                >
                  Conditions d&apos;utilisation
                </Link>
              </li>
              <li>
                <Link
                  className="text-secondary/80 hover:text-secondary"
                  href="/privacy-policy"
                >
                  Politique de confidentialité
                </Link>
              </li>
            </ul>
          </div>
          <div className="flex flex-col gap-3 min-w-[180px]">
            <h3 className="text-secondary font-semibold mb-1">Suivez-nous</h3>
            <div className="flex gap-3 mt-1">
              <Link
                aria-label="X"
                className="hover:scale-110 transition-transform text-white"
                href="https://x.com/mihrabapp"
                rel="noopener noreferrer"
                target="_blank"
              >
                <FaInstagram size={24} />
              </Link>
              <Link
                aria-label="X"
                className="hover:scale-110 transition-transform text-white"
                href="https://x.com/mihrabapp"
                rel="noopener noreferrer"
                target="_blank"
              >
                <FaXTwitter size={24} />
              </Link>
              <Link
                aria-label="Facebook"
                className="hover:scale-110 transition-transform text-white"
                href="https://facebook.com/mihrabapp"
                rel="noopener noreferrer"
                target="_blank"
              >
                <FaFacebook size={24} />
              </Link>
            </div>
          </div>
        </div>
        <div className="relative z-10 mt-10 border-t border-secondary/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-secondary/80 max-w-7xl mx-auto">
          <span>{`© ${year} Mihrab. Tous droits réservés.`}</span>
          <span>Design & développement : Mihrab</span>
        </div>
      </div>
    </footer>
  );
};
