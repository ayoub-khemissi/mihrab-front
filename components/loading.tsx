"use client";

import { FaSpinner } from "react-icons/fa6";

import Section from "./section";

export default function Loading() {
  return (
    <Section
      fullWidth
      className="flex items-center justify-center h-screen z-50"
    >
      <FaSpinner className="w-12 h-12 animate-spin text-primary" />
    </Section>
  );
}
