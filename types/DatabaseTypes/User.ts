import { UserRole, UserStatus } from ".";

export type User = {
  id: number;
  email: string;
  first_name: string | null;
  last_name: string | null;
  role: UserRole;
  status: UserStatus;
  photo: string | null;
  alert_email: boolean;
  alert_sms: boolean;
  alert_browser: boolean;
  alert_push: boolean;
  marketing_email: boolean;
  alert_browser_subscription: string | null;
  alert_push_subscription: string | null;
  reset_password_code: string | null;
  verify_phone_code: number | null;
  phone_candidate: string | null;
  verify_phone_code_created_at: number | null;
  created_at: number;
  updated_at: number | null;
};
