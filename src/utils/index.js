export const isBookmarked = (mal_id, bookmark) =>
{
	if (bookmark)
	{
		let temp = bookmark.filter((item) => item.bookmarked.mal_id === mal_id)
		if (temp.length > 0)
		{
			return true;
		}
	}

	return false
}

export const isFavorite = (mal_id, favorite) =>
{
	if (favorite)
	{
		let temp = favorite.filter((item) => item.favorite.mal_id === mal_id)
		if (temp.length > 0)
		{
			return true;
		}
	}

	return false
}

export const parseTitle = (title) =>
{
	return (title.split(/[ ,.\s]/).join("-")).toLowerCase();
}

export const addBreaks = (paragraph) =>
{

	if (paragraph)
	{
		const periods = paragraph.split('.');
		let max = 1;

		if (periods.length > 6 && periods.length < 24)
		{
			max = 3;
		} else if (periods.length > 24 && periods.length < 36)
		{
			max = 4;
		} else if (periods.length > 36)
		{
			max = 5;
		} else
		{
			max = 1;
		}
		let tempArr = [];
		let temp = [];
		let stop = Math.round(periods.length / max);
		// let i = Math.round(periods / 4);
		for (let i = 0; i < periods.length; i++)
		{
			temp.push(periods[i]);
			if (i % stop === 0)
			{
				tempArr.push(temp.join('.'));
				temp = [];
			}
		}
		return tempArr
	}
	return ["No synopsis available"]

}

/**
 * @param  {Boolean} current
 * @param  {Function} supabase
 * @param  {Object} props
 * @param  {Array} bookmarked
 * @param  {Function} setBookmarked
 */
export const handleAddBookmark = async (current, supabase, props, bookmarked, setBookmarked) =>
{
	let response = { status: 0, message: '' }
	if (current)
	{
		const { error } = await supabase.rpc('add_bookmark', {
			'bookmark': props, 'm_id': props.mal_id
		})
		if (!error)
		{
			response.status = 200;
			response.message = 'successfully added to bookmarks';
		} else
		{
			response.status = error.status;
			response.message = error.message;
		}
	} else
	{
		const { error } = await supabase.rpc('remove_bookmark', {
			'm_id': props.mal_id
		})
		let temp = bookmarked.filter((item) => item.bookmarked.mal_id !== props.mal_id)
		setBookmarked(temp);
		if (!error)
		{
			response.status = 200;
			response.message = 'successfully removed from bookmarks';
		} else
		{
			response.status = error.status;
			response.message = error.message;
		}
	}
	return response
}


export const handleAddFavorite = async (current, supabase, props, favorites, setFavorites) =>
{
	let response = { status: 0, message: '' }
	if (current)
	{
		const { error } = await supabase.rpc('add_favorite', { 'param': props, 'm_id': props.mal_id });
		if (!error)
		{
			response.status = 200;
			response.message = 'successfully added to favorites';
		} else
		{
			response.status = error.status;
			response.message = error.message;
		}
	} else
	{
		const { error } = await supabase.rpc('remove_favorite', { 'm_id': props.mal_id });
		const temp = favorites.filter((item) => item.favorite.mal_id !== props.mal_id)
		setFavorites(temp);
		if (!error)
		{
			response.status = 200;
			response.message = 'successfully removed from favorites';
		} else
		{
			response.status = error.status;
			response.message = error.message;
		}
	}
	return response
}

