import React, { useContext, useEffect, Suspense } from "react";
import { useInfiniteQuery } from "react-query";
import { getCurrentSeason } from "../api";
import { useInView } from 'react-intersection-observer'
import LoadingCard from "../components/Card/LoadingCard";
import Card from "../components/Card";
import { UserContext } from "../context";
import { supabase } from "../client";
import toast from "react-hot-toast";


function Home()
{
	const { ref, inView } = useInView();
	const { session, setBookmarked, bookmarked } = useContext(UserContext);
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

	function isBookmarked(mal_id, bookmark)
	{
		if (bookmark)
		{
			return (bookmark.mal_ids).includes(mal_id)
		} else
		{
			return false;
		}

	}

	// function displayFilteredData(data, filter) {
	// 	let tempArr = data;
	// 	switch (filter) {
	// 		case 'AIRING':
	// 			tempArr = data.map((item) => item.pages.map((anime) => anime.status === "Currently Airing"))
	// 			return tempArr;
	// 		case 'NOT AIRING':
	// 			tempArr = data.map((item) => item.pages.map((anime) => anime.status === "Not yet aired"))
	// 			return tempArr
	// 		default:
	// 			return tempArr;
	// 	}
	// }

	useEffect(() =>
	{
		async function getBookmarked()
		{

			const { data, error } = await supabase.from('bookmarks').select('mal_ids').match({ user_id: session.user.id });
			if (error)
			{
				toast.error(error.message);
			} else
			{
				setBookmarked(data[0]);
			}
		}
		if (session && hasNextPage)
		{
			getBookmarked();
		}
		if (inView)
		{
			if (hasNextPage)
			{
				fetchNextPage();
			}
		}

	}, [fetchNextPage, hasNextPage, inView, session, setBookmarked])

	function LoadingCards()
	{
		return <>
			<LoadingCard /><LoadingCard /><LoadingCard /><LoadingCard /><LoadingCard /><LoadingCard /><LoadingCard />
		</>
	}

	return (
		<section className="container mx-auto mt-12 text-white">
			<h1 className="text-lg font-bold p-4">Current Season</h1>
			<div className="w-full grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-4">
				{(isFetching && !isFetchingNextPage) && <LoadingCards />}
				{data?.pages.map((page, index) => (
					<React.Fragment key={index}>
						{page.data.map(item => <Card props={item} key={item.mal_id} isBookmarked={isBookmarked(item.mal_id, bookmarked)} />)}
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