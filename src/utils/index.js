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