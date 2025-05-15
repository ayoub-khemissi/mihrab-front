"use client";

import Faq from "@/components/faq";

export default function FaqPage() {
  return (
    <>
      <title>Questions les plus fréquentes | Mihrab</title>
      <meta
        content="Questions les plus fréquentes sur Mihrab"
        name="description"
      />
      <div className="min-h-screen flex w-full gap-12">
        <Faq />
      </div>
    </>
  );
}
