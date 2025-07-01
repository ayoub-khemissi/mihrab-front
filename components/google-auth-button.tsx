"use client";

import { Button } from "@heroui/button";
import { FaGoogle } from "react-icons/fa6";

import { useGoogleAuth } from "@/lib/useGoogleAuth";

interface GoogleAuthButtonProps {
  text?: string;
  className?: string;
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

export const GoogleAuthButton = ({
  text = "Continuer avec Google",
  className = "flex items-center justify-center gap-2 bg-black/5 text-primary border-none py-3 hover:bg-primary hover:text-secondary",
  onSuccess,
  onError,
}: GoogleAuthButtonProps) => {
  const { handleGoogleSignIn, isLoading } = useGoogleAuth();

  const handleClick = async () => {
    try {
      await handleGoogleSignIn();
      onSuccess?.();
    } catch (error) {
      onError?.(
        error instanceof Error
          ? error.message
          : "Une erreur est survenue lors de la connexion via Google",
      );
    }
  };

  return (
    <Button
      className={className}
      disabled={isLoading}
      isLoading={isLoading}
      type="button"
      onPress={handleClick}
    >
      <FaGoogle className="text-xl" /> {text}
    </Button>
  );
};
