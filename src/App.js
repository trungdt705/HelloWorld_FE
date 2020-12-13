import React, { useState } from "react";
import "./App.css";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Switch, Route, Redirect, useHistory } from "react-router-dom";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { FoodList } from "./features/food/FoodList";
import { FoodDetail } from "./features/food/FoodDetail";
import { FilmList } from "./features/films/FilmList";
import { FilmDetail } from "./features/films/FilmDetail";
import { EventList } from "./features/events/EventList";
import { selectBackDropStatus } from "./features/backdrop/backDropSlice";
import { selectBotNavIcon, setIcon } from "./features/botnav/botNavSlice";
import { NotFound } from "./components/NotFound";
import Home from "./components/Home";
import AppBar from "./components/AppBar";
import { BOTNAV as botnav } from "./contants/botnav";

const useStyles = makeStyles((theme) => ({
	stickToBottom: {
		width: "100%",
		position: "fixed",
		bottom: 0,
		zIndex: 1000,
	},
	backdrop: {
		zIndex: theme.zIndex.drawer + 1,
		color: "#fff",
	},
}));

function App() {
	console.log("app");
	const history = useHistory();
	const classes = useStyles();
	const dispatch = useDispatch();
	const botNavIcon = useSelector(selectBotNavIcon);
	dispatch(setIcon(history.location.pathname));
	const handleChange = (event, newValue) => {
		dispatch(setIcon(newValue));
		history.push(newValue);
	};
	const backDropStatus = useSelector(selectBackDropStatus);
	return (
		<div className="App">
			<Backdrop className={classes.backdrop} open={backDropStatus}>
				<CircularProgress color="inherit" />
			</Backdrop>
			<AppBar />
			<BottomNavigation
				value={botNavIcon}
				onChange={handleChange}
				showLabels
				className={classes.stickToBottom}
			>
				{botnav.map((item) => {
					return (
						<BottomNavigationAction
							key={item.value}
							label={item.label}
							value={item.value}
							icon={item.icon}
						/>
					);
				})}
			</BottomNavigation>

			<Switch>
				<Route path="/foods/:id" component={FoodDetail}></Route>
				<Route path="/foods" component={FoodList}></Route>
				<Route path="/films/:id" component={FilmDetail}></Route>
				<Route path="/films" component={FilmList}></Route>
				<Route path="/events" component={EventList}></Route>
				<Route path="/" exact component={Home}></Route>
				<Route path="/not-found" component={NotFound}></Route>
				<Redirect to="/not-found" />
			</Switch>
		</div>
	);
}

export default App;
