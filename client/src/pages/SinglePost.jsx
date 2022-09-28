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
	Box
} from '@mui/material';
import {Favorite, FavoriteBorder} from '@mui/icons-material';

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
	const [errorMessage, setErrorMessage] = useState('');
	const [month, setMonth] = useState(0);
	const [day, setDay] = useState(0);
	const [year, setYear] = useState(0);

	const navigate = useNavigate();

	// Gets one post with its id
	useEffect(() => {
		async function fetchData() {
			try {
				const res = await axios.get(`http://localhost:5000/posts/${id}`);
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
		// bug Fix date because post.updatedAt is undefined until it is fetched, but undefined.split() creates an error
		// setMonth(parseInt(post.updatedAt.split('-')[1]));
		// setDay(post.updatedAt.split('-')[2].slice(0, 2));
		// setYear(post.updatedAt.split('-')[0]);
	}, [post]);

	// Updates a post
	const handleSubmit = async e => {
		e.preventDefault();
		try {
			await axios.put(
				`http://localhost:5000/posts/${id}`,
				{
					title,
					desc,
					categories,
					// todo Include likeCount
					photo: '', // todo Include photo with multer in server
					user: post.user
				},
				{
					headers: {
						Authorization: 'Bearer ' + user.token
					}
				}
			);
			setEditMode(false);
		} catch (err) {
			setErrorMessage(err.response.data);
		}
	};

	// Deletes a post
	const handleDelete = async e => {
		console.log(id);
		e.preventDefault();
		try {
			await axios.delete(`http://localhost:5000/posts/${id}`, {
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
							width: {xs: '100%', sm: '50%'},
							display: 'flex',
							justifyContent: 'space-between'
						}}
					>
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
									src={null || DefaultProfile} // todo Change to be the photo of the user who created it
									color='inherit'
								/>
							</Tooltip>
						}
						title={post.title}
						subheader={`${monthNames[month]} ${day} ${year}`}
					/>
					<CardMedia
						component='img'
						image={post.photo || DefaultPhoto}
						alt={post.title}
					/>
					<CardContent>
						<Typography variant='body2' color='text.secondary'>
							{/* todo Limit description to 3 - 4 lines */}
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
						<Typography variant='body2'>{post.categories}</Typography>
						{user.username === post.user && (
							<Button onClick={() => setEditMode(true)}>Edit Your Post</Button>
						)}
					</CardActions>
				</Card>
			)}
		</div>
	);
}

export default SinglePost;
