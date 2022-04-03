import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from './../../context'
import LoggedIn from "./LoggedIn";
function Navbar()
{
	const { session } = useContext(UserContext);


	return (
		<header className="w-full h-auto bg-slate-900 border-b border-b-slate-800 shadow-sm rounded">
			<nav className="container mx-auto flex justify-between h-16 items-center text-white">
				<h1><Link to="/">AnimeList</Link></h1>
				<ul className="flex text-sm space-x-4">
					<li className="space-x-4">
						{session === null ? <>
							<Link to="/signup" className="border border-blue-600 bg-blue-600 px-6 py-2 rounded font-semibold">Login</Link>
							{/* <Link to="/signup" className="border border-blue-600  px-6 py-2 rounded font-semibold">Signup</Link> */}
						</> : <LoggedIn />}
					</li>
				</ul>
			</nav>
		</header>
	)
}

export default Navbar;
