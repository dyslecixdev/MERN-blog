import {useState} from 'react';

import {Paper, TextField, InputLabel, Stack, Select, MenuItem, Button} from '@mui/material';

function Write() {
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
				<Button variant='contained' type='submit'>
					Post
				</Button>
			</Paper>
		</div>
	);
}

export default Write;
