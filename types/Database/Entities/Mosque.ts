import { MosqueStatusEnum } from "../Enums/MosqueStatusEnum";

export type Mosque = {
  id: string;
  user_id: string;
  name: string;
  picture: string | null;
  organization_name: string | null;
  address: string;
  city: string;
  zip_code: string;
  country: string;
  latitude: number | null;
  longitude: number | null;
  phone: string | null;
  max_capacity: number | null;
  status: MosqueStatusEnum;
  supporting_document: string;
  created_at: string;
  updated_at: string | null;
};
