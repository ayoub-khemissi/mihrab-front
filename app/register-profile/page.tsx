"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Loading from "@/components/loading";
import { UserRoleEnum } from "@/types/Database/Enums/UserRoleEnum";
import RegisterProfileMosqueManager from "@/components/register-profile-mosque-manager";
import RegisterProfileImam from "@/components/register-profile-imam";

export default function RegisterProfilePage() {
  const router = useRouter();
  const [role, setRole] = useState<UserRoleEnum>(UserRoleEnum.NONE);

  useEffect(() => {
    const role = localStorage.getItem("role");

    if (role !== UserRoleEnum.IMAM && role !== UserRoleEnum.MOSQUE_MANAGER) {
      router.push("/role-selection");

      return;
    }
    setRole(role as UserRoleEnum);
  }, []);

  if (role === UserRoleEnum.NONE) {
    return <Loading />;
  }

  return role === UserRoleEnum.IMAM ? (
    <RegisterProfileImam />
  ) : (
    <RegisterProfileMosqueManager />
  );
}
