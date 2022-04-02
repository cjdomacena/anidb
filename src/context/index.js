import { createContext } from "react";
import { useState, useEffect } from "react";
import { supabase } from "../client";
export const UserContext = createContext({});

export const UserProvider = ({ children }) =>
{
	const [session, setSession] = useState(null);
	useEffect(() =>
	{
		setSession(supabase.auth.session());

		supabase.auth.onAuthStateChange((_event, session) =>
		{
			if(_event === 'SIGNED_IN') {
				setSession(session);
			}
			if(_event === 'SIGNED_OUT') {
				setSession(null)
			}
		})
	}, [])
	return (
		<UserContext.Provider value={{
			session,
			setSession
		}}>
			{children}
		</UserContext.Provider>
	)
}