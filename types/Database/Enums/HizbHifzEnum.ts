export const HizbHifzEnum = {
  ZERO_TEN: "zero_ten",
  TEN_TWENTY: "ten_twenty",
  TWENTY_THIRTY: "twenty_thirty",
  THIRTY_FORTY: "thirty_forty",
  FORTY_FIFTY: "forty_fifty",
  FIFTY_SIXTY: "fifty_sixty",
  HAFIZ: "hafiz",
} as const;

export type HizbHifzEnum = (typeof HizbHifzEnum)[keyof typeof HizbHifzEnum];
