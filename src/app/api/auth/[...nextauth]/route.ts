import NextAuth from "next-auth"
import EmailProvider from "next-auth/providers/email"
import GithubProvider from "next-auth/providers/github"
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import clientPromise from "@/lib/mongodb"
import { Adapter } from "next-auth/adapters"

// All requests to /api/auth/* (signIn, callback, signOut, etc.) will automatically be handled by NextAuth.js.

export const authOptions = {
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
	adapter: MongoDBAdapter(clientPromise) as Adapter,
	// callbacks: {
	// 	async signIn({ user }: any) {
	// 		// Called when a user signs in
	// 		try {
	// 			const client = await clientPromise
	// 			const db = client.db("profile_post")
	// 			const collection = db.collection("users")

	// 			const existingUser = await collection.findOne({
	// 				email: user.email,
	// 			})

	// 			if (!existingUser) {
	// 				await collection.insertOne({
	// 					email: user.email,
	// 					name: user.name,
	// 					// Additional user data
	// 				})
	// 			}
	// 		} catch (error) {
	// 			console.log(error)
	// 			throw new Error("Failed to create user in the database.")
	// 		}

	// 		return true // Return true to allow sign in
	// 	},
	// },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
