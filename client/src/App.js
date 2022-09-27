import {Routes, Route} from 'react-router-dom';

import Navbar from './components/Navbar';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Write from './pages/Write';
import Profile from './pages/Profile';
import SinglePost from './pages/SinglePost';

import './App.css';

function App() {
	const user = true; // Used to mimic a logged in user in redux

	return (
		<div className='backgroundContainer'>
			<Routes>
				<Route path='/' element={<Navbar />}>
					<Route index element={<Home />} />
					<Route path='/register' element={user ? <Home /> : <Register />} />
					<Route path='/login' element={user ? <Home /> : <Login />} />
					<Route path='/write' element={user ? <Write /> : <Login />} />
					<Route path='/profile' element={user ? <Profile /> : <Login />} />
					<Route path='/post/:id' element={<SinglePost />} />
				</Route>
			</Routes>
		</div>
	);
}

export default App;
