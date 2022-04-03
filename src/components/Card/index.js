import { BookmarkIcon, StarIcon } from '@heroicons/react/outline';
import { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { supabase } from '../../client';
import { UserContext } from './../../context'
function Card({ props, isBookmarked })
{
	const { session } = useContext(UserContext);
	const [selectedBookmark, setSelectedBookmark] = useState(false);
	const [selectedFavorite, setSelectedFavorite] = useState(false);

	const [loading, setLoading] = useState();


	const handleAddBookmark = async () =>
	{
		setLoading(true);
		if (session)
		{
			const current = selectedBookmark ? false : true
			setSelectedBookmark(current);
			if (current)
			{
		
				const { error } = await supabase.rpc('add_bookmark', { 'param': props.mal_id });
				if (!error)
				{
					setLoading(false);
					toast.success(`${ props.title
						} successfully added to bookmarks!`, { className: "bg-slate-800 border rounded border-slate-800 text-white" })
				} else
				{
					toast.error(error.message);
					setLoading(false);
				}
			} else if (!current)
			{
				const { error } = await supabase.rpc('remove_bookmark', { 'mal_id': props.mal_id })
				if (!error)
				{
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

	const handleFavorites = () =>
	{
		if (session)
		{
			const current = selectedFavorite ? false : true
			setSelectedFavorite(current)
			current ? toast.success(`${ props.title
				} successfully added to your favorites`, { className: "bg-slate-600 border rounded border-slate-800 text-white" }) :
				toast.error(`${ props.title } successfully removed from favorites!`, { className: "bg-slate-600 border rounded border-slate-800 text-white" })
		} else
		{
			toast.error("You must be logged in to add this to your favorites", { className: "bg-yellow-300" })
		}
	}

	useEffect(() => {
		// Will change state when isBookmarked changes.
		setSelectedBookmark(isBookmarked);
	},[isBookmarked])

	return (
		<div className="w-full p-4">
			<div className="w-full bg-slate-800 relative">
				<img src={props.images.webp["large_image_url"]} alt={props.title} className="w-full h-96 object-cover " />
				<div className='absolute top-2 left-2 w-auto p-2 justify-between items-center space-y-2 rounded'>
					<button className={`text-xs flex items-center group cursor-pointer  p-1 rounded group ${ selectedFavorite ? 'bg-blue-700' : 'hover:bg-blue-700 bg-slate-900/90' } transition-colors`}
						onClick={handleFavorites}
					>
						<StarIcon className='w-4 h-4' />
						<p className='hidden group-hover:block ml-1'>{selectedFavorite ? 'Remove from favorite' : 'Add to favorites'}</p>
					</button>
					<button className={`text-xs flex items-center group cursor-pointer  p-1 rounded group ${ selectedBookmark ? 'bg-blue-700' : 'hover:bg-blue-700 bg-slate-900/90' } transition-colors`} onClick={handleAddBookmark} disabled={loading}>
						<BookmarkIcon className={`w-4 h-4 ${ selectedBookmark ? " " : "" }`} />
						<p className='hidden group-hover:block ml-1'>{selectedBookmark ? 'Remove bookmark' : 'Bookmark this!'}</p>
					</button>
				</div>
			</div>
			<div className="h-auto w-full mt-2 space-y-4">
				<p className="transition-all">{props.title}</p>
				<div className='flex items-center justify-between mt-2'>
					<p className='text-xs bg-blue-800 px-2 rounded'>{props.type}</p>
					<span className='text-xs capitalize'>{props.season} &#183; {props.status}</span>
				</div>

			</div>
		</div>)
}

export default Card;