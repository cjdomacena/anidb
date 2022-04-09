import { useEffect, useState, useContext, useCallback } from "react";
import { useQuery } from "react-query";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getAnimeById } from "../api";
import imageUnavailable from '../assets/imageUnavailable.png'
import DisplayGenres from "../components/Badge/Genre";
import { BookmarkIcon, StarIcon } from '@heroicons/react/outline';
import { UserContext } from '../context'
import { addBreaks, handleAddBookmark, handleAddFavorite, isBookmarked, isFavorite } from '../utils'
import { supabase } from "../client";
import toast from "react-hot-toast";


function Anime()
{
	const params = useParams();
	const location = useLocation();
	const navigate = useNavigate();
	const [selectedFavorite, setSelectedFavorite] = useState(false);
	const [selectedBookmark, setSelectedBookmark] = useState(false);
	const [anime, setAnime] = useState(location.state ? location.state.props : null);

	const { session, setBookmarked, setFavorites, bookmarked, favorites } = useContext(UserContext);

	const handleBM = async () =>
	{
		const current = selectedBookmark ? false : true;
		if (session)
		{
			const req = await handleAddBookmark(current, supabase, anime, bookmarked, setBookmarked);
			const res = req;

			if (res.status === 200)
			{
				toast.success(`${ anime.title
					} ${ res.message }`, { className: "bg-slate-800 border rounded border-slate-800 text-white" })
			}
			setSelectedBookmark(current)
		} else
		{
			toast.error("You must be logged in to add a Bookmark", {
				className: "bg-yellow-300",
			})
		}
	}

	const handleFav = async () =>
	{
		const current = selectedFavorite ? false : true;
		if (session)
		{
			const req = await handleAddFavorite(current, supabase, anime, favorites, setFavorites);
			const res = req;

			if (res.status === 200)
			{
				toast.success(`${ anime.title
					} ${ res.message }`, { className: "bg-slate-800 border rounded border-slate-800 text-white" })
			}
			setSelectedFavorite(current)
		} else
		{
			toast.error("You must be logged in to add a Bookmark", {
				className: "bg-yellow-300",
			})
		}
	}

	// const m_id = params.match.
	const { data, isFetching, isError } = useQuery(['anime', params.id], () => getAnimeById(params.id), {
		enabled: anime ? false : true,
		refetchOnWindowFocus: false,
	});

	if (isError)
	{
		navigate("/error");
	}



	const ShowParagraph = ({ paragraph }) =>
	{
		return paragraph.map((item, index) => <p className="leading-loose text-neutral-300" key={index}>{item}.</p>)
	}
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
		// Refetch if user pasted link directly
		if(session) {
			if (!bookmarked || !favorites)
			{
				getBookmarked(session);
				getFavorites(session);
			}
		}

		if (data)
		{
			setAnime(data.data)
			if (session)
			{
				setSelectedBookmark(isBookmarked(data.data.mal_id, bookmarked))
				setSelectedFavorite(isFavorite(data.data.mal_id, favorites))
			}
		} else if (location.state) {
			if(session) {
				setSelectedBookmark(isBookmarked(location.state.props.mal_id, bookmarked))
				setSelectedFavorite(isFavorite(location.state.props.mal_id, favorites))
			}
		}


	}, [bookmarked, data, favorites, getBookmarked, getFavorites, location.state, session])

	if (isFetching)
	{
		return <div className="container mx-auto mt-12 text-white bg-gray-900 p-4 rounded shadow">

			<div className="w-3/4 mx-auto">
				<div className="flex justify-between gap-12 xl:flex-nowrap lg:flex-nowrap flex-wrap items-center">
					<div className="w-full h-[400px] animate-pulse bg-slate-900" />
					<div className="w-full space-y-4">
						<div className="flex items-center">
							<p className="text-xs mr-2 font-bold w-full bg-slate-900 animate-pulse h-4"></p>
							<p className="text-xs w-full h-4 bg-slate-900 animate-pulse">

							</p>
						</div>
						<div className="w-full h-24 animate-pulse bg-slate-900"></div>
						<div>
							<h4 className="text-sm">Status</h4>
							<p className="w-full h-2 bg-slate-900 animate-pulse"></p>
						</div>
					</div>
				</div>

			</div>
		</div>
	} else
	{
		return (anime &&
			<div className="xl:container lg:container w-full  mx-auto mt-12">
				<section className=" text-white xl:w-3/4 lg:w-3/4 mx-auto w-full  p-4 rounded shadow">
					<div className="w-full mx-auto">
						<div className="flex xl:justify-between lg:justify-between justify-center gap-12 xl:flex-nowrap lg:flex-nowrap flex-wrap items-center bg-slate-800 p-4 w-full">
							<img src={anime.images.webp["large_image_url"] || "https://via.placeholder.com/300/09f/fff.png"} className="w-auto h-auto" alt={anime.title} loading="lazy" onError={(e) =>
							{
								e.currentTarget.src = imageUnavailable;
							}} />
							<div className="xl:w-full lg:w-full w-96 space-y-4">
								<div className="flex items-center">
									<p className="text-xs mr-2 font-bold">{anime.type} &#9679;</p>
									<p className="text-xs">
										<span className="font-medium"> {anime.rating}
										</span>
									</p>
								</div>
								<h1 className="xl:text-4xl lg:text-2xl text-xl font-bold leading-relaxed">{anime.title}</h1>

								<div>
									<DisplayGenres genres={Array.prototype.concat(anime.themes, anime.genres)} />
								</div>
								<div>
									<h4 className="text-sm">Status</h4>
									<p className={`text-xs p-1 rounded w-fit mt-2 ${ anime.status === "Not yet aired" ? "bg-orange-500" : "bg-emerald-600" }`}>{anime.status}</p>
								</div>
								<div className="text-xs pt-4 flex gap-2">
									<button className={`text-xs flex items-center group cursor-pointer p-1 rounded  ${ selectedBookmark ? 'bg-blue-700  ' : 'hover:bg-blue-700 bg-slate-900 ' } transition-colors`}
										onClick={handleBM}
									>
										<BookmarkIcon className='w-4 h-4' />
										<p className='ml-1'>{selectedBookmark ? 'Remove from Bookmarks' : 'Add to Bookmarks'}</p>
									</button>
									<button className={`text-xs flex items-center group cursor-pointer p-1 rounded  ${ selectedFavorite ? 'bg-blue-700  ' : 'hover:bg-blue-700 bg-slate-900 ' } transition-colors`}
										onClick={handleFav}
									>
										<StarIcon className='w-4 h-4' />
										<p className='ml-1'>{selectedFavorite ? 'Remove from favorite' : 'Add to favorites'}</p>
									</button>
								</div>

							</div>
						</div>
					</div>
				</section>
				<section className="w-3/4 mx-auto mt-12 text-white p-2">
					<div className="space-y-4 p-12 text-neutral-100 border-slate-800 border">
						<h1 className=" text-2xl font-bold">Synopsis</h1>
						<ShowParagraph paragraph={addBreaks(anime.synopsis)} />
					</div>
				</section>W
			</div>
		)
	}


}

export default Anime;