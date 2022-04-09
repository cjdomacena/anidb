import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { getAnimeById } from "../api";
import imageUnavailable from '../assets/imageUnavailable.png'
import DisplayGenres from "../components/Badge/Genre";

function Anime()
{
	const params = useParams();
	const navigate = useNavigate();
	const [anime, setAnime] = useState(null);
	// const m_id = params.match.
	const { data, isFetching, isError } = useQuery(['anime', params.id], () => getAnimeById(params.id), {
		refetchOnWindowFocus: false,
	});

	if (isError)
	{
		navigate("/error");
	}


	const addBreaks = (paragraph) =>
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

	const ShowParagraph = ({ paragraph }) =>
	{
		return paragraph.map((item, index) => <p className="leading-loose text-neutral-300" key={index}>{item}.</p>)
	}


	useEffect(() =>
	{
		if (data)
		{
			setAnime(data.data)
		}

	}, [data])

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