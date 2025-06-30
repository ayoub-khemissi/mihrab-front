import { InvitationStatusEnum } from "../Enums/InvitationStatusEnum";

export type Invitation = {
  job_offer_id: string;
  imam_id: string;
  message: string;
  status: InvitationStatusEnum;
  created_at: string;
  updated_at: string | null;
};
