import { useContext } from 'react';
import { Toaster } from 'react-hot-toast';
import { Routes, Route, Outlet, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import { UserContext, UserProvider } from './context';
import './index.css';
import Bookmarks from './pages/Bookmarks';
import Favorites from './pages/Favorites';
import Home from './pages/Home';
import Login from './pages/Signup';
import SuccessSignup from './pages/SuccessSignup';


function App()
{
	return (
		<UserProvider>
			<div>
				<Navbar />
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path="/signup" element={<Login />} />
					<Route path="/success-signup" element={<SuccessSignup />} />
					<Route element={<ProtectedRoutes />}>
						<Route path="/favorites" element={<Favorites />} />
						<Route path="/bookmarks" element={<Bookmarks />} />
					</Route>
				</Routes>
				<Toaster position='bottom-center' />
			</div>
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
	return auth ? <Outlet /> : <Navigate to="/signup" />
}

export default App;