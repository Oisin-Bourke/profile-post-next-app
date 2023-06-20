// Just test out route system here
// anything with page indicates a new page route
// make this a page that requires authorization
import Post from "../../types/post"

const postsData = [
	{ id: 1, title: "title 1", content: "content 1" },
	{ id: 2, title: "title 2", content: "content 2" },
	{ id: 3, title: "title 3", content: "content 3" },
]

async function getData() {
	const result = await fetch("http://127.0.0.1:8000/posts")

	if (!result.ok) {
		throw new Error("Failed to fetch")
	}

	return result.json() as unknown as Post[]
}

const PostsPage = async () => {
	const posts = await getData()

	return (
		<ul>
			{posts.map((post) => (
				<li key={post.id}>
					{post.title} - {post.content}
				</li>
			))}
		</ul>
	)
}

export default PostsPage
