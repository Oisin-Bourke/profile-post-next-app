import NextAuth, { Session, User, Account } from "next-auth"
import EmailProvider from "next-auth/providers/email"
import GithubProvider from "next-auth/providers/github"
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import clientPromise from "@/lib/mongodb"
import { Adapter } from "next-auth/adapters"

// All requests to /api/auth/* (signIn, callback, signOut, etc.) will automatically be handled by NextAuth.js.

interface SessionParams {
	session: Session
	user: User
	token: any
}

export const authOptions = {
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
		async session({ session, user }: SessionParams) {
			if (session) {
				session.user.id = user.id
			}

			return session
		},
	},
	session: {
		// force to use jwt
		// strategy: "jwt",
	},
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
