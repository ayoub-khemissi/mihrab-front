import { HizbHifzEnum } from "../Enums/HizbHifzEnum";
import { RiwayaEnum } from "../Enums/RiwayaEnum";

export type QuranReading = {
  imam_id: string;
  riwaya: RiwayaEnum;
  hizb_hifz: HizbHifzEnum;
  tajweed_mastery: boolean;
  ijazah: boolean;
  created_at: string;
};
