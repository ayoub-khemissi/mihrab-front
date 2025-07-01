/* eslint-disable @typescript-eslint/no-unused-vars, unused-imports/no-unused-imports */
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    googleJwt?: string;
    user?: {
      email?: string | null;
      name?: string | null;
      image?: string | null;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    googleJwt?: string;
  }
}
