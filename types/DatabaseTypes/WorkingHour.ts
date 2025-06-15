export const WorkingHour = {
  FULL_TIME: "full_time",
  PART_TIME: "part_time",
} as const;

export type WorkingHour = (typeof WorkingHour)[keyof typeof WorkingHour];
