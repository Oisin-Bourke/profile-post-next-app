"use client"

import Image from "next/image"
import { useSession } from "next-auth/react"

const imageStyle = {
	borderRadius: "50%",
	border: "1px solid #fff",
}

const ProfileImage = () => {
	const { data: session } = useSession()

	if (!session) {
		return null
	}

	return (
		<Image
			src={session?.user?.image || ""}
			alt='Profile image'
			width={75}
			height={75}
			style={imageStyle}
		/>
	)
}

export default ProfileImage
