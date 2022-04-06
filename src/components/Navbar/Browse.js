import { ChevronDownIcon } from '@heroicons/react/solid'

function Browse({ setToggleBrowse})
{
	return <>
	<button className={`hover:bg-slate-700 font-medium text-white  h-full  flex items-center p-4`
	} onClick={() => setToggleBrowse(prev => !prev)} >
		Browse <ChevronDownIcon className="w-4  h-4 ml-1" />
	</button>

	</>
}
export default Browse;