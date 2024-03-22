import User from "@/models/User";
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import { Session } from "next-auth";
import { connectToDataBase } from "@/utils/conn";

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

                try {
                    const response = await fetch("http://localhost:3000/api/user/signin", {
                        method: "POST",
                        body: JSON.stringify(credentials),
                        headers: { "Content-Type": "application/json" }
                    });


                    if (!response.ok) return null;

                    const data = await response.json();

                    return {
                        name: data.name,
                        email: data.email,
                        image: data.avatar,
                        id: data.id
                    }
                } catch (error) {
                    return null;
                }
            }
        })
    ],
    callbacks: {
        async session({ session }): Promise<Session> {
            await connectToDataBase();

            const sessionUser = await User.findOne({
                email: session.user.email
            })

            session.user.id = String(sessionUser._id);
            session.user.saved = sessionUser.saved;

            return session;
        },
    }
})

export { handler as GET, handler as POST }