export const ImamSkillEnum = {
  FIVE_PRAYERS: "five_prayers",
  JUMUAH: "jumuah",
  AID_PRAYER: "aid_prayer",
  TARAWIH: "tarawih",
  QURAN_CLASSES: "quran_classes",
  CONFERENCES: "conferences",
  QUESTIONS_ANSWERS: "questions_answers",
} as const;

export type ImamSkillEnum = (typeof ImamSkillEnum)[keyof typeof ImamSkillEnum];
