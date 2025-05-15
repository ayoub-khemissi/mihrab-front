"use client";

import "@/styles/globals.css";
import clsx from "clsx";
import { Suspense } from "react";

import { Providers } from "./providers";

import { fontBeVietnamPro, fontDMSerifText } from "@/config/fonts";
import { Header } from "@/components/header";
import Container from "@/components/container";
import { Footer } from "@/components/footer";
import Loading from "@/components/loading";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
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
          <Suspense fallback={<Loading />}>
            <Header />
            <Container>{children}</Container>
            <Footer />
          </Suspense>
        </Providers>
      </body>
    </html>
  );
}
