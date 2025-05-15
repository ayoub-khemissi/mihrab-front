"use client";

import { Link } from "@heroui/link";
import { useEffect, useState } from "react";

import { Logo } from "./icons";

export const Footer = () => {
  const [year, setYear] = useState<string>("");

  useEffect(() => {
    const yearCalc = new Date().getFullYear();

    setYear(yearCalc.toString());
  }, []);

  return (
    <footer className="container mx-auto max-w-7xl relative w-full bg-gradient-to-b from-primary via-primary to-primary py-14 px-8 mt-12 rounded-xl shadow-lg overflow-hidden">
      <div className="absolute left-0 top-0 h-full w-full bg-[url('/assets/svg/bg-flowers-light.svg')] opacity-10 bg-cover bg-center z-0 pointer-events-none" />
      <div className="relative z-10 max-w-7xl mx-auto flex flex-col md:flex-row md:items-start gap-10 justify-between">
        <div className="flex flex-col items-center md:items-start gap-3 min-w-[180px]">
          <Logo type="light" />
          <span className="text-secondary/80 text-sm mt-2 text-center md:text-left">
            Mihrab - Plateforme de mise en relation Imams & Mosquées
          </span>
        </div>
        <div className="flex flex-col gap-3 min-w-[180px]">
          <h3 className="text-secondary font-semibold mb-1">Liens utiles</h3>
          <ul className="flex flex-col gap-1 text-secondary/90 text-sm">
            <li>
              <Link className="text-secondary/80 hover:text-secondary" href="/">
                Accueil
              </Link>
            </li>
            <li>
              <Link
                className="text-secondary/80 hover:text-secondary"
                href="/a-propos"
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
                href="/mentions-legales"
              >
                Mentions légales
              </Link>
            </li>
            <li>
              <Link
                className="text-secondary/80 hover:text-secondary"
                href="/confidentialite"
              >
                Politique de confidentialité
              </Link>
            </li>
            <li>
              <Link
                className="text-secondary/80 hover:text-secondary"
                href="/cgu"
              >
                Conditions d’utilisation
              </Link>
            </li>
          </ul>
        </div>
        <div className="flex flex-col gap-3 min-w-[180px]">
          <h3 className="text-secondary font-semibold mb-1">Suivez-nous</h3>
          <div className="flex gap-3 mt-1">
            <a
              aria-label="Twitter"
              className="hover:scale-110 transition-transform"
              href="https://twitter.com/mihrabapp"
              rel="noopener noreferrer"
              target="_blank"
            >
              <svg fill="none" height="24" viewBox="0 0 24 24" width="24">
                <path
                  d="M22 5.924a8.2 8.2 0 0 1-2.357.646A4.117 4.117 0 0 0 21.448 4.1a8.224 8.224 0 0 1-2.606.996A4.107 4.107 0 0 0 11.034 9.03a11.654 11.654 0 0 1-8.457-4.287a4.106 4.106 0 0 0 1.27 5.482A4.073 4.073 0 0 1 2.8 9.07v.052a4.108 4.108 0 0 0 3.292 4.025a4.1 4.1 0 0 1-1.852.07a4.11 4.11 0 0 0 3.834 2.85A8.233 8.233 0 0 1 2 19.13a11.616 11.616 0 0 0 6.29 1.844c7.547 0 11.675-6.155 11.675-11.49c0-.175-.004-.35-.012-.523A8.18 8.18 0 0 0 22 5.924Z"
                  fill="#fff"
                  fillOpacity=".8"
                />
              </svg>
            </a>
            <a
              aria-label="Facebook"
              className="hover:scale-110 transition-transform"
              href="https://facebook.com/mihrabapp"
              rel="noopener noreferrer"
              target="_blank"
            >
              <svg fill="none" height="24" viewBox="0 0 24 24" width="24">
                <path
                  d="M22.675 0H1.325C.593 0 0 .593 0 1.326v21.348C0 23.406.593 24 1.325 24h11.495v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788c1.325 0 2.463.099 2.797.143v3.24h-1.92c-1.504 0-1.797.715-1.797 1.763v2.312h3.587l-.467 3.622h-3.12V24h6.116C23.406 24 24 23.406 24 22.674V1.326C24 .593 23.406 0 22.675 0"
                  fill="#fff"
                  fillOpacity=".8"
                />
              </svg>
            </a>
            <a
              aria-label="LinkedIn"
              className="hover:scale-110 transition-transform"
              href="https://linkedin.com/mihrabapp"
              rel="noopener noreferrer"
              target="_blank"
            >
              <svg fill="none" height="24" viewBox="0 0 24 24" width="24">
                <path
                  d="M20.447 20.452h-3.554v-5.569c0-1.327-.026-3.037-1.849-3.037c-1.851 0-2.132 1.445-2.132 2.939v5.667H9.358V9h3.414v1.561h.049c.476-.9 1.637-1.849 3.37-1.849c3.601 0 4.267 2.369 4.267 5.455v6.285ZM5.337 7.433a2.062 2.062 0 1 1 0-4.124a2.062 2.062 0 0 1 0 4.124ZM7.119 20.452H3.554V9h3.565v11.452ZM22.225 0H1.771C.792 0 0 .771 0 1.723v20.549C0 23.229.792 24 1.771 24h20.451C23.2 24 24 23.229 24 22.271V1.723C24 .771 23.2 0 22.225 0Z"
                  fill="#fff"
                  fillOpacity=".8"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
      <div className="relative z-10 mt-10 border-t border-secondary/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-secondary/80 max-w-7xl mx-auto">
        <span>{`© ${year} Mihrab. Tous droits réservés.`}</span>
        <span>Design & développement : Mihrab</span>
      </div>
    </footer>
  );
};
