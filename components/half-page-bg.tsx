"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const HalfPageBg = () => {
  const [imageNumber, setImageNumber] = useState<number | null>(null);

  useEffect(() => {
    const randomImageNumber = Math.floor(Math.random() * 13) + 1;

    setImageNumber(randomImageNumber);
  }, []);

  return (
    <div className="relative flex flex-col items-center rounded-xl gap-y-10 justify-center p-10 h-full bg-tertiary overflow-hidden">
      <div className="absolute left-0 top-0 h-full w-full bg-[url('/assets/svg/bg-flowers-light.svg')] opacity-80 bg-cover bg-center z-0 pointer-events-none" />
      <div className="relative w-full h-full rounded-xl overflow-hidden z-10">
        {imageNumber && (
          <Image
            fill
            alt="Mosque"
            className="object-cover rounded-xl transition-transform duration-300"
            src={`/assets/bg/mosque-${imageNumber}.jpg`}
            style={{ objectPosition: "center" }}
          />
        )}
      </div>
    </div>
  );
};

export default HalfPageBg;
