import Post from "../../types/post"

async function getData() {
	const result = await fetch("http://127.0.0.1:8000/posts")

	if (!result.ok) {
		throw new Error("Failed to fetch")
	}

	return result.json() as unknown as Post[]
}

const PostPage = async () => {
	const posts = await getData()

	return (
		<div>
			<h1>Posts Page - Public</h1>
			<ul>
				{posts.map((post) => (
					<li key={post.id}>
						{post.title} - {post.content}
					</li>
				))}
			</ul>
		</div>
	)
}

export default PostPage
