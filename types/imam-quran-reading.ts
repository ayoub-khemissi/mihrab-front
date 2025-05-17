export type ImamQuranReading = {
  riwaya:
    | "hafs"
    | "warsh"
    | "qalun"
    | "al_duri"
    | "al_susi"
    | "shubah"
    | "khalaf";
  hizb_hifz:
    | "zero_ten"
    | "ten_twenty"
    | "twenty_thirty"
    | "thirty_forty"
    | "forty_fifty"
    | "fifty_sixty"
    | "hafiz";
  tajweed_mastery: boolean;
  ijazah: boolean;
  created_at: number;
};
