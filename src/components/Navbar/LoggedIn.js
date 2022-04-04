import { NavLink } from "react-router-dom";
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
		<div className="space-x-4 flex items-center">
			<NavLink to="/" className={({ isActive }) =>
				isActive ? "bg-blue-700 p-2 rounded hover:bg-blue-900" : "hover:bg-blue-700 p-2 rounded"
			}>Home</NavLink>
			<NavLink to="/favorites" className={({ isActive }) =>
				isActive ? "bg-blue-700 p-2 rounded hover:bg-blue-900" : "hover:bg-blue-700 p-2 rounded"
			}>Favorites</NavLink>
			<NavLink to="/bookmarks" className={({ isActive }) =>
				isActive ? "bg-blue-700 p-2 rounded" : "hover:bg-blue-700 p-2 rounded"
			}>Bookmarks</NavLink>
			<button onClick={handleSignOut} className="bg-red-900 p-2 rounded hover:bg-red-700" type="button">Logout</button>
		</div >)
}

export default LoggedIn;