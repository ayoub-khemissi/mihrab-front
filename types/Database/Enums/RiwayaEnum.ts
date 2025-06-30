export const RiwayaEnum = {
  HAFS: "hafs",
  WARSH: "warsh",
  QALUN: "qalun",
  AL_DURI: "al_duri",
  AL_SUSI: "al_susi",
  SHUBAH: "shubah",
  KHALAF: "khalaf",
} as const;

export type RiwayaEnum = (typeof RiwayaEnum)[keyof typeof RiwayaEnum];
