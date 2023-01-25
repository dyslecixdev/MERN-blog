// Page that shows a post's full information, and an edit form for the user who created it or an admin

import {useState, useEffect} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import {useSelector} from 'react-redux';

import {
	Card,
	CardHeader,
	Avatar,
	CardMedia,
	CardContent,
	Typography,
	CardActions,
	IconButton,
	Checkbox,
	Button,
	TextField,
	ButtonGroup,
	InputLabel,
	Select,
	MenuItem,
	Stack,
	Paper,
	Tooltip,
	Modal,
	Box,
	Fab
} from '@mui/material';
import {Favorite, FavoriteBorder, Add} from '@mui/icons-material';

import axios from 'axios';

import DefaultProfile from '../assets/default-profile.jpg';
import DefaultPhoto from '../assets/default-photo.jpg';

const monthNames = [
	0,
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December'
];

function SinglePost() {
	const {id} = useParams();
	const user = useSelector(state => state.user.currentUser);

	const [editMode, setEditMode] = useState(false);
	const [openModal, setOpenModal] = useState(false);
	const [post, setPost] = useState({});
	const [title, setTitle] = useState('');
	const [desc, setDesc] = useState('');
	const [categories, setCategories] = useState('');
	const [photo, setPhoto] = useState('');
	const [errorMessage, setErrorMessage] = useState('');
	const [month, setMonth] = useState(0);
	const [day, setDay] = useState(0);
	const [year, setYear] = useState(0);

	const navigate = useNavigate();

	// Gets the current post's data
	useEffect(() => {
		async function fetchData() {
			try {
				const res = await axios.get(
					`https://mern-blog-backend-g1kq.onrender.com/posts/${id}`
				);
				setPost(res.data);
			} catch (err) {
				console.log(err);
			}
		}
		fetchData();
	}, [id, editMode]); // Included editMode as a dependency, so that the Card updates with the information

	// Second useEffect to seperate the data from the post object because it is still being fetched in the above useEffect
	useEffect(() => {
		setTitle(post.title);
		setDesc(post.desc);
		setCategories(post.categories);
		// if statement needed to avoid bug where split() on undefined creates an error
		if (post.updatedAt) {
			setMonth(parseInt(post.updatedAt.split('-')[1]));
			setDay(post.updatedAt.split('-')[2].slice(0, 2));
			setYear(post.updatedAt.split('-')[0]);
		}
	}, [post]);

	// Updates a post
	const handleSubmit = async e => {
		e.preventDefault();
		const formData = new FormData();
		formData.append('title', title);
		formData.append('desc', desc);
		formData.append('categories', categories);
		formData.append('photo', photo);
		// todo include likeCount
		formData.append('user', post.user);
		formData.append('userAvatar', post.userAvatar);
		try {
			await axios.put(`https://mern-blog-backend-g1kq.onrender.com/posts/${id}`, formData, {
				headers: {
					Authorization: 'Bearer ' + user.token
				}
			});
			setEditMode(false);
		} catch (err) {
			setErrorMessage(err.response.data);
		}
	};

	// Deletes a post
	const handleDelete = async e => {
		e.preventDefault();
		try {
			await axios.delete(`https://mern-blog-backend-g1kq.onrender.com/posts/${id}`, {
				headers: {
					Authorization: 'Bearer ' + user.token
				}
			});
			navigate('/');
		} catch (err) {
			setErrorMessage(err.response.data);
		}
	};

	// Resets the form when Cancel is clicked
	const handleReset = () => {
		setEditMode(false);
		setTitle(post.title);
		setDesc(post.desc);
		setCategories(post.categories);
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
			{/* Either the post's information or a form to edit the post's information */}
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
							>
								<Add />
								<input
									id='profilePicUpload'
									type='file'
									hidden
									onChange={e => setPhoto(e.target.files[0])}
								/>
							</Fab>
						</Tooltip>
						<Button type='button' onClick={handleReset}>
							Cancel
						</Button>
						<Button type='submit' color='success'>
							Update
						</Button>
						<Button type='button' color='error' onClick={() => setOpenModal(true)}>
							Delete
						</Button>
					</ButtonGroup>

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
								Are you sure you want to delete your post?
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
								<Button type='button' color='error' onClick={handleDelete}>
									Yes, delete it
								</Button>
								<Button type='button' onClick={() => setOpenModal(false)}>
									No, keep it
								</Button>
							</ButtonGroup>
						</Box>
					</Modal>
				</Paper>
			) : (
				<Card
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
					<CardHeader
						avatar={
							<Tooltip title={`Created by ${post.user}`} placement='top'>
								<Avatar
									alt={post.username}
									src={
										post.userAvatar !== ''
											? `https://mern-blog-backend-g1kq.onrender.com/static/${post.userAvatar}`
											: DefaultProfile
									}
									sx={{width: 100, height: 100}}
									color='inherit'
								/>
							</Tooltip>
						}
						title={post.title}
						subheader={`${monthNames[month]} ${day} ${year}`}
					/>
					<CardMedia
						component='img'
						image={
							post.photo !== ''
								? `https://mern-blog-backend-g1kq.onrender.com/static/${post.photo}`
								: DefaultPhoto
						}
						alt={post.title}
					/>
					<CardContent>
						<Typography variant='body2' color='text.secondary'>
							{post.desc}
						</Typography>
					</CardContent>
					<CardActions
						sx={{
							paddingRight: '2rem',
							display: 'flex',
							justifyContent: 'space-between'
						}}
					>
						<IconButton>
							<Checkbox
								icon={<FavoriteBorder />} // todo Ability to increment and decrment likeCount
								checkedIcon={<Favorite sx={{color: 'red'}} />}
							/>
						</IconButton>
						<Typography variant='p'>{post.categories}</Typography>
						{user && (user.username === post.user || user.isAdmin) ? (
							<Button onClick={() => setEditMode(true)}>Edit Your Post</Button>
						) : (
							<Typography variant='p' sx={{color: 'red'}}>
								Only the user who created this post can edit it
							</Typography>
						)}
					</CardActions>
				</Card>
			)}
		</div>
	);
}

export default SinglePost;
