import React, { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom'
import { supabase } from './../client'
function Login()
{
	const [email, setEmail] = useState('');
	const [loading, setLoading] = useState(false);

	async function handleLogin(e)
	{
		e.preventDefault();
		try
		{
			setLoading(true)
			const { error } = await supabase.auth.signIn({ email })
			if (error) throw error
			toast.success('Check your email for the login link!')
		} catch (error)
		{
			toast.error(error.error_description || error.message)
		} finally
		{
			setLoading(false);
		}
	}

	return (<section className="w-screen mx-auto text-white h-screen grid justify-center absolute top-0 left-0">

		<div className="w-96 h-auto mt-36">
			<div className="p-4">
				<h1 className="text-4xl font-extrabold">ANIDB</h1>
				<p className="text-sm">Some amazing text here to attract users</p>
			</div>
			<form className="p-4 space-y-2" onSubmit={handleLogin}>
				<h2 className="font-medium">Sign in via magic link with your email below</h2>
				<div className="space-y-2">
					<input type="email" id="email" className="block w-full bg-slate-700 rounded p-2" value={email} onChange={(e) => setEmail(e.currentTarget.value)} placeholder="Enter email" required />
				</div>
				<div className="pt-4 space-y-2">
					<button className="w-full bg-blue-600 py-2 rounded text-sm font-medium hover:bg-blue-800" type='submit' disabled={loading}>{loading ? <div className="flex justify-center"> <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
						<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
						<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
					</svg> Processing </div> : 'Send Magic Link'}</button>
					<Link to="/"><button className="w-full border border-slate-500 hover:bg-slate-700 py-2 rounded text-sm font-medium mt-2">Cancel</button></Link>
				</div>
			</form>
		</div>

	</section>)
}

export default Login;