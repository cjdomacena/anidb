import successImage from './../assets/success.png'
function SuccessSignup()
{
	return (
		<div className="absolute w-screen h-screen top-0 left-0 bg-slate-900 grid place-items-center">
			<div className="w-96 h-auto">

				<img src={successImage} alt="Woman raising her arm in celebration while sitting on a gift box" className='w-full h-auto' />
				<div>
					<h1 className='text-white text-6xl font-extrabold text-center mb-2'>YAHOOO!🎉</h1>
					<h2 className='text-white text-center mt-4'> Check your email for the magic link!</h2>
				</div>
			</div>

		</div>
	)
}

export default SuccessSignup;