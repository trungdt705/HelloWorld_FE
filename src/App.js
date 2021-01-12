import React, { useEffect, Suspense } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import { Switch, Route, Redirect, useHistory } from 'react-router-dom';
import {
	makeStyles,
	BottomNavigation,
	BottomNavigationAction
} from '@material-ui/core';
import { BOTNAV as botnav } from './contants/botnav';
import AppBar from './components/AppBar';
import Home from './components/Home';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';
import { NotFound } from './components/NotFound';
import FoodList from './features/food/FoodList';
import { FoodDetail } from './features/food/FoodDetail';
import FilmList from './features/films/FilmList';
import { FilmDetail } from './features/films/FilmDetail';
import { EventList } from './features/events/EventList';
import { EventDetail } from './features/events/EventDetail';
import { selectBotNavIcon, setIcon } from './features/botnav/botNavSlice';
import { isAuthenticate } from './utils/auth';
import Profile from './components/Profile';

const useStyles = makeStyles((theme) => ({
	stickToBottom: {
		width: '100%',
		position: 'fixed',
		bottom: 0,
		zIndex: 1000
	},
	backdrop: {
		zIndex: theme.zIndex.drawer + 1,
		color: '#fff'
	},
	sectionMobile: {
		display: 'flex',
		[theme.breakpoints.up('md')]: {
			display: 'none'
		}
	},
	/* Styles applied to the root element. */
	root: {
		color: theme.palette.text.secondary,
		'&$selected': {
			color: theme.palette.secondary.main
		}
	},
	/* Styles applied to the root element if selected. */
	selected: {}
}));

function App() {
	const dispatch = useDispatch();
	const history = useHistory();
	const botNavIcon = useSelector(selectBotNavIcon);
	const accessToken = useSelector((state) => state.auth.accessToken);
	const refreshToken = useSelector((state) => state.auth.refreshToken);
	const classes = useStyles();

	const isAuth = isAuthenticate(accessToken, refreshToken);

	const handleChange = (event, newValue) => {
		dispatch(setIcon(newValue));
		history.push(newValue);
	};

	useEffect(() => {
		dispatch(setIcon(history.location.pathname));
	}, [history.location.pathname]);

	return (
		<div className="App">
			{/* <Backdrop className={classes.backdrop} open={backDropStatus}>
				<CircularProgress color="inherit" />
			</Backdrop> */}
			{isAuth ? <AppBar isAuth={isAuth} /> : ''}
			{isAuth ? (
				<BottomNavigation
					value={botNavIcon}
					onChange={handleChange}
					showLabels
					className={[classes.stickToBottom, classes.sectionMobile]}
				>
					{botnav.map((item) => {
						return (
							<BottomNavigationAction
								key={item.value}
								label={item.label}
								value={item.value}
								icon={item.icon}
								classes={{
									root: classes.root,
									selected: classes.selected
								}}
							/>
						);
					})}
				</BottomNavigation>
			) : (
				''
			)}
			<Suspense fallback={<div>Loading...</div>}>
				<Switch>
					<ProtectedRoute path="/foods/:id" component={FoodDetail} />
					<ProtectedRoute path="/foods" component={FoodList} />
					<ProtectedRoute path="/films/:id" component={FilmDetail} />
					<ProtectedRoute path="/films" component={FilmList} />
					<ProtectedRoute
						path="/events/:id"
						component={EventDetail}
					/>
					<ProtectedRoute path="/events" component={EventList} />
					<ProtectedRoute path="/profile" component={Profile} />
					<Route path="/login" component={Login} />
					<Route path="/not-found" component={NotFound} />
					<ProtectedRoute path="/" component={Home} />
					<Redirect to="/not-found" />
				</Switch>
			</Suspense>
		</div>
	);
}

export default App;
