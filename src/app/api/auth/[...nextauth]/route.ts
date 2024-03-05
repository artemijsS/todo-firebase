import NextAuth, { AuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import { LinksEnum } from "@/enums";
import { auth } from "@/firebase/config";
import { signInWithEmailAndPassword, UserCredential } from "@firebase/auth";
import { JWT } from "next-auth/jwt";

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
                    email: token.email,
                    emailVerified: token.emailVerified,
                    photoURL: token.photoURL,
                    providerId: token.providerId,
                    metadata: token.metadata
                }
            }
        },
        jwt: ({ token, user }: { token: JWT, user: any }) => {
            if (user) {
                return {
                    ...token,
                    email: user.email,
                    emailVerified: user.emailVerified,
                    photoURL: user.photoURL,
                    providerId: user.providerId,
                    metadata: user.metadata
                };
            }
            return token;
        },
    }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }