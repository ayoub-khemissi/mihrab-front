import { UserRoleEnum, UserStatusEnum } from "./Database";

export interface CustomJwtPayload {
  email: string | null;
  id: bigint | null;
  role: UserRoleEnum | null;
  status: UserStatusEnum | null;
}
