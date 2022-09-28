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
	Checkbox,
	Tooltip
} from '@mui/material';
import {Favorite, FavoriteBorder} from '@mui/icons-material';

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

function Post({postData}) {
	const month = parseInt(postData.updatedAt.split('-')[1]);
	const day = postData.updatedAt.split('-')[2].slice(0, 2);
	const year = postData.updatedAt.split('-')[0];

	return (
		<Card sx={{background: 'white'}}>
			{/* Text above the image */}
			<CardHeader
				avatar={
					// Tooltip is a hoverable effect
					<Tooltip title={`Created by ${postData.user}`} placement='top'>
						<Avatar
							alt={postData.username}
							src={null || DefaultProfile} // todo Change to be the photo of the user who created it
							color='inherit'
						/>
					</Tooltip>
				}
				title={postData.title}
				subheader={`${monthNames[month]} ${day} ${year}`}
			/>

			{/* Image */}
			<CardMedia
				component='img'
				image={postData.photo || DefaultPhoto}
				alt={postData.title}
			/>

			{/* Text below the image */}
			<CardContent>
				<Typography variant='body2' color='text.secondary'>
					{/* todo Limit description to 3 - 4 lines */}
					{postData.desc}
				</Typography>
			</CardContent>

			{/* Like button and Read more link */}
			<CardActions>
				<IconButton>
					<Checkbox
						icon={<FavoriteBorder />} // todo Ability to increment and decrement likeCount
						checkedIcon={<Favorite sx={{color: 'red'}} />}
					/>
				</IconButton>
				<Link to={`/post/${postData._id}`} style={{color: 'blue', textDecoration: 'none'}}>
					Read more
				</Link>
			</CardActions>
		</Card>
	);
}

export default Post;
