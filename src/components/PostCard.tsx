type Props = {
	title: string
	content: string
	author?: string
}

const PostCard = ({ title, content, author }: Props) => {
	return (
		<div className='m-4 max-w-sm mx-auto bg-white shadow-md rounded-lg'>
			<div className='p-4'>
				<h3 className='text-xl font-medium text-gray-800 mb-2'>
					{title}
				</h3>
				<p className='text-gray-600 mb-4'>{content}</p>
				<div className='flex items-center'>
					{author ? (
						<span className='text-gray-700 font-medium'>
							{author}
						</span>
					) : null}
				</div>
			</div>
		</div>
	)
}

export default PostCard
