import {useState} from 'react';
import {Outlet, Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';

import DefaultProfile from '../assets/default-profile.jpg';

import {
	AppBar,
	Toolbar,
	IconButton,
	Typography,
	Button,
	Menu,
	MenuItem,
	Avatar,
	Box
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

import {logoutStart, logoutSuccess, logoutFailure} from '../redux/userRedux';

function Navbar() {
	const user = useSelector(state => state.user.currentUser);
	const dispatch = useDispatch();

	const [navMenuAnchor, setNavMenuAnchor] = useState(null);
	const [userMenuAnchor, setUserMenuAnchor] = useState(null);

	const navOpen = Boolean(navMenuAnchor);
	const userOpen = Boolean(userMenuAnchor);

	// Opens the hamburger icon menu
	const handleNavClick = e => {
		setNavMenuAnchor(e.currentTarget);
	};

	// Closes the hamburger icon menu
	const handleNavClose = () => {
		setNavMenuAnchor(null);
	};

	// Opens the avatar icon menu
	const handleUserClick = e => {
		setUserMenuAnchor(e.currentTarget);
	};

	// Closes the avatar icon menu
	const handleUserClose = () => {
		setUserMenuAnchor(null);
	};

	// Logs out of the app
	const handleLogout = async () => {
		handleUserClose(); // Prevents from the menu popup on the left side of the navbar
		dispatch(logoutStart());
		try {
			dispatch(logoutSuccess());
		} catch (err) {
			console.log(err);
			dispatch(logoutFailure());
		}
	};

	return (
		<>
			{/* AppBar position is required to avoid it overlapping other MUI components */}
			<AppBar position='sticky'>
				{/* sx prop is used for inline styling */}
				<Toolbar
					sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}
				>
					{/* Hamburger menu icon */}
					<IconButton
						size='large'
						edge='start'
						color='inherit'
						aria-controls={navOpen ? 'basic-menu' : undefined}
						aria-haspopup='true'
						aria-expanded={navOpen ? 'true' : undefined}
						onClick={handleNavClick}
					>
						<MenuIcon />
					</IconButton>

					{/* Hamburger menu popup */}
					<Menu
						anchorEl={navMenuAnchor}
						open={navOpen}
						onClose={handleNavClose}
						MenuListProps={{
							'aria-labelledby': 'basic-button'
						}}
					>
						<MenuItem onClick={handleNavClose}>
							<a
								href='https://github.com/christiandeandemesa'
								target='_blank'
								rel='noreferrer'
								style={{textDecoration: 'none', color: 'black'}}
							>
								ABOUT
							</a>
						</MenuItem>
						<MenuItem onClick={handleNavClose}>
							<Link to='/write' style={{textDecoration: 'none', color: 'black'}}>
								WRITE
							</Link>
						</MenuItem>
					</Menu>

					{/* Logo */}
					<Typography variant='h4' component='div'>
						<Link to='/' style={{textDecoration: 'none', color: 'white'}}>
							LOGO
						</Link>
					</Typography>

					{/* Either an avatar, or register and login links */}
					{user ? (
						<>
							<Avatar
								alt={user.username}
								src={user.profilePic || DefaultProfile}
								color='inherit'
								aria-controls={userOpen ? 'basic-menu' : undefined}
								aria-haspopup='true'
								aria-expanded={userOpen ? 'true' : undefined}
								onClick={handleUserClick}
								sx={{cursor: 'pointer'}}
							/>
							<Menu
								anchorEl={userMenuAnchor}
								open={userOpen}
								onClose={handleUserClose}
								MenuListProps={{
									'aria-labelledby': 'basic-button'
								}}
							>
								<MenuItem onClick={handleUserClose}>
									<Link
										to='/profile'
										style={{textDecoration: 'none', color: 'black'}}
									>
										PROFILE
									</Link>
								</MenuItem>
								<MenuItem onClick={handleLogout}>LOGOUT</MenuItem>
							</Menu>
						</>
					) : (
						<Box>
							<Button color='inherit'>
								<Link
									to='/register'
									style={{textDecoration: 'none', color: 'white'}}
								>
									REGISTER
								</Link>
							</Button>
							<Button color='inherit'>
								<Link to='/login' style={{textDecoration: 'none', color: 'white'}}>
									LOGIN
								</Link>
							</Button>
						</Box>
					)}
				</Toolbar>
			</AppBar>

			<Outlet />
		</>
	);
}

export default Navbar;
