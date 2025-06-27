import { Riwaya, HizbHifz } from ".";

export interface ImamQuranReading {
  riwaya: Riwaya;
  hizb_hifz: HizbHifz;
  tajweed_mastery: boolean;
  ijazah: boolean;
  created_at: number;
}
