// Create a post page

import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {useSelector} from 'react-redux';

import {
	Paper,
	TextField,
	InputLabel,
	Stack,
	Select,
	MenuItem,
	Button,
	Typography,
	ButtonGroup,
	Tooltip,
	Fab
} from '@mui/material';
import {Add} from '@mui/icons-material';

import axios from 'axios';

function Write() {
	const user = useSelector(state => state.user.currentUser);

	const [title, setTitle] = useState('');
	const [desc, setDesc] = useState('');
	const [categories, setCategories] = useState('');
	const [photo, setPhoto] = useState('');
	const [errorMessage, setErrorMessage] = useState('');

	const navigate = useNavigate();

	// Creates a post
	const handleSubmit = async e => {
		e.preventDefault();
		const formData = new FormData();
		formData.append('title', title);
		formData.append('desc', desc);
		formData.append('categories', categories);
		formData.append('photo', photo);
		// todo Include likeCount
		formData.append('user', user.username);
		formData.append('userAvatar', user.profilePic);
		try {
			await axios.post('http://localhost:5000/posts', formData, {
				headers: {
					Authorization: 'Bearer ' + user.token
				}
			});
			navigate('/');
		} catch (err) {
			setErrorMessage(err.response.data);
		}
	};

	return (
		// Create a post form
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
				{errorMessage && (
					<Typography color='error' sx={{textAlign: 'center'}}>
						{errorMessage}
					</Typography>
				)}
				<TextField
					label='Title'
					type='text'
					required
					value={title}
					onChange={e => setTitle(e.target.value)}
				/>
				<TextField
					label='Description'
					type='text'
					required
					multiline
					rows={4}
					value={desc}
					onChange={e => setDesc(e.target.value)}
				/>
				<Stack>
					<InputLabel id='categories'>Categories</InputLabel>
					<Select
						labelId='categories'
						value={categories}
						onChange={e => setCategories(e.target.value)}
					>
						<MenuItem value={'rock'}>Rock</MenuItem>
						<MenuItem value={'pop'}>Pop</MenuItem>
						<MenuItem value={'funk'}>Funk</MenuItem>
						<MenuItem value={'country'}>Country</MenuItem>
						<MenuItem value={'jazz'}>Jazz</MenuItem>
						<MenuItem value={'classical'}>Classical</MenuItem>
					</Select>
				</Stack>
				<ButtonGroup
					variant='contained'
					disableElevation
					sx={{
						width: {
							xs: '60%',
							sm: '30%'
						},
						display: 'flex',
						justifyContent: 'space-between'
					}}
				>
					<Tooltip title='Photo (optional)' placement='top'>
						<Fab
							component='label'
							htmlFor='photoUpload'
							type='button'
							color='secondary'
						>
							<Add />
							<input
								id='photoUpload'
								type='file'
								hidden
								onChange={e => setPhoto(e.target.files[0])}
							/>
						</Fab>
					</Tooltip>
					<Button variant='contained' type='submit'>
						Post
					</Button>
				</ButtonGroup>
			</Paper>
		</div>
	);
}

export default Write;
