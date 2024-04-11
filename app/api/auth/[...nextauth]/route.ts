import User from "@/models/User";
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { Session } from "next-auth";
import { connectToDataBase } from "@/utils/conn";
import bcrypt from "bcryptjs";
import { generateUserName } from "@/utils/utils";

const handler = NextAuth({
    session: {
        strategy: "jwt"
    },
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
        CredentialsProvider({
            type: "credentials",
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials, req) {
                if (!credentials) {
                    return null
                }

                await connectToDataBase();

                const user = await User.findOne({ email: credentials.email }).select("+password");

                if (!user) {
                    return null
                }

                const validatePassword = await bcrypt.compare(credentials.password, user.password);

                if (!validatePassword) {
                    return null
                }

                return {
                    name: user.username,
                    email: user.email,
                    image: user.avatar,
                    id: user.id
                }
            }
        })
    ],
    callbacks: {
        async session({ session }): Promise<Session> {
            const sessionUser = await User.findOne({
                email: session.user.email
            }).select("+saved");

            session.user.id = String(sessionUser._id);
            session.user.saved = sessionUser.saved;

            return session;
        },
        async signIn({ account, profile }) {
            if (account?.provider === "google" && profile) {
                try {
                    await connectToDataBase();

                    const existingUser = await User.findOne({
                        email: profile.email
                    })

                    if (!existingUser) {
                        const username = generateUserName(profile?.name || "");

                        await User.create({
                            name: profile?.name,
                            email: profile?.email,
                            avatar: profile?.picture,
                            username: username
                        })
                    }

                    return true
                } catch (error) {
                    return false
                }
            }

            return true
        }
    }
})

export { handler as GET, handler as POST }