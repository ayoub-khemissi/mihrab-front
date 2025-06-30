import { MosqueManagerPositionEnum } from "../Enums/MosqueManagerPositionEnum";

export type ProfileMosqueManager = {
  user_id: string;
  position: MosqueManagerPositionEnum;
  created_at: string;
  updated_at: string | null;
};
