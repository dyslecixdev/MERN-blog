import {useState} from 'react';
import {Link} from 'react-router-dom';

import {TextField, Button, Paper, Typography} from '@mui/material';

function Login() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

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
				<Button variant='contained' type='submit'>
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
