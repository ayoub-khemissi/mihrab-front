import { RiwayaEnum } from "../Enums/RiwayaEnum";
import { HizbHifzEnum } from "../Enums/HizbHifzEnum";

export type JobOfferQuranReading = {
  job_offer_id: string;
  riwaya: RiwayaEnum;
  hizb_hifz: HizbHifzEnum;
  tajweed_mastery: boolean;
  ijazah: boolean;
  created_at: string;
};
