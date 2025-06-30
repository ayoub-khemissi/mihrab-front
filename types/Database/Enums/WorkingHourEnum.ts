export const WorkingHourEnum = {
  FULL_TIME: "full_time",
  PART_TIME: "part_time",
} as const;

export type WorkingHourEnum =
  (typeof WorkingHourEnum)[keyof typeof WorkingHourEnum];
