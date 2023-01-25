// Home page

import {useState, useEffect} from 'react';

import {Box, Grid, List, ListSubheader, ListItemButton, ListItemText} from '@mui/material';

import axios from 'axios';

import Post from '../components/Post';

// todo Create another categories list to filter posts by oldest or newest data

function Home() {
	const [posts, setPosts] = useState([]);
	const [catQuery, setCatQuery] = useState(null);

	// Gets all the posts
	useEffect(() => {
		async function fetchData() {
			try {
				const res = await axios.get(
					catQuery
						? `https://mern-blog-backend-g1kq.onrender.com/posts?category=${catQuery}`
						: 'https://mern-blog-backend-g1kq.onrender.com/posts'
				); // Uses either the API URL depending on if a catQuery exists
				setPosts(res.data);
			} catch (err) {
				console.log(err);
			}
		}
		fetchData();
	}, [catQuery]);

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
						position: {
							sm: 'static',
							md: 'fixed'
						}
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
							<ListItemText primary='Rock' onClick={() => setCatQuery('rock')} />
						</ListItemButton>
						<ListItemButton>
							<ListItemText primary='Pop' onClick={() => setCatQuery('pop')} />
						</ListItemButton>
						<ListItemButton>
							<ListItemText primary='Funk' onClick={() => setCatQuery('funk')} />
						</ListItemButton>
						<ListItemButton>
							<ListItemText
								primary='Country'
								onClick={() => setCatQuery('country')}
							/>
						</ListItemButton>
						<ListItemButton>
							<ListItemText primary='Jazz' onClick={() => setCatQuery('jazz')} />
						</ListItemButton>
						<ListItemButton>
							<ListItemText
								primary='Classical'
								onClick={() => setCatQuery('classical')}
							/>
						</ListItemButton>
						<ListItemButton>
							<ListItemText primary='All' onClick={() => setCatQuery(null)} />
						</ListItemButton>
					</List>
				</Box>
			</Box>
		</Box>
	);
}

export default Home;
