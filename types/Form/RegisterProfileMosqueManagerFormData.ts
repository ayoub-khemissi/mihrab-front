import { MosqueManagerPositionEnum, MosqueServiceEnum } from "../Database";
import { Media } from "../Database/Entities/Media";

export interface RegisterProfileMosqueManagerFormData {
  mosqueName: string;
  mosquePicture?: Media | null;
  organizationName: string;
  address: string;
  city: string;
  zipCode: string;
  phone: string;
  maxCapacity: number;
  services: MosqueServiceEnum[];
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
  mosquePosition: MosqueManagerPositionEnum;
  supportingDocument?: Media | null;
}
