"use client";

import Loading from "@/components/loading";
import HalfPageBg from "@/components/half-page-bg";
import Section from "@/components/section";

export default function ShowcasePage() {
  return (
    <>
      <title>Showcase | Mihrab</title>
      <Section>
        <div className="h-[700px]">
          <HalfPageBg />
        </div>
        <Loading />
      </Section>
    </>
  );
}
