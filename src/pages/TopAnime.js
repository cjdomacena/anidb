import { useInfiniteQuery } from "react-query";
import React, { useContext, useCallback, useEffect, useState } from "react";
import LoadingCards from "../components/Card/LoadingCards";
import Card from "../components/Card";
import { UserContext } from "../context";
import { useInView } from "react-intersection-observer";
import toast from "react-hot-toast";
import { supabase } from "../client";
import { getTopAnime } from "../api";
import { isFavorite, isBookmarked } from "../utils";
import Select from 'react-select'
function TopAnime()
{
	const { ref, inView } = useInView();
	const [type, setType] = useState("default");
	const { session, setBookmarked, bookmarked, favorites, setFavorites } = useContext(UserContext);
	const { data, isFetching, fetchNextPage, hasNextPage, isFetchingNextPage }
		= useInfiniteQuery(['top-anime', type], ({ pageParam = 1 }) => getTopAnime(pageParam, type, null), {
			staleTime: 1000 * 60, refetchOnWindowFocus: false,
			getNextPageParam: (lastPage, allPages) =>
			{
				const max_pages = lastPage.pagination.last_visible_page;
				const next_page = allPages.length + 1;
				return next_page <= max_pages ? next_page : undefined;
			},
		})

	const getBookmarked = useCallback(async (session) =>
	{
		const { data, error } = await supabase.from('bookmarks').select('bookmarked').match({ user_id: session.user.id });
		if (error)
		{
			toast.error(error.message);
		} else
		{
			setBookmarked(data);
		}
	}, [setBookmarked]);

	const getFavorites = useCallback(async (session) =>
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
	}, [setFavorites]);

	useEffect(() =>
	{
		if (session && hasNextPage)
		{
			getBookmarked(session);
			getFavorites(session);
		}
		if (inView)
		{
			if (hasNextPage)
			{
				fetchNextPage();
			}
		}

	}, [fetchNextPage, getBookmarked, getFavorites, hasNextPage, inView, session, setBookmarked, setFavorites])


	const typeOptions = [
		{ 'value': 'tv', 'label': 'TV' },
		{ 'value': 'movie', 'label': 'Movie' },
		{ 'value': 'ova', 'label': 'OVA' },
		{ 'value': 'special', 'label': 'Special' },
		{ 'value': 'ona', 'label': 'ONA' },
		{ 'value': 'music', 'label': 'Music' }
	]

	return (<section className="container mx-auto text-white">
		<div className="flex items-center justify-between pt-12 p-4">
			<h1 className="text-lg font-bold">Top Animes</h1>
			<Select options={typeOptions} onChange={setType} classNamePrefix="text-slate-900" className="text-slate-900 pr-4" placeholder="Filter by Type" defaultValue={{value: 'default', label:'Filter by Type'} } escapeClearsValue isClearable />
		</div>
		<div className="w-full grid grid-cols-[repeat(auto-fill,minmax(271px,1fr))] gap-4 p-4">
			{(isFetching && !isFetchingNextPage) && <LoadingCards />}
			{data?.pages.map((page, index) => (
				<React.Fragment key={index}>
					{page.data.map(item => <Card props={item} key={item.mal_id} isBookmarked={isBookmarked(item.mal_id, bookmarked)} isFavorite={isFavorite(item.mal_id, favorites)} type="rank" />)}
				</React.Fragment>
			))}
			{isFetchingNextPage && <LoadingCards />}
		</div>
		<div className="p-4 bg-slate-800 my-4 text-center" disabled={!hasNextPage || isFetchingNextPage} ref={ref}>
			{isFetchingNextPage ? <p>Loading more...</p> : hasNextPage ? 'Loading' : 'Nothing more to load'}
		</div>
	</section>)
}
export default TopAnime;