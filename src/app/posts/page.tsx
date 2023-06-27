import Post from "../../types/post"
import PostCard from "@/components/PostCard"

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
			<ul>
				{posts.map((post) => (
					<PostCard
						key={post.id}
						title={post.title}
						content={post.content}
						author={post.author}
					/>
				))}
			</ul>
		</div>
	)
}

export default PostPage
