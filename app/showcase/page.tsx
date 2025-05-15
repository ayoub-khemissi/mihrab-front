"use client";

import Loading from "@/components/loading";
import HalfPageBg from "@/components/half-page-bg";

export default function Showcase() {
  return (
    <>
      <title>Showcase | Mihrab</title>
      <div className="min-h-screen flex pt-32 pb-20 w-full gap-12">
        <HalfPageBg />
        <Loading />
      </div>
    </>
  );
}
