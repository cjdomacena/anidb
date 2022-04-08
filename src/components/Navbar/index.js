import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { UserContext } from './../../context';
import LoggedIn from "./LoggedIn";

function Navbar()
{
	const { session } = useContext(UserContext);

	return (
		<header className="w-full h-auto bg-slate-900 border-b border-b-slate-800 shadow-sm rounded relative">
			<nav className="container mx-auto flex justify-between h-16 items-center text-white">
				<h1><Link to="/">AnimeList</Link></h1>
				<ul className="flex space-x-4 h-full items-center text-base text-gray-200 ">
					{/* <Browse setToggleBrowse={setToggleBrowse} /> */}
					<li className="space-x-4">

						{session === null ? <>
							<Link to="/signup" className="border border-blue-600 bg-blue-600 px-6 py-2 rounded font-semibold">Login</Link>
							{/* <Link to="/signup" className="border border-blue-600  px-6 py-2 rounded font-semibold">Signup</Link> */}
						</> : <LoggedIn />}
					</li>
				</ul>
			</nav>

			<div className={`w-full h-auto bg-slate-800 left-0 z-50 p-4`}>
				<div className="w-fit mx-auto text-white">
					<ul className="text-sm flex space-x-4">
						<li><NavLink to="/" className={({isActive}) => `${ isActive ? "font-bold" : "" }`}>Current Season</NavLink></li>
						<li><NavLink to="/top-anime" className={({isActive}) => `${ isActive ? "font-bold" : "" }`}>Top Anime</NavLink></li>
						<li>Schedule</li>
						<li>Random Anime</li>
					</ul>
				</div>
			</div>
		</header>
	)
}

export default Navbar;
