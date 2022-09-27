import {useState} from 'react';

import {TextField, Button, Paper, ButtonGroup, Avatar, Typography} from '@mui/material';

function Profile() {
	const [editMode, setEditMode] = useState(false);
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
			{/* Either the user's information or a form to edit the user's information */}
			{editMode ? (
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
					<ButtonGroup
						variant='contained'
						disableElevation
						sx={{
							width: {xs: '100%', sm: '50%'},
							display: 'flex',
							justifyContent: 'space-between'
						}}
					>
						<Button type='button' onClick={() => setEditMode(false)}>
							Cancel
						</Button>
						<Button type='submit' color='success'>
							Update
						</Button>
						<Button type='button' color='error'>
							Delete
						</Button>
					</ButtonGroup>
				</Paper>
			) : (
				<Paper
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
					<Avatar alt='Christian Demesa' color='inherit' />
					<Typography variant='h5'>Username</Typography>
					<Typography variant='h5'>Email</Typography>
					<Button onClick={() => setEditMode(true)}>Edit</Button>
				</Paper>
			)}
		</div>
	);
}

export default Profile;
