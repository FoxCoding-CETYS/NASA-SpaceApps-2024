import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

export const authOptions: NextAuthOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                user: { label: "user", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                const { user, password } = credentials || { user: '', password: '' };
                const farmer = { user, password };
                try {
                    const response = await axios.post("lo que tenga que ir", farmer);
                    if (response.status === 200 && response.data) {
                        const { message } = response.data;
                        return {
                            id: farmer.user,
                            username: message.username,
                            email: message.Email,
                            cel: message.Cel,
                        };
                    }
                    return null;
                } catch (error) {
                    return null;
                }
            }
        })
    ],
    callbacks: {
        async signIn({ user }) {
            return !!user;
        },
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.firstName = user.username;
                token.email = user.email;
                token.cel = user.cel;
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.user.id = token.id as string;
                session.user.id = token.username as string;
                session.user.email = token.email as string;
                session.user.cel = token.cel as string;
            }
            return session;
        },
        async redirect({ url, baseUrl }) {
            return baseUrl;
        },
    },
    pages: {
        signIn: '/login', 
    }
};