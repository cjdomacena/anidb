import { SearchIcon } from '@heroicons/react/solid'
import { useEffect, useRef, useState } from 'react';
import { useQuery } from 'react-query'
import { getAnimeSearch } from '../api';
import SearchCard from '../components/Card/SearchCard';


function Search({ setIsOpen })
{
	const [query, setQuery] = useState("");
	const [isSFW, setIsSFW] = useState(true);
	const containerRef = useRef(null)
	const { data, isFetching, refetch, isFetched, isRefetching } = useQuery(['anime', query, isSFW], () => getAnimeSearch(query, isSFW), {
		enabled: false,
		refetchOnWindowFocus: false,
		refetchIntervalInBackground: 1000 * 30,
	})

	const handleSearch = () =>
	{

		if (query.length > 2)
		{
			refetch();
		}
	}



	const handleToggle = (e) =>
	{
		if (e.key === 'Escape')
		{
			setIsOpen(false);
		}
		if (e.key === 'Enter')
		{
			refetch();
		}
	}



	useEffect(() =>
	{
		const handleClickOutside = (e) =>
		{
			if (containerRef.current && !containerRef.current.contains(e.target))
			{
				setIsOpen(false)
			}
		}
		document.getElementsByTagName('BODY')[0].classList.add('overflow-hidden')
		document.addEventListener('mousedown', handleClickOutside);
		return () =>
		{
			document.removeEventListener('mousedown', handleClickOutside)
			document.getElementsByTagName('BODY')[0].classList.remove('overflow-hidden')
		}
	}, [setIsOpen])

	return (
		<section className="fixed h-screen top-0 w-full left-0  z-50 grid justify-center bg-slate-900/60" onKeyDown={handleToggle} >
			<div className="w-screen  h-fit mt-12 p-4 " >
				<div className="w-4/4 max-w-3xl mx-auto text-slate-100" ref={containerRef}>
					<div className='flex justify-center w-full bg-slate-800 px-4 py-2 items-center rounded'>
						<div className='border-r pr-2 border-r-slate-500'>
							<SearchIcon className='w-4 h-4' />
						</div>
						<input className="bg-slate-800 w-full h-10 p-2 rounded focus:outline-none" value={query} onChange={(e) => setQuery(e.currentTarget.value)} placeholder="Search..." autoFocus />
						{isFetching || isRefetching ? <div className='text-xs flex'>
							<svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
								<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
								<path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>

							</svg>
						</div> : ""}
						<div className='flex items-center space-x-4 '>
							<button className={`${ isSFW ? 'bg-green-600' : 'bg-red-600' } whitespace-nowrap p-1 rounded font bold text-[10px]`} onClick={() => setIsSFW(prev => !prev)}>active: {isSFW ? 'SFW' : 'NSFW'}</button>
							<button className='bg-blue-600 whitespace-nowrap p-1 rounded font bold text-[10px]' onKeyDown={handleToggle} onClick={handleSearch}>Enter</button>
							<button className='text-[10px] bg-slate-600 text-slate-300 p-1 rounded' onClick={() => setIsOpen(false)}>ESC</button>
						</div>
					</div>
					<div className='mt-1 overflow-y-scroll h-[500px] scrollbar scrollbar-thumb-gray-900 scrollbar-track-gray-100 scrollbar-thin rounded scroll-smooth'>
						{query.length > 0 ? <>
							{isFetched && (data.data).length === 0 ? <div className='p-4 bg-slate-800 text-center text-sm text-neutral-400'>{query} not found in anime</div> : ""}
							{data ? data.data.map((anime, index) => <SearchCard props={anime} key={index} setIsOpen={setIsOpen} />
							) : ""}</> : ""}

					</div>
				</div>
			</div>
		</section>
	)
}

export default Search;