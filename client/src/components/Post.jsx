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
	Tooltip,
	Button
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
		<Card sx={{minHeight: {xs: '55vh', sm: '40vh'}, background: 'white'}}>
			{/* Text above the image */}
			<CardHeader
				avatar={
					// Tooltip is a hoverable effect
					<Tooltip title={`Created by ${postData.user}`} placement='top'>
						<Avatar
							alt={postData.username}
							src={postData.userAvatar || DefaultProfile} // bug If the user's profilePic is updated, it does not change here
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
			<CardContent sx={{minHeight: '10vh', borderBottom: '1px solid lightgray'}}>
				<Typography
					variant='body2'
					color='text.secondary'
					// Limits the description to 2 lines of text
					sx={{
						display: '-webkit-box',
						overflow: 'hidden',
						textOverflow: 'ellipsis',
						WebkitLineClamp: 2,
						WebkitBoxOrient: 'vertical'
					}}
				>
					{postData.desc}
				</Typography>
			</CardContent>

			{/* Like button and Read more link */}
			<CardActions
				sx={{
					paddingRight: '2rem',
					display: 'flex',
					justifyContent: 'space-between'
				}}
			>
				<IconButton>
					<Checkbox
						icon={<FavoriteBorder />} // todo Ability to increment and decrement likeCount
						checkedIcon={<Favorite sx={{color: 'red'}} />}
					/>
				</IconButton>
				<Typography variant='p'>{postData.categories}</Typography>
				<Button>
					<Link
						to={`/post/${postData._id}`}
						style={{color: 'blue', textDecoration: 'none'}}
					>
						Read more
					</Link>
				</Button>
			</CardActions>
		</Card>
	);
}

export default Post;
