import { MosqueManagerPosition, MosqueService } from "../DatabaseTypes";

import { Media } from "./Media";

export interface RegisterProfileMosqueManagerFormData {
  mosqueName: string;
  mosquePicture?: Media | null;
  organizationName: string;
  address: string;
  city: string;
  zipCode: string;
  phone: string;
  maxCapacity: number;
  services: MosqueService[];
  social: {
    website: string;
    instagram: string;
    facebook: string;
    youtube: string;
    twitter: string;
  };
  firstName: string;
  lastName: string;
  personalEmail: string;
  personalPhone: string;
  mosquePosition: MosqueManagerPosition;
  supportingDocument?: Media | null;
}
