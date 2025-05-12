import { MosqueService } from "./mosque-service";
import { MosqueSocialMedia } from "./mosque-social-media";

export type Mosque = {
  id: number;
  user_id: number;
  name: string;
  picture: string;
  organization_name: string;
  address: string;
  city: string;
  zip_code: string;
  country: string;
  latitude: number;
  longitude: number;
  phone: string;
  max_capacity: number;
  status: "pending" | "approved" | "rejected";
  supporting_document: string;
  services: MosqueService[];
  social_media: MosqueSocialMedia[];
  created_at: number;
  updated_at: number;
};
