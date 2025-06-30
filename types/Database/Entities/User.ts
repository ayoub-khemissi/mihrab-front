import { UserRoleEnum } from "../Enums/UserRoleEnum";
import { UserStatusEnum } from "../Enums/UserStatusEnum";

export type User = {
  id: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
  photo: string | null;
  status: UserStatusEnum;
  role: UserRoleEnum;
  alert_email: boolean;
  alert_sms: boolean;
  alert_browser: boolean;
  alert_push: boolean;
  marketing_email: boolean;
  alert_browser_subscription: object | null;
  alert_push_subscription: object | null;
  reset_password_code: string | null;
  verify_phone_code: number | null;
  phone_candidate: string | null;
  verify_phone_code_created_at: string | null;
  created_at: string;
  updated_at: string | null;
};
