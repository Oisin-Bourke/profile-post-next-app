import NextAuth, { NextAuthOptions } from "next-auth"
import { JWT } from "next-auth/jwt"
import EmailProvider from "next-auth/providers/email"
import GithubProvider from "next-auth/providers/github"
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import clientPromise from "@/lib/mongodb"
import { Adapter } from "next-auth/adapters"
import jwt from "jsonwebtoken"

export const authOptions: NextAuthOptions = {
	adapter: MongoDBAdapter(clientPromise) as Adapter,
	providers: [
		EmailProvider({
			server: process.env.EMAIL_SERVER,
			from: process.env.EMAIL_FROM,
		}),
		GithubProvider({
			clientId: process.env.GITHUB_CLIENT_ID as string,
			clientSecret: process.env.GITHUB_SECRET as string,
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
		encode: async ({ secret, token}) => {
			return new Promise<string>((resolve, reject) => {
				jwt.sign(token as object, secret, (err, signedToken) => {
					if (err) {
						reject(err)
					} else {
						resolve(signedToken as string)
					}
				})
			})
		},
		decode: async ({ secret, token }) => {
			return new Promise<JWT|null>((resolve, reject) => {
				jwt.verify(token as string, secret, (err, verifiedToken) => {
					if (err) {
						reject(err)
					} else {
						resolve(verifiedToken as JWT)
					}
				})
			})
		},
	},
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
