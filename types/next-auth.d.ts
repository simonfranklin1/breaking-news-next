import NextAuth, { DefaultSession } from "next-auth"
import { savedPost } from "./types";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      name: string;
      email: string;
      image: string;
      id: string;
      saved: savedPost[];
    } & DefaultSession["user"]
  }
}