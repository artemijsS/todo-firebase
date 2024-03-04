import NextAuth, { AuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import { LinksEnum } from "@/enums";
import { auth } from "@/firebase/config";
import { signInWithEmailAndPassword, UserCredential } from "@firebase/auth";

export const authOptions: AuthOptions = {
    session: {
        strategy: "jwt",
        maxAge: 2 * 24 * 60 * 60,
        updateAge: 2 * 24 * 60 * 60,
    },
    pages: {
        signIn: LinksEnum.login
    },
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials): Promise<any> {
                if (!credentials) return null;
                return await signInWithEmailAndPassword(auth, credentials.email || "", credentials.password || "").then((userCredentials: UserCredential) => {
                    if (!userCredentials.user) return null;
                    return userCredentials.user
                }).catch(() => null)
            }
        })
    ],
    callbacks: {
        session: ({session, token}) => {
            return {
                ...session,
                user: {
                    ...session.user,
                    ...token
                }
            }
        },
        jwt: ({ token, user }) => {
            if (user) {
                return {
                    ...token,
                    ...user
                };
            }
            return token;
        },
    }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }