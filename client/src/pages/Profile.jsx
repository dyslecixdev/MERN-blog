import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {
	TextField,
	Button,
	Paper,
	ButtonGroup,
	Avatar,
	Typography,
	Modal,
	Box,
	Tooltip,
	Fab
} from '@mui/material';
import {Add} from '@mui/icons-material';

import axios from 'axios';

import {
	updateUserStart,
	updateUserSuccess,
	updateUserFailure,
	deleteUserStart,
	deleteUserSuccess,
	deleteUserFailure
} from '../redux/userRedux';

import DefaultProfile from '../assets/default-profile.jpg';

function Profile() {
	const user = useSelector(state => state.user.currentUser);

	const [editMode, setEditMode] = useState(false);
	const [openModal, setOpenModal] = useState(false);
	const [username, setUsername] = useState(user.username);
	const [email, setEmail] = useState(user.email);
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [profilePic, setProfilePic] = useState('');
	const [errorMessage, setErrorMessage] = useState('');

	const dispatch = useDispatch();
	const {isFetching} = useSelector(state => state.user);

	// Updates a user
	const handleSubmit = async e => {
		e.preventDefault();
		dispatch(updateUserStart());
		const formData = new FormData();
		formData.append('username', username);
		formData.append('email', email);
		formData.append('password', password);
		formData.append('confirmPassword', confirmPassword);
		formData.append('profilePic', profilePic);
		formData.append('isAdmin', user.isAdmin); // Sets isAdmin as its previous value from state
		try {
			const res = await axios.put(`http://localhost:5000/users/${user.id}`, formData, {
				headers: {
					Authorization: 'Bearer ' + user.token
				}
			});
			dispatch(updateUserSuccess(res.data));
			handleReset();
		} catch (err) {
			setErrorMessage(err.response.data);
			dispatch(updateUserFailure());
		}
	};

	// Deletes a user
	const handleDelete = async e => {
		e.preventDefault();
		dispatch(deleteUserStart());
		try {
			await axios.delete(`http://localhost:5000/users/${user.id}`, {
				headers: {
					Authorization: 'Bearer ' + user.token
				}
			});
			dispatch(deleteUserSuccess());
			// navigate not needed here because App.js will navigate to the login page
		} catch (err) {
			setErrorMessage(err.response.data);
			dispatch(deleteUserFailure());
		}
	};

	// Resets the form when Cancel is clicked
	const handleReset = () => {
		setEditMode(false);
		setUsername(user.username);
		setEmail(user.email);
		setPassword('');
		setConfirmPassword('');
		setProfilePic('');
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
							width: {
								xs: '100%',
								sm: '80%',
								md: '70%'
							},
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
						<Button type='button' onClick={handleReset} disabled={isFetching}>
							Cancel
						</Button>
						<Button type='submit' color='success' disabled={isFetching}>
							Update
						</Button>
						<Button
							type='button'
							color='error'
							onClick={() => setOpenModal(true)}
							disabled={isFetching}
						>
							Delete
						</Button>
					</ButtonGroup>

					{/* Modal is a popup window to confirm if the user wants to delete their account */}
					<Modal open={openModal} onClose={() => setOpenModal(false)}>
						<Box
							sx={{
								width: {
									xs: '100%',
									sm: '75%',
									md: '50%',
									lg: '35%',
									xl: '25%'
								},
								height: '20vh',
								padding: '1rem',
								position: 'absolute',
								top: '50%',
								left: '50%',
								transform: 'translate(-50%, -50%)',
								display: 'flex',
								flexDirection: 'column',
								justifyContent: 'space-between',
								background: 'white',
								border: '2px solid #000'
							}}
						>
							<Typography variant='h6' component='h2'>
								Are you sure you want to delete your profile?
							</Typography>
							<ButtonGroup
								variant='contained'
								disableElevation
								sx={{
									width: '100%',
									display: 'flex',
									justifyContent: 'space-between'
								}}
							>
								<Button
									type='button'
									color='error'
									onClick={handleDelete}
									disabled={isFetching}
								>
									Yes, I am sure
								</Button>
								<Button
									type='button'
									onClick={() => setOpenModal(false)}
									disabled={isFetching}
								>
									No, I need to think
								</Button>
							</ButtonGroup>
						</Box>
					</Modal>
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
					<Avatar
						alt={user.username}
						src={user.profilePic || DefaultProfile}
						color='inherit'
					/>
					<Typography variant='h5'>Username: {user.username}</Typography>
					<Typography variant='h5'>Email: {user.email}</Typography>
					<Button onClick={() => setEditMode(true)}>Change Your Information</Button>
				</Paper>
			)}
		</div>
	);
}

export default Profile;
