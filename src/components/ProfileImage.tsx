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

	const imageSrc = session?.user?.image

	const firstChar = (email: string) => {
		return email.charAt(0).toLocaleUpperCase()
	}

	return (
		<>
			{imageSrc ? (
				<Image
					src={imageSrc}
					alt='Profile image'
					width={75}
					height={75}
					className='h-12 w-12 rounded-full'
				/>
			) : (
				<div className='flex items-center justify-center h-12 w-12 bg-gray-500 rounded-full'>
					<span className='text-white text-2xl font-bold'>
						{firstChar(session?.user?.email || '')}
					</span>
				</div>
			)}
		</>
	)
}

export default ProfileImage
