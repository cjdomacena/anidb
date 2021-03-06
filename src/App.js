import { useContext, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { Routes, Route, Outlet, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import { UserContext, UserProvider } from './context';
import './index.css';
import Anime from './pages/Anime';
import Bookmarks from './pages/Bookmarks';
import Favorites from './pages/Favorites';
import Home from './pages/Home';
import Login from './pages/Signup';
import SuccessSignup from './pages/SuccessSignup';
import Error from './pages/404';
import TopAnime from './pages/TopAnime';
import Search from './pages/Search';

function App()
{
	const [isOpen, setIsOpen] = useState(false)
	return (
		<UserProvider>
			<div className='relative' id='container'>
				<Navbar setIsOpen={setIsOpen} />
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/top-anime' element={<TopAnime />}/>
					<Route path='/error' element={<Error />} />
					<Route path="/signup" element={<Login />} />
					<Route path="/success-signup" element={<SuccessSignup />} />
					<Route element={<ProtectedRoutes />}>
						<Route path="/favorites" element={<Favorites />} />
						<Route path="/bookmarks" element={<Bookmarks />} />
					</Route>
					<Route path="anime/:title/:id" element={<Anime />} />
				</Routes>
			</div>
			{isOpen && <Search className setIsOpen={setIsOpen}/>}
			<Toaster position='bottom-center' />
		</UserProvider>
	)
}

function useAuth()
{
	const { session } = useContext(UserContext);
	return session ? true : false;
}

function ProtectedRoutes()
{
	const auth = useAuth();
	return auth ? <Outlet /> : <Navigate to="/" />
}

export default App;