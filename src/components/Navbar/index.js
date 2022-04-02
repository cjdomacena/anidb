import { useContext } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { supabase } from "../../client";
import {UserContext} from './../../context'
function Navbar()
{
	const {session, setSession} = useContext(UserContext);

	const handleSignOut = (e) => {
		const {error} =  supabase.auth.signOut();
		if(error) {
			toast.error(error.error_description || error.message)
		}
		setSession(null)
	} 
	return (
		<header className="w-full h-auto bg-slate-900 border-b border-b-slate-800 shadow-sm rounded">
			<nav className="container mx-auto flex justify-between h-16 items-center text-white">
				<h1>AnimeList</h1>
				<ul className="flex text-sm space-x-4">
					<li>
						{session === null ? <Link to="/login" className="border border-blue-600 bg-blue-600 px-6 py-2 rounded font-semibold">Login</Link> : <button onClick={handleSignOut}>Logout</button>}
					</li>
				</ul>
			</nav>
		</header>
	)
}

export default Navbar;
