import { BookmarkIcon, StarIcon } from '@heroicons/react/outline';
import { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../../client';
import { UserContext } from './../../context'
import imageUnavailable from '../../assets/imageUnavailable.png';
import { parseTitle } from '../../utils/'
import DisplayGenres from '../Badge/Genre';

function Card({ props, isBookmarked, isFavorite, type = "default" })
{
	const { session, setBookmarked, setFavorites, bookmarked, favorites } = useContext(UserContext);
	const [selectedBookmark, setSelectedBookmark] = useState(false);
	const [selectedFavorite, setSelectedFavorite] = useState(false);

	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	const handleAddBookmark = async () =>
	{
		setLoading(true);
		if (session)
		{
			const current = selectedBookmark ? false : true
			setSelectedBookmark(current);
			if (current)
			{
				const { error } = await supabase.rpc('add_bookmark', { 'bookmark': props, 'm_id': props.mal_id });
				if (!error)
				{
					toast.success(`${ props.title
						} successfully added to bookmarks!`, { className: "bg-slate-800 border rounded border-slate-800 text-white" })
					setLoading(false);
				} else
				{
					toast.error(error.message);
					setLoading(false);
				}

			} else if (!current)
			{
				const { error } = await supabase.rpc('remove_bookmark', { 'm_id': props.mal_id });
				if (!error)
				{
					let temp = bookmarked.filter((item) => item.bookmarked.mal_id !== props.mal_id)
					setBookmarked(temp);
					toast.error(`${ props.title } successfully removed from bookmarks!`, { className: "bg-slate-600 border rounded border-slate-800 text-white" })
					setLoading(false);
				} else
				{
					toast.error(error.message)
					setLoading(false);
				}
			}
		} else
		{
			toast.error("You must be logged in to add a Bookmark", {
				className: "bg-yellow-300",
			})
		}
	}

	const handleFavorites = async () =>
	{
		if (session)
		{
			const current = selectedFavorite ? false : true
			setSelectedFavorite(current);
			if (current)
			{
				const { error } = await supabase.rpc('add_favorite', { 'param': props, 'm_id': props.mal_id });
				if (!error)
				{
					setLoading(false);
					toast.success(`${ props.title
						} successfully added to favorites!`, { className: "bg-slate-800 border rounded border-slate-800 text-white" })
				} else
				{
					toast.error(error.message);
					setLoading(false);
				}
			} else if (!current)
			{
				const { error } = await supabase.rpc('remove_favorite', { 'm_id': props.mal_id });
				let temp = favorites.filter((item) => item.favorite.mal_id !== props.mal_id)
				setFavorites(temp);
				if (!error)
				{
					toast.error(`${ props.title } successfully removed from favorites!`, { className: "bg-slate-600 border rounded border-slate-800 text-white" })
					setLoading(false);
				} else
				{
					toast.error(error.message)
					setLoading(false);
				}
			}

		} else
		{
			toast.error("You must be logged in to add this to your favorites", { className: "bg-yellow-300" })
		}
	}



	useEffect(() =>
	{
		// Will change state when isBookmarked changes.
		setSelectedBookmark(isBookmarked);
		setSelectedFavorite(isFavorite)
	}, [isBookmarked, isFavorite])

	return (
		<div className="w-[280px] p-4 hover:bg-slate-800 rounded  transition-colors">
			<div className="w-full  relative ">
				<button onClick={() => navigate(`/anime/${ parseTitle(props.title) }/${ props.mal_id }`, { replace: true, state: { props } })}  ><img src={props.images.webp["large_image_url"]} onError={(e) => { e.currentTarget.src = imageUnavailable }} alt={props.title} className="w-full h-auto object-cover " loading='lazy' /></button>
				{type === 'default' || type === "rank" ? <div className='absolute top-1 left-1 w-auto p-2 justify-between items-center space-y-2 rounded z-40'>
					<button className={`text-xs flex items-center group cursor-pointer p-1 rounded  ${ selectedFavorite ? 'bg-blue-700  ' : 'hover:bg-blue-700 bg-slate-900 ' } transition-colors`}
						onClick={handleFavorites}
					>
						<StarIcon className='w-4 h-4' />
						<p className='hidden group-hover:block ml-1'>{selectedFavorite ? 'Remove from favorite' : 'Add to favorites'}</p>
					</button>
					<button className={`text-xs flex items-center group cursor-pointer  p-1 rounded group ${ selectedBookmark ? 'bg-blue-700' : 'hover:bg-blue-700 bg-slate-900' } transition-colors`} onClick={handleAddBookmark} disabled={loading}>
						<BookmarkIcon className={`w-4 h-4 ${ selectedBookmark ? " " : "" }`} />
						<p className='hidden group-hover:block ml-1'>{selectedBookmark ? 'Remove bookmark' : 'Bookmark this!'}</p>
					</button>
				</div> : ""}
			</div>
			<div className="h-auto w-full mt-2 space-y-4">
				<Link to={`/anime/${ parseTitle(props.title) }/${ props.mal_id }`}>
					<p className="transition-all line-clamp-1 hover:line-clamp-none">{props.title}</p>
				</Link>
				<div className='mt-2 space-y-2'>
					<div className='flex justify-between'>
						<span className='text-xs capitalize'>{props.season} &#183; {props.status}</span>
						{type === "rank" && <span className='text-xs'>Rank: {props.rank}</span>}
					</div>
					<div className='flex space-x-2 pt-2'>
						<DisplayGenres genres={Array.prototype.concat(props.genres, props.themes)} />
					</div>
				</div>
			</div>
		</div>)
}

export default Card;