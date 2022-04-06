function DisplayGenres({ genres }) 
{
	return (<ul className="mt-2 flex flex-wrap  w-full gap-2">
		{genres.map((genre) => <li key={genre.name} className="text-xs bg-slate-700 p-1 rounded w-fit h-fit">{genre.name}
		</li>)}
	</ul>)
}

export default DisplayGenres;