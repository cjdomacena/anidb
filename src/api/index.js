const BASE_URL = "https://api.jikan.moe/v4"

export const getRecommendations = async ({ page }) =>
{
	const req = await fetch(`${ BASE_URL }/recommendations/anime?page=${ page
		}`);
	const res = await req.json();
	return res;
}

export const getCurrentSeason = async (page) =>
{
	const req = await fetch(`${ BASE_URL }/seasons/now?page=${ page }`);
	const res = await req.json();
	return res;
}

export const getTopAnime = async (page = 1, type = null, filter = null) =>
{
	const req = await fetch(`${ BASE_URL }/top/anime?page=${ page }&type=${ type?.value }&filter=${ null }`);
	const res = await req.json();
	return res;
}

export const getAnimeById = async (mal_id) =>
{
	const req = await fetch(`${ BASE_URL }/anime/${ mal_id }`);
	const res = await req.json();
	return res;
}

export const getAnimeGenres = async () =>
{
	const req = await fetch(`${ BASE_URL }/genres/anime`);
	const res = await req.json();
	return res;
}

export const getAnimeSearch = async (q, isSFW) =>
{
	if (q.length > 2)
	{
		const req = await fetch(`${ BASE_URL }/anime?q=${ q }&page=1&limit=8&${ isSFW ? 'sfw' : "" }`)
		const res = await req.json();
		return res;
	}
}
