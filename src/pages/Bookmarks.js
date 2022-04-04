import { useContext, useEffect, useCallback } from "react";
import { UserContext } from "../context";
import { supabase } from "../client";
import toast from "react-hot-toast";
import Card from "../components/Card";
import { isBookmarked, isFavorite } from "../utils";
import LoadingCards from "../components/Card/LoadingCards";


function Bookmarks()
{
	const { favorites, setFavorites, bookmarked, setBookmarked, session } = useContext(UserContext);
	const getBookmarked = useCallback(async () =>
	{
		if (session)
		{
			const { data, error } = await supabase.from('bookmarks').select('bookmarked').match({ user_id: session.user.id });
			if (error)
			{
				toast.error(error.message);
			} else
			{
				setBookmarked(data.flat());
			}
		}

	}, [session, setBookmarked]);

	const getFavorites = useCallback(async () =>
	{
		if (session)
		{
			const { data, error } = await supabase.from('favorites')
				.select('favorite')
				.match({ user_id: session.user.id })
			if (error)
			{
				toast.error(error.message);
			} else
			{
				setFavorites(data);
			}
		}
	}, [session, setFavorites])

	useEffect(() =>
	{
		getFavorites();
		getBookmarked();
	}, [getBookmarked, getFavorites])

	return (
		<section className="container mx-auto mt-12 text-white">
			<h1 className="text-lg font-bold p-4">My Bookmarks</h1>
			<div className="w-full grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-4">
				{bookmarked !== null && bookmarked?.length === 0 ? <p className="p-4 text-slate-500 text-sm">Nothing to see here.</p> : ""}
				{bookmarked === null && bookmarked?.length > 0 && <LoadingCards />}
				{bookmarked?.map(item => <Card key={item.bookmarked.mal_id} props={item.bookmarked} isBookmarked={isBookmarked(item.bookmarked.mal_id, bookmarked)} isFavorite={isFavorite(item.bookmarked.mal_id, favorites)} />)}
			</div>
		</section>)
}

export default Bookmarks;