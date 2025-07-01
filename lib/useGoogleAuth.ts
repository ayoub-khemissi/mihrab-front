import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef } from "react";
import { addToast } from "@heroui/toast";

import { loginWithGoogle, registerWithGoogle } from "./Fetcher";

import getResponseCodeMessage from "@/utils/ResponseCodesMessages";
import { LocalStorageKeys } from "@/types/LocalStorageKeys";

export const useGoogleAuth = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const isProcessingRef = useRef(false);

  useEffect(() => {
    const handleBackendAuth = async () => {
      if (
        status === "authenticated" &&
        session?.googleJwt &&
        session?.user?.email &&
        !isProcessingRef.current
      ) {
        isProcessingRef.current = true;

        try {
          const loginResponse = await loginWithGoogle(
            session.user.email,
            session.googleJwt,
          );

          if (loginResponse?.ok) {
            const responseData = await loginResponse.json();
            const code = responseData?.code;
            const data = responseData?.data;

            localStorage.setItem(
              LocalStorageKeys.USER_DATA,
              JSON.stringify(data),
            );

            addToast({
              title: "Connexion réussie",
              description: getResponseCodeMessage(code),
              color: "success",
              timeout: 3000,
              shouldShowTimeoutProgress: true,
            });
            router.push("/home");
          } else {
            const registerResponse = await registerWithGoogle(
              session.user.email,
              session.googleJwt,
            );

            if (registerResponse?.ok) {
              const responseData = await registerResponse.json();
              const code = responseData?.code;
              const data = responseData?.data;

              localStorage.setItem(
                LocalStorageKeys.USER_DATA,
                JSON.stringify(data),
              );

              addToast({
                title: "Inscription réussie",
                description: getResponseCodeMessage(code),
                color: "success",
                timeout: 3000,
                shouldShowTimeoutProgress: true,
              });
              router.push("/role-selection");
            } else {
              const responseData = await registerResponse?.json();
              const code = responseData?.code;

              addToast({
                title: "Erreur",
                description: getResponseCodeMessage(code),
                color: "danger",
                timeout: 3000,
                shouldShowTimeoutProgress: true,
              });
            }
          }
        } catch {
          addToast({
            title: "Erreur",
            description:
              "Une erreur est survenue lors de la communication avec le serveur.",
            color: "danger",
            timeout: 3000,
            shouldShowTimeoutProgress: true,
          });
        } finally {
          isProcessingRef.current = false;
        }
      }
    };

    handleBackendAuth();
  }, [session, status, router]);

  const handleGoogleSignIn = useCallback(async () => {
    try {
      const result = await signIn("google", {
        callbackUrl: "/home",
        redirect: false,
      });

      if (result?.error) {
        addToast({
          title: "Erreur de connexion",
          description:
            "Une erreur est survenue lors de la connexion via Google.",
          color: "danger",
          timeout: 3000,
          shouldShowTimeoutProgress: true,
        });

        return;
      }

      if (result?.ok) {
      }
    } catch {
      addToast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la connexion via Google.",
        color: "danger",
        timeout: 3000,
        shouldShowTimeoutProgress: true,
      });
    }
  }, []);

  const handleGoogleSignOut = useCallback(async () => {
    try {
      await signOut({ callbackUrl: "/" });
      localStorage.removeItem(LocalStorageKeys.USER_DATA);

      addToast({
        title: "Déconnexion réussie",
        description: "Vous êtes maintenant déconnecté.",
        color: "success",
        timeout: 3000,
        shouldShowTimeoutProgress: true,
      });
    } catch {
      addToast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la déconnexion.",
        color: "danger",
        timeout: 3000,
        shouldShowTimeoutProgress: true,
      });
    }
  }, []);

  return {
    session,
    status,
    handleGoogleSignIn,
    handleGoogleSignOut,
    isAuthenticated: !!session,
    isLoading: status === "loading",
  };
};
