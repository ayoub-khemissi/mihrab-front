export const ContractTypeEnum = {
  PERMANENT: "permanent",
  FIXED_TERM: "fixed_term",
  OCCASIONAL: "occasional",
} as const;

export type ContractTypeEnum =
  (typeof ContractTypeEnum)[keyof typeof ContractTypeEnum];
