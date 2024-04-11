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

  interface Profile {
    iss: string,
    azp: string,
    aud: string,
    sub: string,
    email: string,
    email_verified?: boolean,
    at_hash: string,
    name: string,
    picture: string,
    given_name: string,
    family_name: string,
    iat: number,
    exp: number
  }
}