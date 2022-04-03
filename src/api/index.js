const BASE_URL = "https://api.jikan.moe/v4"

export const getRecommendations = async ({page}) =>
{
	const req = await fetch(`${ BASE_URL }/recommendations/anime?page=${ page
}`);
	const res = await req.json();
	return res;
}

export const getCurrentSeason = async ( page ) =>
{
	const req = await fetch(`${ BASE_URL }/seasons/now?page=${page}`);
	const res = await req.json();
	return res;
}
