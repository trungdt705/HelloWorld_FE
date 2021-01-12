import React from 'react';
import { useHistory } from 'react-router-dom';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import { fade, makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Avatar from '@material-ui/core/Avatar';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItemLink from './ListItemLink';
import { MENU as menu } from '../contants/menu';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../features/auth/authSlice';
import { Container } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
	grow: {
		flexGrow: 1,
		marginBottom: 16
	},
	menuButton: {
		marginRight: theme.spacing(2)
	},
	title: {
		textShadow: '2px 2px 2px rgba(224, 66, 245, 0.4)',
		fontFamily: 'Brush Script MT'
	},
	search: {
		position: 'relative',
		borderRadius: theme.shape.borderRadius,
		backgroundColor: fade(theme.palette.common.white, 0.15),
		'&:hover': {
			backgroundColor: fade(theme.palette.common.white, 0.25)
		},
		marginRight: theme.spacing(2),
		marginLeft: 0,
		width: '100%',
		[theme.breakpoints.up('sm')]: {
			marginLeft: theme.spacing(3),
			width: 'auto'
		}
	},
	searchIcon: {
		padding: theme.spacing(0, 2),
		height: '100%',
		position: 'absolute',
		pointerEvents: 'none',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center'
	},
	inputRoot: {
		color: 'inherit'
	},
	inputInput: {
		padding: theme.spacing(1, 1, 1, 0),
		// vertical padding + font size from searchIcon
		paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
		transition: theme.transitions.create('width'),
		width: '100%',
		[theme.breakpoints.up('md')]: {
			width: '20ch'
		}
	},
	sectionDesktop: {
		display: 'none',
		[theme.breakpoints.up('md')]: {
			display: 'flex'
		}
	},
	sectionMobile: {
		display: 'flex',
		[theme.breakpoints.up('md')]: {
			display: 'none'
		}
	},
	stickToTop: {
		width: '100%',
		position: 'fixed',
		top: 0,
		zIndex: 1000
	},
	small: {
		width: theme.spacing(3),
		height: theme.spacing(3)
	}
}));

export default function PrimarySearchAppBar(props) {
	const classes = useStyles();
	const dispatch = useDispatch();
	const history = useHistory();

	const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
	const [anchorEl, setAnchorEl] = React.useState(null);
	const [open, setOpen] = React.useState(false);
	const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
	let isMenuOpen = Boolean(anchorEl);

	const currentUser = useSelector((state) => state.user.currentUser);

	const handleMobileMenuClose = () => {
		setMobileMoreAnchorEl(null);
	};

	const handleMobileMenuOpen = (event) => {
		if (props.isAuth) {
			setMobileMoreAnchorEl(event.currentTarget);
		}
	};

	const handleProfileMenuOpen = (event) => {
		if (props.isAuth) {
			setAnchorEl(event.currentTarget);
		}
	};
	const handleMenuClose = () => {
		setAnchorEl(null);
		handleMobileMenuClose();
	};

	const handleDrawerOpen = () => {
		setOpen(true);
	};

	// const handleDrawerClose = () => {
	// 	setOpen(false);
	// };

	const handleClickAway = () => {
		setOpen(false);
	};

	const signOut = () => {
		dispatch(logOut());
	};

	const goToProfile = () => {
		history.push('/profile');
		setMobileMoreAnchorEl(null);
	};

	const menuId = 'primary-search-account-menu';
	const renderMenu = (
		<Menu
			anchorEl={anchorEl}
			anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
			id={menuId}
			keepMounted
			transformOrigin={{ vertical: 'top', horizontal: 'right' }}
			open={isMenuOpen}
			onClose={handleMenuClose}
		>
			<MenuItem onClick={goToProfile}>Profile</MenuItem>
			<MenuItem onClick={signOut}>Đăng xuất</MenuItem>
		</Menu>
	);

	const mobileMenuId = 'primary-search-account-menu-mobile';
	const renderMobileMenu = (
		<Menu
			anchorEl={mobileMoreAnchorEl}
			anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
			id={mobileMenuId}
			keepMounted
			transformOrigin={{ vertical: 'top', horizontal: 'right' }}
			open={isMobileMenuOpen}
			onClose={handleMobileMenuClose}
		>
			<MenuItem>
				<IconButton
					aria-label="show 11 new notifications"
					color="inherit"
				>
					<Badge badgeContent={11} color="secondary">
						<NotificationsIcon />
					</Badge>
				</IconButton>
				<p>Thông báo</p>
			</MenuItem>
			<MenuItem onClick={goToProfile}>
				<IconButton
					aria-label="show 11 new notifications"
					color="inherit"
				>
					{' '}
					<NotificationsIcon />
				</IconButton>
				<p>Profile</p>
			</MenuItem>
			<MenuItem onClick={signOut}>
				<IconButton
					aria-label="account of current user"
					aria-controls="primary-search-account-menu"
					aria-haspopup="true"
					color="inherit"
				>
					<AccountCircle />
				</IconButton>
				<p>Đăng xuất</p>
			</MenuItem>
		</Menu>
	);

	return (
		<ClickAwayListener onClickAway={handleClickAway}>
			<div className={classes.grow}>
				<AppBar className={classes.stickToTop} color="primary">
					<Container>
						<Toolbar>
							<IconButton
								edge="start"
								className={[classes.menuButton]}
								color="inherit"
								aria-label="open drawer"
								onClick={handleDrawerOpen}
							>
								<MenuIcon />
							</IconButton>
							<Typography
								className={[classes.title, 'pointer']}
								variant="h4"
								noWrap
								onClick={() => {
									history.push('/');
								}}
								color="secondary"
							>
								Hello World
							</Typography>
							<div className={classes.grow} />
							<div className={classes.sectionDesktop}>
								<IconButton
									aria-label="show 4 new mails"
									color="inherit"
								>
									<Badge badgeContent={4} color="secondary">
										<MailIcon />
									</Badge>
								</IconButton>
								<IconButton
									aria-label="show 17 new notifications"
									color="inherit"
								>
									<Badge badgeContent={17} color="secondary">
										<NotificationsIcon />
									</Badge>
								</IconButton>
								<IconButton
									edge="end"
									aria-label="account of current user"
									aria-controls={menuId}
									aria-haspopup="true"
									color="inherit"
									onClick={handleProfileMenuOpen}
								>
									<AccountCircle />
								</IconButton>
							</div>
							<div className={classes.sectionMobile}>
								<IconButton
									aria-label="show more"
									aria-controls={mobileMenuId}
									aria-haspopup="true"
									onClick={handleMobileMenuOpen}
									color="inherit"
								>
									<Avatar
										alt="Remy Sharp"
										src={
											currentUser && currentUser.avatar
												? currentUser.avatar
												: ''
										}
										className={classes.small}
									/>
								</IconButton>
							</div>
						</Toolbar>
					</Container>
				</AppBar>
				{renderMobileMenu}
				{renderMenu}
				<Drawer variant="persistent" anchor="left" open={open}>
					<List>
						{menu.map((item) => (
							<ListItemLink
								key={item.link}
								to={item.link}
								name={item.name}
								icon={item.icon}
							/>
						))}
					</List>
				</Drawer>
			</div>
		</ClickAwayListener>
	);
}
