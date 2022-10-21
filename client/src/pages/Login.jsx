// Login page

import {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';

import {TextField, Button, Paper, Typography} from '@mui/material';

import axios from 'axios';

import {loginStart, loginSuccess, loginFailure} from '../redux/userRedux';

function Login() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [errorMessage, setErrorMessage] = useState('');

	const dispatch = useDispatch(); // dispatch is used to dispatch a reducer function
	const {isFetching} = useSelector(state => state.user);

	const navigate = useNavigate(); // navigate is used to redirect to another page

	// Logs into the app
	const handleSubmit = async e => {
		e.preventDefault();
		dispatch(loginStart());
		try {
			const res = await axios.post('http://localhost:5000/users/login', {email, password}); // Sends the email and password to the register user URL
			dispatch(loginSuccess(res.data)); // Sends the data as an action payload to the reducer function
			navigate('/');
		} catch (err) {
			setErrorMessage(err.response.data); // Sets the error message from the server side
			dispatch(loginFailure());
		}
	};

	return (
		<div
			style={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				padding: '2rem 0'
			}}
		>
			<Paper
				elevation={3}
				// Paper is a form tag
				component='form'
				onSubmit={handleSubmit}
				sx={{
					width: {
						xs: '100%',
						sm: '90%',
						md: '75%',
						lg: '50%',
						xl: '40%'
					},
					padding: '1rem',
					display: 'flex',
					flexDirection: 'column',
					gap: '2rem',
					background: 'white'
				}}
			>
				{errorMessage && (
					<Typography color='error' sx={{textAlign: 'center'}}>
						{errorMessage}
					</Typography>
				)}
				<TextField
					label='Email'
					type='email'
					required
					value={email}
					onChange={e => setEmail(e.target.value)}
				/>
				<TextField
					label='Password'
					type='password'
					required
					value={password}
					onChange={e => setPassword(e.target.value)}
				/>
				{/* Button cannot be clicked while isFetching is true in redux */}
				<Button variant='contained' type='submit' disabled={isFetching}>
					Login
				</Button>
				<Typography variant='p'>
					Don't have an account? Click{' '}
					<Link to='/register' style={{color: 'blue', textDecoration: 'none'}}>
						here
					</Link>
					.
				</Typography>
			</Paper>
		</div>
	);
}

export default Login;
