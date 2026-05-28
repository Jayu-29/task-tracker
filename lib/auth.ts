import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "@/lib/db";
import {
  usersTable,
  accountsTable,
  sessionsTable,
  verificationTokensTable,
} from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: DrizzleAdapter(db, {
    usersTable,
    accountsTable,
    sessionsTable,
    verificationTokensTable,
  }),
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      if (session.user) {
        const dbUser = await db.query.usersTable.findFirst({
          where: eq(usersTable.id, user.id),
        });
        session.user.id = user.id;
        session.user.role = dbUser?.role ?? "EMPLOYEE";
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
});