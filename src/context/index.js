import { createContext, useMemo } from "react";
import { useState, useEffect } from "react";
import { supabase } from "../client";
export const UserContext = createContext({});

export const UserProvider = ({ children }) =>
{
	const [session, setSession] = useState(null);
	const [bookmarked, setBookmarked] = useState(null);
	const [favorites, setFavorites] = useState(null);
	const value = useMemo(() =>
	({
		session,
		setSession,
		bookmarked,
		setBookmarked,
		favorites,
		setFavorites
	}), [session, bookmarked, favorites])

	useEffect(() =>
	{
		setSession(supabase.auth.session());

		supabase.auth.onAuthStateChange((_event, session) =>
		{
			if (_event === 'SIGNED_IN')
			{
				setSession(session);
			}
			if (_event === 'SIGNED_OUT')
			{
				setSession(null)
			}
			setSession(session)
		})
	}, [])
	return (
		<UserContext.Provider value={value}>
			{children}
		</UserContext.Provider>
	)
}