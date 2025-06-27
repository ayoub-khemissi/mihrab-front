import { Riwaya, HizbHifz } from ".";

export interface JobOfferQuranReading {
  riwaya: Riwaya;
  hizb_hifz: HizbHifz;
  tajweed_mastery: boolean;
  ijazah: boolean;
  created_at: number;
  updated_at: number;
}
