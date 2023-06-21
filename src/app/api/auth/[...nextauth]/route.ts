import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"

// All requests to /api/auth/* (signIn, callback, signOut, etc.) will automatically be handled by NextAuth.js.

export const authOptions = {
	providers: [
		GithubProvider({
			clientId: process.env.GITHUB_CLIENT_ID || "",
			clientSecret: process.env.GITHUB_SECRET || "",
		}),
		// ...add more providers
	],
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
