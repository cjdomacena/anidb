import { BookmarkIcon, StarIcon } from '@heroicons/react/outline'
function Card({ props })
{
	return (
		<div className="w-full p-4">
			<div className="w-full bg-slate-800 relative">
				<img src={props.images.webp["large_image_url"]} alt={props.title} className="w-full h-96 object-cover " />
				<div className='absolute top-2 right-2 w-auto p-2 flex justify-between items-center bg-slate-900/90 space-x-2 rounded'>
					<button className='text-xs flex items-center group cursor-pointer'>
						<StarIcon className='w-4 h-4' />
					</button>
					<button className='text-xs flex items-center group cursor-pointer'>
						<BookmarkIcon className='w-4 h-4 hover:text-blue-500 hover:fill-blue-600' />
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