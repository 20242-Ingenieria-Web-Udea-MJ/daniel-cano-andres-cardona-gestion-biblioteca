import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      name?: string;
      image?: string;
      role?: string;
      createdAt: string;
      deleted: boolean;
      emailVerified: boolean;
      enabled: boolean;
      updatedAt: string;
    };
  }
}
