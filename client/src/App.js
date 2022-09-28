import {Routes, Route, Navigate} from 'react-router-dom';
import {useSelector} from 'react-redux';

import Navbar from './components/Navbar';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Write from './pages/Write';
import Profile from './pages/Profile';
import SinglePost from './pages/SinglePost';

import './App.css';

function App() {
	const user = useSelector(state => state.user.currentUser); // Logged in user from redux

	return (
		<div className='backgroundContainer'>
			<Routes>
				<Route path='/' element={<Navbar />}>
					<Route index element={<Home />} />
					<Route path='/register' element={user ? <Navigate to='/' /> : <Register />} />
					<Route path='/login' element={user ? <Navigate to='/' /> : <Login />} />
					<Route path='/write' element={user ? <Write /> : <Navigate to='/login' />} />
					<Route
						path='/profile'
						element={user ? <Profile /> : <Navigate to='/login' />}
					/>
					<Route path='/post/:id' element={<SinglePost />} />
				</Route>
			</Routes>
		</div>
	);
}

export default App;
