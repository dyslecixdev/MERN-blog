import {useState, useEffect} from 'react';

import {Box, Grid, List, ListSubheader, ListItemButton, ListItemText} from '@mui/material';

import axios from 'axios';

import Post from '../components/Post';

function Home() {
	const [posts, setPosts] = useState([]);

	// Gets all the posts
	useEffect(() => {
		async function fetchData() {
			try {
				const res = await axios.get('http://localhost:5000/posts');
				setPosts(res.data);
			} catch (err) {
				console.log(err);
			}
		}
		fetchData();
	}, []);

	return (
		<Box sx={{display: 'flex'}}>
			{/* Left posts container */}
			<Grid
				container
				spacing={2}
				// Example of breakpoints in MUI
				sx={{
					width: {
						xs: '100vw',
						sm: '75vw',
						md: '85vw'
					},
					padding: '1rem'
				}}
			>
				{/* Maps over all the posts, then creates a Grid item for each one */}
				{posts.map(post => (
					<Grid item key={post._id} xs={12} sm={6} md={4} xl={3}>
						<Post postData={post} />
					</Grid>
				))}
			</Grid>

			{/* Right categories list */}
			{/* bug List is too long for a landscape phone's viewport */}
			<Box
				sx={{
					width: {
						sm: '25vw',
						md: '15vw'
					},
					padding: '1rem',
					display: {
						xs: 'none',
						sm: 'block'
					}
				}}
			>
				{/* Used another Box to use position: 'fixed' because using position in the parent Box makes it act like position: 'absolute' */}
				<Box
					sx={{
						width: {
							sm: '23vw',
							md: '13vw'
						},
						position: 'fixed'
					}}
				>
					<List
						sx={{
							width: '100%',
							background: 'white',
							border: '1px solid gray',
							borderRadius: '5px'
						}}
						component='nav'
						aria-labelledby='nested-list-subheader'
						subheader={<ListSubheader component='div'>Categories</ListSubheader>}
					>
						<ListItemButton>
							<ListItemText primary='Rock' />
						</ListItemButton>
						<ListItemButton>
							<ListItemText primary='Pop' />
						</ListItemButton>
						<ListItemButton>
							<ListItemText primary='Funk' />
						</ListItemButton>
						<ListItemButton>
							<ListItemText primary='Country' />
						</ListItemButton>
						<ListItemButton>
							<ListItemText primary='Jazz' />
						</ListItemButton>
						<ListItemButton>
							<ListItemText primary='Classical' />
						</ListItemButton>
					</List>
				</Box>
			</Box>
		</Box>
	);
}

export default Home;
