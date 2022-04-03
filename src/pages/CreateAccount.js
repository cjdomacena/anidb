import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { supabase } from "../client";
import { UserContext } from "../context";


function CreateAccount()
{
	const [username, setUsername] = useState("");
	const [errorMsg, setErrorMsg] = useState([]);
	const { session, setUser, user } = useContext(UserContext);
	const navigate = useNavigate();
	function testRegex(e)
	{
		e.preventDefault();
		let regex = new RegExp(/[a-zA-Z]+1/i);
		let temp = [];
		if (e.currentTarget.value.length < 3)
		{
			temp.push("Username must be at least 3 characters")
		}
		if (!regex.test(e.currentTarget.value))
		{
			temp.push("Username must have have atleast one digit")
		}

		setErrorMsg(temp);
	}

	async function handleSubmit(e)
	{
		e.preventDefault();
		try
		{
			const { data, error } = await supabase
				.from('profiles')
				.insert([
					{ user_id: session.user.id, username: username }
				])
			setUser(data)
			if(error) throw error;
			if (error?.code === "23505")
			{
				toast.error('Username already exists');
			}
		} catch (error)
		{
			toast.error("Something went wrong...");
		} finally {
			if(user) {
				navigate("/")
			}
		}

		setUsername("")

	}

	return (
		<div className="absolute z-50 top-0 left-0 w-screen h-screen grid place-items-center bg-slate-900">
			{console.log(session)}
			<div className="w-96 h-fit border rounded border-slate-800 text-white shadow-xl bg-slate-800">
				<div className="w-full h-2 bg-blue-600 shadow rounded-tl rounded-tr">
				</div>
				<h1 className="text-lg font-medium px-4 mt-4">Setup profile</h1>
				<form className="space-y-4 p-4" onSubmit={handleSubmit}>
					<div>
						<label htmlFor="username">Username</label>
						<input type="text" className="block w-full bg-slate-700 caret-white p-1 mt-2" placeholder="Enter username" value={username} onChange={(e) =>
						{
							setUsername(e.currentTarget.value)
							testRegex(e)
						}

						} id="username" required />
						{errorMsg.length > 0 ? errorMsg.map((msg, i) => <p className="text-xs text-red-500 mt-1" key={i}>{msg}</p>) : ""}
					</div>
					<div className="w-full  space-y-2">
						<button type="submit" className="w-full px-6 py-1 bg-blue-600 rounded-sm">Submit</button>
						<button type="submit" className="w-full px-6 py-1 border border-slate-600 rounded-sm">Cancel</button>
					</div>
				</form>

			</div>

		</div>
	)
}

export default CreateAccount;