export type JobOfferQuranReading = {
  riwaya:
    | "hafs"
    | "warsh"
    | "qalun"
    | "al_duri"
    | "al_susi"
    | "shubah"
    | "khalaf";
  hizb_hifz: "0-10" | "11-20" | "21-30" | "31-40" | "41-50" | "51-60" | "hafiz";
  tajweed_mastery: boolean;
  ijazah: boolean;
  created_at: number;
  updated_at: number;
};
