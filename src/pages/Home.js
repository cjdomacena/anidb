import React, { useContext, useEffect, useCallback } from "react";
import { useInfiniteQuery } from "react-query";
import { getCurrentSeason } from "../api";
import { useInView } from 'react-intersection-observer'
import LoadingCards from "../components/Card/LoadingCards";
import Card from "../components/Card";
import { UserContext } from "../context";
import { supabase } from "../client";
import toast from "react-hot-toast";
import { isFavorite, isBookmarked } from './../utils'


function Home()
{
	const { ref, inView } = useInView();
	const { session, setBookmarked, bookmarked, favorites, setFavorites } = useContext(UserContext);
	const { data, isFetching, fetchNextPage, hasNextPage, isFetchingNextPage }
		= useInfiniteQuery('seasonal', ({ pageParam = 0 }) => getCurrentSeason(pageParam), {
			staleTime: 1000 * 60, refetchOnWindowFocus: false,
			getNextPageParam: (lastPage, allPages) =>
			{
				const max_pages = lastPage.pagination.last_visible_page;
				const next_page = allPages.length + 1;
				return next_page <= max_pages ? next_page : undefined;
			},
		})


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
				setBookmarked(data);
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
		if (session && hasNextPage)
		{
			getBookmarked();
			getFavorites();
		}
		if (inView)
		{
			if (hasNextPage)
			{
				fetchNextPage();
			}
		}

	}, [fetchNextPage, getBookmarked, getFavorites, hasNextPage, inView, session, setBookmarked, setFavorites])



	return (
		<section className="container mx-auto mt-12 text-white">
			<h1 className="text-lg font-bold p-4">Current Season</h1>
			<div className="w-full grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-4">
				{(isFetching && !isFetchingNextPage) && <LoadingCards />}
				{data?.pages.map((page, index) => (
					<React.Fragment key={index}>
						{page.data.map(item => <Card props={item} key={item.mal_id} isBookmarked={isBookmarked(item.mal_id, bookmarked)} isFavorite={isFavorite(item.mal_id, favorites)} />)}
					</React.Fragment>
				))}
				{isFetchingNextPage && <LoadingCards />}
			</div>
			<div className="p-4 bg-slate-800 my-4 text-center" disabled={!hasNextPage || isFetchingNextPage} ref={ref}>
				{isFetchingNextPage ? <p>Loading more...</p> : hasNextPage ? 'Loading' : 'Nothing more to load'}
			</div>
		</section>
	)
}
export default Home;