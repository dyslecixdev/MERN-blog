import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';

import {
	Paper,
	TextField,
	InputLabel,
	Stack,
	Select,
	MenuItem,
	Button,
	Typography
} from '@mui/material';

import axios from 'axios';

import {createPost} from '../redux/postRedux';

function Write() {
	const user = useSelector(state => state.user.currentUser);

	const [title, setTitle] = useState('');
	const [desc, setDesc] = useState('');
	const [categories, setCategories] = useState('');
	const [errorMessage, setErrorMessage] = useState('');

	const dispatch = useDispatch();
	const {isFetching} = useSelector(state => state.user);

	const navigate = useNavigate();

	// Creates a post
	const handleSubmit = async e => {
		e.preventDefault();
		try {
			const res = await axios.post(
				'http://localhost:5000/posts',
				{
					title,
					desc,
					categories, // ? Do I need to include likeCount
					photo: '', // todo Include profilePic with multer in server
					user: user.username
				},
				{
					headers: {
						Authorization: 'Bearer ' + user.token
					}
				}
			);
			dispatch(createPost(res.data));
			navigate('/');
		} catch (err) {
			setErrorMessage(err.response.data);
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
				<Button variant='contained' type='submit' disabled={isFetching}>
					Post
				</Button>
			</Paper>
		</div>
	);
}

export default Write;
