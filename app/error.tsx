"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-2xl font-bold text-primary">
        Une erreur est survenue !
      </h2>
      <button className="mt-4" onClick={() => reset()}>
        Reessayer
      </button>
    </div>
  );
}
