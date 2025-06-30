import { MosqueServiceEnum } from "../Enums/MosqueServiceEnum";

export type MosqueService = {
  mosque_id: string;
  service_name: MosqueServiceEnum;
  created_at: string;
  updated_at: string | null;
};
