import {useState} from 'react';

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
	Paper
} from '@mui/material';
import {Favorite, FavoriteBorder} from '@mui/icons-material';

function SinglePost() {
	const creator = true; // Used to mimic that the logged in user created this post in redux

	const [editMode, setEditMode] = useState(false);
	const [title, setTitle] = useState('');
	const [desc, setDesc] = useState('');
	const [category, setCategory] = useState('');

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
						<InputLabel id='category'>Categories</InputLabel>
						<Select
							labelId='category'
							value={category}
							onChange={e => setCategory(e.target.value)}
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
						avatar={<Avatar alt='Christian Demesa' color='inherit' />}
						title='The Beatles'
						subheader='September 2, 2022'
					/>
					<CardMedia
						component='img'
						image='https://images.unsplash.com/photo-1597577389232-2002664a0aec?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80'
						alt='The Beatles'
					/>
					<CardContent>
						<Typography variant='body2' color='text.secondary'>
							Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quas iste
							recusandae quidem ipsum saepe eum dolorem deleniti eos commodi
							provident.
						</Typography>
					</CardContent>
					<CardActions>
						<IconButton>
							<Checkbox
								icon={<FavoriteBorder />}
								checkedIcon={<Favorite sx={{color: 'red'}} />}
							/>
						</IconButton>
						{creator && <Button onClick={() => setEditMode(true)}>Edit</Button>}
					</CardActions>
				</Card>
			)}
		</div>
	);
}

export default SinglePost;
