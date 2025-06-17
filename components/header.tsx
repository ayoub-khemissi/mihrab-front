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
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/dropdown";
import { addToast } from "@heroui/toast";

import { Logo } from "@/components/icons";
import { User } from "@/types/DatabaseTypes/User";
import { UserRole } from "@/types/DatabaseTypes/UserRole";
import { fetchWrapper } from "@/lib/Fetcher";
import getResponseCodeMessage from "@/utils/ResponseCodesMessages";

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

  const isImam = user?.role === UserRole.IMAM;
  const isMosqueManager = user?.role === UserRole.MOSQUE_MANAGER;
  const isAdmin = user?.role === UserRole.ADMIN;

  const disconnect = async () => {
    setIsMenuOpen(false);

    const response = await fetchWrapper("/logout", "POST");

    if (response?.ok) {
      localStorage.removeItem("user");
      router.push("/");
      setUser(null);

      addToast({
        title: "Déconnexion réussie",
        description: "Vous avez été déconnecté.",
        color: "primary",
        timeout: 3000,
        shouldShowTimeoutProgress: true,
      });
    } else {
      const responseData = await response?.json();
      const code = responseData?.code;

      addToast({
        title: "Erreur lors de la déconnexion",
        description: getResponseCodeMessage(code),
        color: "danger",
        timeout: 3000,
        shouldShowTimeoutProgress: true,
      });
    }
  };

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
              {isImam && (
                <>
                  <Link
                    className="text-primary text-sm font-medium gap-2"
                    href="/job-offers"
                  >
                    <span className="text-primary text-sm font-medium">
                      Offres d&apos;emploi
                    </span>
                  </Link>
                  <Link
                    className="text-primary text-sm font-medium gap-2"
                    href="/applications"
                  >
                    <span className="text-primary text-sm font-medium">
                      Mes candidatures
                    </span>
                  </Link>
                  <div className="w-0.5 h-8 bg-black/5" />
                </>
              )}
              {isMosqueManager && (
                <>
                  <Link
                    className="text-primary text-sm font-medium gap-2"
                    href="/imams"
                  >
                    <span className="text-primary text-sm font-medium">
                      Trouver un Imam
                    </span>
                  </Link>
                  <Link
                    className="text-primary text-sm font-medium gap-2"
                    href="/publish"
                  >
                    <span className="text-primary text-sm font-medium">
                      Publier une offre
                    </span>
                  </Link>
                  <div className="w-0.5 h-8 bg-black/5" />
                </>
              )}
              {isAdmin && (
                <>
                  <Link
                    className="text-primary text-sm font-medium gap-2"
                    href="/users"
                  >
                    <span className="text-primary text-sm font-medium">
                      Gestion des utilisateurs
                    </span>
                  </Link>
                  <div className="w-0.5 h-8 bg-black/5" />
                </>
              )}
              {user && (
                <Dropdown>
                  <DropdownTrigger>
                    <Button
                      disableRipple
                      className="text-primary text-sm font-medium gap-2 bg-transparent border-none shadow-none"
                      startContent={
                        <FaUser className="text-primary text-sm font-medium" />
                      }
                      variant="light"
                    >
                      {user.first_name && user.last_name
                        ? `${user.first_name} ${user.last_name}`
                        : "Mon profil"}
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu aria-label="Profil">
                    <DropdownItem
                      key="profile"
                      onClick={() => router.push("/profile")}
                    >
                      Mon profil
                    </DropdownItem>
                    <DropdownItem
                      key="logout"
                      color="danger"
                      onClick={disconnect}
                    >
                      Déconnexion
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              )}
            </>
          ) : (
            <div className="hidden md:flex gap-6 justify-start items-center text-nowrap">
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
              <div className="w-0.5 h-8 bg-black/5" />
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
          <NavbarMenuItem className="flex flex-col gap-4">
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
                      href="/job-offers"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Offres d&apos;emploi
                    </Link>
                    <Link
                      className="text-secondary text-xl font-medium w-full"
                      href="/applications"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Mes candidatures
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
                      href="/imams"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Trouver un Imam
                    </Link>
                    <Link
                      className="text-secondary text-xl font-medium w-full"
                      href="/publish"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Publier une offre
                    </Link>
                  </>
                )}
                {isAdmin && (
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
                      href="/users"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Gestion des utilisateurs
                    </Link>
                  </>
                )}
                <Link
                  className="text-secondary text-xl font-medium w-full"
                  href="/profile"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Mon profil
                </Link>
                <button
                  className="text-secondary text-xl font-medium w-full text-left"
                  type="button"
                  onClick={disconnect}
                >
                  Déconnexion
                </button>
              </>
            ) : (
              <>
                <Link
                  className="text-secondary text-xl font-medium w-full"
                  href="/login"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Se connecter
                </Link>
              </>
            )}
          </NavbarMenuItem>
          <NavbarMenuItem className="flex flex-col gap-4">
            <Link
              className="text-secondary text-xl font-medium w-full"
              href="/contact"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            <Link
              className="text-secondary text-xl font-medium w-full"
              href="/faq"
              onClick={() => setIsMenuOpen(false)}
            >
              FAQ
            </Link>
            <Link
              className="text-secondary text-xl font-medium w-full"
              href="/terms-of-service"
              onClick={() => setIsMenuOpen(false)}
            >
              Conditions d&apos;utilisation
            </Link>
            <Link
              className="text-secondary text-xl font-medium w-full"
              href="/privacy-policy"
              onClick={() => setIsMenuOpen(false)}
            >
              Politique de confidentialité
            </Link>
          </NavbarMenuItem>
        </NavbarMenu>
      </Navbar>
    </div>
  );
};
