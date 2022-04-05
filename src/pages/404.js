import { useEffect } from "react";
import errorImg from './../assets/404.png'
function Error()
{
	useEffect(() =>
	{
		document.getElementsByTagName('body')[0].classList.add('overflow-hidden')
	}, [])
	return <div className="bg-slate-900 w-full h-screen grid place-items-center z-auto">
		<div className="mb-24">
			<img src={errorImg} className="w-[500px] h-auto" alt="woman fixing a robot" />
			<h1 className="text-white font-bold text-4xl text-center">404 | Something went wrong</h1>
		</div>
	</div>
}
export default Error;