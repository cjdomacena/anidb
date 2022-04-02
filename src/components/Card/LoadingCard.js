import { BookmarkIcon, StarIcon } from '@heroicons/react/outline'

function LoadingCard() {
	return <div className="w-full p-4">
		<div className="w-full bg-slate-800 relative rounded">
			<div className="w-full h-96 bg-slate-700 animate-pulse" />

		</div>
		<div className="h-auto w-full mt-2 space-y-4">
			<p className="transition-all w-full animate-pulse bg-slate-700"></p>
			<div className='flex items-center justify-between mt-2 space-x-4'>
				<p className='text-xs animate-pulse bg-slate-700 px-2 rounded w-full h-2'></p>
				<span className='text-xs capitalize w-12 animate-pulse bg-slate-700 h-2'></span>
			</div>

		</div>
	</div>
}

export default LoadingCard;