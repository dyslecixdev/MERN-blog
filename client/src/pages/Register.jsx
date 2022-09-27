import {useState} from 'react';

import {TextField, Button, Paper} from '@mui/material';

function Register() {
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');

	const handleSubmit = e => {
		e.preventDefault();
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
				<Button variant='contained' type='submit'>
					Register
				</Button>
			</Paper>
		</div>
	);
}

export default Register;
