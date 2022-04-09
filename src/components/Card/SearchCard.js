import DisplayGenres from "../Badge/Genre";
import imageUnavailable from './../../assets/imageUnavailable.png'
import { Link } from 'react-router-dom'
import { parseTitle } from '../../utils'
function SearchCard({ props, setIsOpen })
{
	return (
		<div className="w-full bg-slate-800 rounded hover:bg-slate-600 transition-colors">
			<div className="p-4 flex items-center space-x-4">
				<div className="w-36">
					<img src={props.images.webp["small_image_url"]} className="h-24 w-auto" onError={(e) => { e.currentTarget.src = imageUnavailable }} alt={props.title} />
				</div>
				<div>
					<Link to={`/anime/${ parseTitle(props.title) }/${ props.mal_id }`} onClick={() => setIsOpen(false)}><h1 className="text-xl font-medium hover:cursor-pointer">{props.title}</h1></Link>
					<p className=" line-clamp-2 text-sm">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Distinctio reiciendis at exercitationem dolorum, quisquam perferendis, temporibus cumque rem unde error nobis ratione vel id hic!</p>
					<DisplayGenres genres={Array.prototype.concat(props.genres, props.themes)} />
				</div>
			</div>
		</div>)
}

export default SearchCard;