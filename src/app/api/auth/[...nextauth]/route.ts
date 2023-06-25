import NextAuth, { Session, User, Account, NextAuthOptions } from "next-auth"
import EmailProvider from "next-auth/providers/email"
import GithubProvider from "next-auth/providers/github"
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import clientPromise from "@/lib/mongodb"
import { Adapter } from "next-auth/adapters"
import jwt from "jsonwebtoken"

// All requests to /api/auth/* (signIn, callback, signOut, etc.) will automatically be handled by NextAuth.js.

const secret = "yellow"

export const authOptions: NextAuthOptions = {
	adapter: MongoDBAdapter(clientPromise) as Adapter,
	providers: [
		EmailProvider({
			server: process.env.EMAIL_SERVER,
			from: process.env.EMAIL_FROM,
		}),
		GithubProvider({
			clientId: process.env.GITHUB_CLIENT_ID || "",
			clientSecret: process.env.GITHUB_SECRET || "",
		}),
	],
	callbacks: {
		async session({ session, token }) {
			if (session) {
				session.user.id = token.sub
			}
			return session
		},
	},
	session: {
		strategy: "jwt",
	},
	jwt: {
		encode: async ({ secret, token }) => {
			return jwt.sign(token as object, secret)
		},
		decode: async ({ secret, token }) => {
			return jwt.verify(token, secret)
		},
	},
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
