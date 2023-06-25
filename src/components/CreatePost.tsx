"use client"

import { useState, FormEvent } from "react"
import { useSession } from "next-auth/react"
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies"

type PropTypes = {
	token: RequestCookie | undefined
}

const CreatePost = ({ token }: PropTypes) => {
	const [title, setTitle] = useState("")
	const [content, setContent] = useState("")
	const { data: session } = useSession()
	const userId = session?.user.id
	console.log("USERID", userId)

	const handleSubmit = async (event: FormEvent) => {
		event.preventDefault()

		const newPost = {
			title,
			content,
		}

		try {
			const response = await fetch(
				`http://127.0.0.1:8000/users/${userId}/posts`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						"Authorization": `Bearer ${token?.value}`,
					},
					body: JSON.stringify(newPost),
				}
			)

			if (response.ok) {
				console.log("OK!")
			} else {
				console.error("Error")
			}
		} catch (error) {
			console.error("An error occurred creating the post", error)
		} finally {
			setTitle("")
			setContent("")
		}
	}

	return (
		<div className='max-w-md mx-auto'>
			<h1 className='text-2xl font-bold mb-4'>Create a New Blog Post</h1>
			<form onSubmit={handleSubmit} className='space-y-4'>
				<div>
					<label htmlFor='title' className='block font-semibold mb-1'>
						Title
					</label>
					<input
						type='text'
						id='title'
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						className='border border-gray-300 px-3 py-2 w-full rounded'
						required
					/>
				</div>
				<div>
					<label
						htmlFor='content'
						className='block font-semibold mb-1'
					>
						Content
					</label>
					<textarea
						id='content'
						value={content}
						onChange={(e) => setContent(e.target.value)}
						className='border border-gray-300 px-3 py-2 w-full rounded'
						rows={6}
						required
					></textarea>
				</div>
				<button
					type='submit'
					className='bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600'
				>
					Create Post
				</button>
			</form>
		</div>
	)
}

export default CreatePost
