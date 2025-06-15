import { UserRole, UserStatus } from "./DatabaseTypes";

export interface CustomJwtPayload {
  email: string | null;
  id: bigint | null;
  role: UserRole | null;
  status: UserStatus | null;
}
