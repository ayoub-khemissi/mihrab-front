export type ImamSkill = {
  skill:
    | "five_prayers"
    | "jumuah"
    | "aid_prayer"
    | "tarawih"
    | "quran_classes"
    | "conferences"
    | "questions_answers";
  created_at: number;
  updated_at: number | null;
};
