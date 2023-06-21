"use client"

import { SessionProvider } from "next-auth/react"

type PropsTypes = {
	children: React.ReactNode
}

const Provider = ({ children }: PropsTypes) => {
	return <SessionProvider>{children}</SessionProvider>
}

export default Provider
