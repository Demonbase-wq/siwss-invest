import NextAuth, { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { type DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";
import { getUser } from "@/lib/airtable";
import axios from "axios";

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `auth`, when using JWT sessions */
  interface JWT {
    /** OpenID ID Token */
    // first_name?: string,
    // last_name?: string,
    // phone?: string,
    // country?: string,
    // state?: string,
    // address?: string,
    // transactions?: string[],
    // account_number?: number,
    // balance?: number,
    // bonus?: number,
    // dob?: string,
    // username?: string,
    // // id?: string,
    kyc: string;
    role: string;
  }
}

declare module "next-auth" {
  /**
   * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */

  interface Session {
    user: {
      /** The user's postal address. */
      // email?: string,
      // last_name?: string,
      // first_name?: string,
      // isVerified?: string,
      role?: string;
      kyc?: string;
      /**
       * By default, TypeScript merges new interface properties and overwrites existing ones.
       * In this case, the default session user properties will be overwritten,
       * with the new ones defined above. To keep the default session user properties,
       * you need to add them back into the newly declared interface.
       */
    } & DefaultSession["user"];
  }

  interface User {
    id?: string;
    role?: string;
    kyc?: string;
  }
  // interface User {
  //     id?: string,
  //     fields: {
  //         email: string,
  //         last_name: string,
  //         first_name: string,
  //         img: string,
  //         kyc: string,
  //         role: string,
  //     }
  // }
}

const config = {
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.AUTH_SECRET,
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: {},
        password: {},
        code: {},
        timezone: {},
        route: {},
      },
      authorize: async (credentials) => {
        try {
          if (credentials.route === "/admin/login") {
            const response = await fetch(`https://www.swisspipsai.com/api/admin-login`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                email: credentials.email,
                password: credentials.password,
              }),
            });
            const json = await response.json();
            const user = json.user;
            return user;
          } else {
            const response = await fetch(`https://www.swisspipsai.com/api/verify`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                email: credentials.email,
                code: credentials.code,
                timezone: credentials.timezone,
              }),
            });
            const json = await response.json();
            const user = json.user;
            return user;
          }
        } catch (error) {
          console.error("Error in authorize:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.kyc = user.kyc as string;
        token.role = user.role as string;
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (token) {
        // Fetch the latest user data from the database
        const response = await axios.get(
          `https://www.swisspipsai.com/api/session-user?id=${token.sub}`
        );
        const user = await response.data;
        session.user.id = token.sub as string;
        session.user.kyc = user?.kyc as string;
        session.user.role = user?.role as string;
      }
      return session;
    },
  },
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(config);
