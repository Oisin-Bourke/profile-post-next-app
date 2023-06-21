import Link from "next/link"
import Login from "./Login"
import ProfileImage from "./ProfileImage"

const Header = () => {
	return (
		<header className='flex h-24 flex-col justify-center bg-stone-100'>
			<nav className='container'>
				<ul className='flex items-center justify-between gap-8 font-medium tracking-wider text-stone-500'>
					<li className='text-sm'>
						<Link href='/'>Home</Link>
					</li>
					<li className='text-sm'>
						<Link href='/posts'>Public Posts</Link>
					</li>
					<li className='text-sm'>
						<Link href='/user'>Private User</Link>
					</li>
					<li>
						<Login />
					</li>
					<li>
						<ProfileImage />
					</li>
				</ul>
			</nav>
		</header>
	)
}

export default Header
