import { Link } from "react-router-dom";
import { supabase } from "../../client";
import toast from "react-hot-toast";
import { useContext } from "react";
import { UserContext } from "../../context";
function LoggedIn()
{
	const { setSession } = useContext(UserContext)

	const handleSignOut = () =>
	{
		const { error } = supabase.auth.signOut();
		if (error)
		{
			toast.error(error.error_description || error.message)
		}
		else
		{
			toast.success('Successfully signed out', { className: "bg-slate-800 text-white" })
		}
		setSession(null);
	}
	return (
		<ul className="space-x-4 flex items-center">
			<li className="bg-blue-900 p-2 rounded hover:bg-blue-700"><Link to="/favorites">Favorites</Link></li>
			<li className="bg-blue-900 p-2 rounded hover:bg-blue-700"><Link to="/bookmarks">Bookmarks</Link></li>
			<li className="bg-red-900 p-2 rounded hover:bg-red-700"><button onClick={handleSignOut}>Logout</button></li>
		</ul>)
}

export default LoggedIn;