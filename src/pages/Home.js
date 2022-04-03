import React, { useContext, useEffect, useState } from "react";
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
	const [page, setPage] = useState(0);
	const { session, setBookmarked, bookmarked } = useContext(UserContext);
	const { data, isFetching, fetchNextPage, hasNextPage, isFetchingNextPage }
		= useInfiniteQuery('seasonal', ({ pageParam = 0 }) => getCurrentSeason(
			pageParam
		), {
			staleTime: 1000 * 60, refetchOnWindowFocus: false,
			getNextPageParam: (lastPage) =>
			{
				if (lastPage.pagination.has_next_page)
				{
					return page;
				} else
				{
					return undefined;
				}
			}
		})


	useEffect(() =>
	{
		getBookmarked();
		if (inView)
		{

			setPage(prev => prev + 1);
			if (hasNextPage)
			{
				fetchNextPage();
			}
		}
		
		async function getBookmarked()
		{
				let temp = null;
				try
				{
					if(session) {
						const { data, error } = await supabase.from('bookmarks').select('mal_id').match({ user_id: session.user.id });
						if (error)
						{
							toast.error(error.message);
						}
						temp = data;
					}
				} catch (error)
				{
					toast.error(error.message  || "Something went wrong...")
				} finally
				{
					setBookmarked(temp);
				}
		}
	}, [fetchNextPage, hasNextPage, inView, session, setBookmarked])



	return (
		<section className="container mx-auto mt-12 text-white">
			<h1 className="text-lg font-bold p-4">Current Season</h1>
			<div className="w-full grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-4">
				{isFetching && <><LoadingCard /><LoadingCard /><LoadingCard /><LoadingCard /><LoadingCard /><LoadingCard /><LoadingCard /></>}
				{data && data?.pages.map((page, index) => (
					<React.Fragment key={index}>
						{page.data.map(item => <Card props={item} key={item.mal_id} bookmarked={bookmarked} />)}
					</React.Fragment>
				))}
			</div>
			<div className="p-4 bg-slate-800 my-4 text-center" disabled={!hasNextPage || isFetchingNextPage} ref={ref}>
				{isFetchingNextPage ? <p>Loading more...</p> : hasNextPage ? 'Loading' : 'Nothing more to load'}
			</div>
		</section>
	)
}
export default Home;