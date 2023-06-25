import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/route"
import CreatePost from "@/components/CreatePost"

const UserPage = async () => {
	const session = await getServerSession(authOptions)

	if (!session) {
		return <p>You can't access this page!</p>
	}

	return (
		<div>
			<h1>User Page - Private</h1>
			<p>Signed in as {session?.user?.email}</p>
			<CreatePost />
		</div>
	)
}

export default UserPage
