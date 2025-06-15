export const ContractType = {
  PERMANENT: "permanent",
  FIXED_TERM: "fixed_term",
  OCCASIONAL: "occasional",
} as const;

export type ContractType = (typeof ContractType)[keyof typeof ContractType];
