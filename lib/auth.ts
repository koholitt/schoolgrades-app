import { betterAuth } from "better-auth";
import { prisma8Adapter } from "better-auth-adapter-prisma8"; //community adapter for prisma v8
import { db } from "@/prisma/db"; // your prisma client instance

export const auth = betterAuth({
  database: prisma8Adapter(db, {
    provider: "postgresql", // or "mysql", "sqlite", ...etc
    schema: "public",
  }),

  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
  },
});
