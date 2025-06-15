"use client";

import {
  Navbar,
  NavbarContent,
  NavbarBrand,
  NavbarMenuToggle,
  NavbarMenuItem,
  NavbarMenu,
} from "@heroui/navbar";
import clsx from "clsx";
import { Button } from "@heroui/button";
import { useEffect, useState } from "react";
import { Link } from "@heroui/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FaUser } from "react-icons/fa6";

import { Logo } from "@/components/icons";
import { User } from "@/types/EntityTypes/User";

export const Header = () => {
  const searchParams = useSearchParams();
  const [profileSelected, setProfileSelected] = useState(
    (searchParams.get("profile") as "imam" | "mosque") || "imam",
  );
  const [user, setUser] = useState<User | null>(null);

  const router = useRouter();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleProfileChange = (profile: "imam" | "mosque") => {
    setProfileSelected(profile);
    router.push(`/?profile=${profile}`, { scroll: false });
  };

  useEffect(() => {
    const profile = searchParams.get("profile");

    if (profile) {
      setProfileSelected(profile as "imam" | "mosque");
    }

    const localUser = localStorage.getItem("user");

    if (localUser) {
      setUser(JSON.parse(localUser));
    }
  }, [searchParams]);

  const isImam = user?.role === "imam";
  const isMosqueManager = user?.role === "mosque_manager";
  const isAdmin = user?.role === "admin";

  return (
    <div className="container mx-auto max-w-7xl">
      <Navbar
        className="py-4 bg-secondary fixed top-0 z-50 w-full xl:h-24 h-16"
        isMenuOpen={isMenuOpen}
        maxWidth="xl"
        onMenuOpenChange={setIsMenuOpen}
      >
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <Link className="flex justify-start items-center gap-1" href="/">
            <Logo />
          </Link>
        </NavbarBrand>
        <NavbarContent justify="end">
          {user ? (
            <>
              {!isImam && (
                <>
                  <Link
                    className="text-primary text-sm font-medium gap-2"
                    href="/job-offers"
                  >
                    <FaUser className="text-primary text-sm font-medium" />
                    <span className="text-primary text-sm font-medium">
                      Mosquées
                    </span>
                  </Link>
                  <Link
                    className="text-primary text-sm font-medium gap-2"
                    href="/apply"
                  >
                    <FaUser className="text-primary text-sm font-medium" />
                    <span className="text-primary text-sm font-medium">
                      Postuler
                    </span>
                  </Link>
                  <div className="w-0.5 h-auto bg-black/5" />
                </>
              )}
              {isMosqueManager && (
                <>
                  <Link
                    className="text-primary text-sm font-medium gap-2"
                    href="/home"
                  >
                    <FaUser className="text-primary text-sm font-medium" />
                    <span className="text-primary text-sm font-medium">
                      Accueil
                    </span>
                  </Link>
                  <div className="w-0.5 h-auto bg-black/5" />
                  <Link
                    className="text-primary text-sm font-medium gap-2"
                    href="/imam"
                  >
                    <FaUser className="text-primary text-sm font-medium" />
                    <span className="text-primary text-sm font-medium">
                      Imams
                    </span>
                  </Link>
                  <div className="w-0.5 h-auto bg-black/5" />
                  <Link
                    className="text-primary text-sm font-medium gap-2"
                    href="/publish"
                  >
                    <FaUser className="text-primary text-sm font-medium" />
                    <span className="text-primary text-sm font-medium">
                      Publier
                    </span>
                  </Link>
                  <div className="w-0.5 h-auto bg-black/5" />
                </>
              )}
              {isAdmin && (
                <>
                  <Link
                    className="text-primary text-sm font-medium gap-2"
                    href="/home"
                  >
                    <FaUser className="text-primary text-sm font-medium" />
                    <span className="text-primary text-sm font-medium">
                      Accueil
                    </span>
                  </Link>
                  <div className="w-0.5 h-auto bg-black/5" />
                </>
              )}
              <Link
                className="text-primary text-sm font-medium gap-2"
                href="/profile"
              >
                <FaUser className="text-primary text-sm font-medium" />
                <span className="text-primary text-sm font-medium">
                  {user.first_name && user.last_name
                    ? `${user.first_name} ${user.last_name}`
                    : "Mon profil"}
                </span>
              </Link>
            </>
          ) : (
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
                Je représente une Mosquée
              </Button>
              <div className="w-0.5 h-auto bg-black/5" />
              <Link
                className="text-primary text-sm font-medium gap-2"
                href="/login"
              >
                Se connecter
              </Link>
            </div>
          )}
          <NavbarMenuToggle className="md:hidden" />
        </NavbarContent>

        <NavbarMenu className="bg-primary/70 text-secondary gap-y-4 py-8">
          <NavbarMenuItem>
            {user ? (
              <>
                {isImam && (
                  <>
                    <Link
                      className="text-secondary text-xl font-medium w-full"
                      href="/home"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Accueil
                    </Link>
                    <Link
                      className="text-secondary text-xl font-medium w-full"
                      href="/mosque"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Mosquées
                    </Link>
                    <Link
                      className="text-secondary text-xl font-medium w-full"
                      href="/apply"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Postuler
                    </Link>
                  </>
                )}
                {isMosqueManager && (
                  <>
                    <Link
                      className="text-secondary text-xl font-medium w-full"
                      href="/home"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Accueil
                    </Link>
                    <Link
                      className="text-secondary text-xl font-medium w-full"
                      href="/imam"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Imams
                    </Link>
                    <Link
                      className="text-secondary text-xl font-medium w-full"
                      href="/publish"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Publier
                    </Link>
                  </>
                )}
                {isAdmin && (
                  <Link
                    className="text-secondary text-xl font-medium w-full"
                    href="/home"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Accueil
                  </Link>
                )}
                <Link
                  className="text-secondary text-xl font-medium w-full"
                  href="/profile"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Mon profil
                </Link>
              </>
            ) : (
              <Link
                className="text-secondary text-xl font-medium w-full"
                href="/login"
                onClick={() => setIsMenuOpen(false)}
              >
                Se connecter
              </Link>
            )}
          </NavbarMenuItem>
          <NavbarMenuItem>
            <Link
              className="text-secondary text-xl font-medium w-full"
              href="/contact"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
          </NavbarMenuItem>
          <NavbarMenuItem>
            <Link
              className="text-secondary text-xl font-medium w-full"
              href="/faq"
              onClick={() => setIsMenuOpen(false)}
            >
              FAQ
            </Link>
          </NavbarMenuItem>
        </NavbarMenu>
      </Navbar>
    </div>
  );
};
