"use client";

import "@/styles/globals.css";
import clsx from "clsx";
import { Suspense } from "react";
import { ReCaptchaProvider } from "next-recaptcha-v3";
import { ToastProvider } from "@heroui/toast";

import { Providers } from "./providers";

import { fontBeVietnamPro, fontDMSerifText } from "@/config/fonts";
import { Header } from "@/components/header";
import Container from "@/components/container";
import { Footer } from "@/components/footer";
import Loading from "@/components/loading";
import ScrollToTop from "@/components/scroll-to-top";
import { NEXT_PUBLIC_GOOGLE_RECAPTCHA_SITE_KEY } from "@/config/config";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      className="scroll-smooth text-balance light"
      lang="fr"
      style={{ colorScheme: "light" }}
    >
      <head>
        <title>
          Mihrab | Plateforme de recherche d&apos;emploi pour Imams et Mosquées
        </title>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <meta content="#FFF2EA" name="theme-color" />
        <meta
          content="Mihrab - Plateforme de recherche d'emploi pour Imams et Mosquées"
          name="description"
        />
        <meta content="Mihrab" name="author" />
        <meta
          content="Mihrab, imams, mosquées, recherche, emploi, imam, mosquée, mosque, relations mosquées"
          name="keywords"
        />
      </head>
      <body
        className={clsx(
          "bg-secondary font-beVietnamPro antialiased",
          fontBeVietnamPro.variable,
          fontDMSerifText.variable,
        )}
      >
        <Providers themeProps={{ attribute: "class", defaultTheme: "light" }}>
          <ReCaptchaProvider
            reCaptchaKey={NEXT_PUBLIC_GOOGLE_RECAPTCHA_SITE_KEY}
          >
            <ToastProvider maxVisibleToasts={3} placement="bottom-center" />
            <Suspense fallback={<Loading />}>
              <Header />
              <Container>{children}</Container>
              <Footer />
              <ScrollToTop />
            </Suspense>
          </ReCaptchaProvider>
        </Providers>
      </body>
    </html>
  );
}
