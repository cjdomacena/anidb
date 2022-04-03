import { Toaster } from 'react-hot-toast';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import { UserProvider } from './context';
import './index.css';
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
				</Routes>
				<Toaster position='top-right' />
			</div>
		</UserProvider>
	)
}

export default App;