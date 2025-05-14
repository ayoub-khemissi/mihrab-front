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
    <html suppressHydrationWarning lang="en">
      <head>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <meta content="#FFF2EA" name="theme-color" />
        <meta
          content="Mihrab - Plateforme de gestion des imams et mosquées"
          name="description"
        />
        <meta content="Mihrab" name="author" />
        <meta
          content="Mihrab, imams, mosquées, gestion, emploi, imam, mosquée, mosque, relations mosquées"
          name="keywords"
        />
      </head>
      <body
        className={clsx(
          "min-h-screen bg-secondary font-beVietnamPro antialiased",
          fontBeVietnamPro.variable,
          fontDMSerifText.variable,
        )}
      >
        <Providers themeProps={{ attribute: "class", defaultTheme: "light" }}>
          <Suspense fallback={<Loading />}>
            <div className="relative flex flex-col">
              <Header />
              <Container>{children}</Container>
              <Footer />
            </div>
          </Suspense>
        </Providers>
      </body>
    </html>
  );
}
