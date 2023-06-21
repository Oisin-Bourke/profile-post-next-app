"use client"

import { useSession, signIn, signOut } from "next-auth/react"
import Image from "next/image"

const Login = () => {
	const { data: session } = useSession()

	console.log("SESSION", session)

	if (session) {
		return (
			<>
				Signed in as {session?.user?.email} <br />
				<button onClick={() => signOut()}>Sign out</button>
			</>
		)
	}
	return (
		<>
			Not signed in <br />
			<button onClick={() => signIn()}>Sign in</button>
		</>
	)
}

export default Login
