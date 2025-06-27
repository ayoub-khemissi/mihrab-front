"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Loading from "@/components/loading";
import { UserRole } from "@/types/DatabaseTypes";
import RegisterProfileMosqueManager from "@/components/register-profile-mosque-manager";
import RegisterProfileImam from "@/components/register-profile-imam";

export default function RegisterProfilePage() {
  const router = useRouter();
  const [role, setRole] = useState<UserRole>(UserRole.NONE);

  useEffect(() => {
    const role = localStorage.getItem("role");

    if (role !== UserRole.IMAM && role !== UserRole.MOSQUE_MANAGER) {
      router.push("/role-selection");

      return;
    }
    setRole(role as UserRole);
  }, []);

  if (role === UserRole.NONE) {
    return <Loading />;
  }

  return role === UserRole.IMAM ? (
    <RegisterProfileImam />
  ) : (
    <RegisterProfileMosqueManager />
  );
}
