import "./globals.css"
import { Inter } from "next/font/google"
import Header from "@/components/Header"
import Provider from "@/components/Provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
	title: "Profile Post",
	description: "Create posts about your work",
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang='en'>
			<body className={inter.className}>
				<Provider>
					<Header />
					<main>{children}</main>
				</Provider>
			</body>
		</html>
	)
}
