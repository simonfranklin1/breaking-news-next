import User from "@/models/User";
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import { Session } from "next-auth";
import { connectToDataBase } from "@/utils/conn";
import bcrypt from "bcryptjs";

const handler = NextAuth({
    session: {
        strategy: "jwt"
    },
    providers: [
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
    }
})

export { handler as GET, handler as POST }