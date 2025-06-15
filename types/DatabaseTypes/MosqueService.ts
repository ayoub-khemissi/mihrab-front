export const MosqueService = {
  ABLUTIONS: "ablutions",
  WOMEN_SPACE: "women_space",
  CHILDREN_CLASSES: "children_classes",
  ADULT_CLASSES: "adult_classes",
  JANAZA: "janaza",
  PARKING: "parking",
  AID_PRAYER: "aid_prayer",
} as const;

export type MosqueService = (typeof MosqueService)[keyof typeof MosqueService];
