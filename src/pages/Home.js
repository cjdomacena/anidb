import React, { useEffect, useState, useContext } from "react";
import { useInfiniteQuery } from "react-query";
import { getCurrentSeason } from "../api";
import { useInView } from 'react-intersection-observer'
import LoadingCard from "../components/Card/LoadingCard";
import Card from "../components/Card";
import { UserContext } from "../context";

function Home()
{
	const { ref, inView } = useInView();
	const [page, setPage] = useState(0);
	const { session } = useContext(UserContext)
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
		if (inView)
		{
			setPage(prev => prev + 1);
			if (hasNextPage)
			{
				fetchNextPage();
			}
		}
	}, [fetchNextPage, hasNextPage, inView])


	return (
			<section className="container mx-auto mt-12 text-white">
				<h1 className="text-lg font-bold p-4">Current Season</h1>
				<div className="w-full grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-4">
					{isFetching && <LoadingCard />}
					{console.log(session)}
					{data && data?.pages.map((page, index) => (
						<React.Fragment key={index}>
							{page.data.map(item => <Card props={item} key={item.mal_id} />)}
						</React.Fragment>
					))}
					{/* {data && data.pages[0].data.map((item) => <Card props={item} key={item.mal_id} />)} */}
				</div>
				<div className="p-4 bg-slate-800 my-4 text-center" ref={ref} disabled={!hasNextPage || isFetchingNextPage}>
					{isFetchingNextPage ? <p>Loading more...</p> : hasNextPage ? 'Loading' : 'Nothing more to load'}
				</div>
			</section>
		)
}
export default Home;