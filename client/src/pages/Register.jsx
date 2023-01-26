// Register page

import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';

import {TextField, Button, Paper, Typography, Fab, ButtonGroup, Tooltip} from '@mui/material';
import {Add} from '@mui/icons-material';

import axios from 'axios';

import {loginStart, loginSuccess, loginFailure} from '../redux/userRedux';

function Register() {
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [profilePic, setProfilePic] = useState('');
	const [errorMessage, setErrorMessage] = useState('');

	const dispatch = useDispatch();
	const {isFetching} = useSelector(state => state.user);

	const navigate = useNavigate();

	// Registers a user then logs into the app
	const handleSubmit = async e => {
		e.preventDefault();
		dispatch(loginStart());
		const formData = new FormData(); // Uses FormData to send a 'multipart/form-data' since there is an image
		formData.append('username', username);
		formData.append('email', email);
		formData.append('password', password);
		formData.append('confirmPassword', confirmPassword);
		formData.append('profilePic', profilePic);
		formData.append('isAdmin', false);
		try {
			const res = await axios.post(
				'https://mern-blog-backend-g1kq.onrender.com/users/register',
				formData
			); // Sends the email and password to the register user URL
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
				component='form'
				onSubmit={handleSubmit}
				encType='multipart/form-data'
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
					label='Username'
					type='text'
					required
					value={username}
					onChange={e => setUsername(e.target.value)}
				/>
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
				<TextField
					label='Confirm Password'
					type='password'
					required
					value={confirmPassword}
					onChange={e => setConfirmPassword(e.target.value)}
				/>
				<ButtonGroup
					variant='contained'
					disableElevation
					sx={{
						width: '100%',
						display: 'flex',
						justifyContent: 'space-between'
					}}
				>
					<Tooltip title='Profile Picture (optional)' placement='top'>
						<Fab
							component='label'
							htmlFor='profilePicUpload'
							type='button'
							color='secondary'
							disabled={isFetching}
						>
							<Add />
							<input
								id='profilePicUpload'
								type='file'
								hidden
								onChange={e => setProfilePic(e.target.files[0])}
							/>
						</Fab>
					</Tooltip>
					<Button type='submit' disabled={isFetching}>
						Register
					</Button>
				</ButtonGroup>
			</Paper>
		</div>
	);
}

export default Register;
