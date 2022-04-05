import { useEffect, useState } from 'react';
import Select from 'react-select'
import { getAnimeGenres } from '../../api';

function SelectT()
{
	const [items, setItems] = useState([]);

	const [genres, setGenres] = useState([]);
	const transformSelect = (genres) =>
	{
		const tempArr = [];
		if (genres)
		{

			genres.map((item) => tempArr.push({
				'label': item.name, 'value': item.name
			}))

		}
		return tempArr
	}

	useEffect(() =>
	{
		const getGenres = async () =>
		{
			const data = await getAnimeGenres();

			setItems(data);
		}
		getGenres();
	}, [])

	return (
		<div>
			{items && <Select blurInputOnSelect className='w-auto ring-slate-600 text-slate-900 text-sm bg-slate-900' options={transformSelect(items.data)} isClearable placeholder="Select Genre" isMulti onChange={(selected) => setGenres(selected)} />}
			{console.log(genres)}
		</div>
	)
}

export default SelectT;