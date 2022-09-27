import {Link} from 'react-router-dom';

import {
	Card,
	CardHeader,
	Avatar,
	IconButton,
	CardMedia,
	CardContent,
	Typography,
	CardActions,
	Checkbox
} from '@mui/material';
import {Favorite, FavoriteBorder} from '@mui/icons-material';

function Post() {
	return (
		<Card sx={{background: 'white'}}>
			{/* Text above the image */}
			<CardHeader
				avatar={<Avatar alt='Christian Demesa' color='inherit' />}
				title='The Beatles'
				subheader='September 2, 2022'
			/>

			{/* Image */}
			<CardMedia
				component='img'
				image='https://images.unsplash.com/photo-1597577389232-2002664a0aec?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80'
				alt='The Beatles'
			/>

			{/* Text below the image */}
			<CardContent>
				<Typography variant='body2' color='text.secondary'>
					Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quas iste recusandae
					quidem ipsum saepe eum dolorem deleniti eos commodi provident.
				</Typography>
			</CardContent>

			{/* Like button and Read more link */}
			<CardActions>
				<IconButton>
					<Checkbox
						icon={<FavoriteBorder />}
						checkedIcon={<Favorite sx={{color: 'red'}} />}
					/>
				</IconButton>
				<Link to='/post/:id' style={{color: 'blue', textDecoration: 'none'}}>
					Read more
				</Link>
			</CardActions>
		</Card>
	);
}

export default Post;
