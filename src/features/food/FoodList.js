import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectAllFood, fetchFoods } from "./foodSlice";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import FoodCard from "../../components/FoodCard";

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	paper: {
		padding: theme.spacing(2),
		textAlign: "center",
		color: theme.palette.text.secondary,
	},
}));

export const FilmList = () => {
	const dispatch = useDispatch();
	const foods = useSelector(selectAllFood);
	const foodStatus = useSelector((state) => state.food.status);
	const classes = useStyles();

	let content;
	if (foodStatus === "succeeded") {
		console.log("ok");
		content = foods.map((food) => (
			<Grid item xs={4}>
				<FoodCard food={food} />
			</Grid>
		));
	}
	useEffect(() => {
		if (foodStatus === "idle") {
			dispatch(fetchFoods());
		}
	}, [foodStatus, dispatch]);

	return (
		<div className={classes.root}>
			<Container fixed>
				<Grid container spacing={6}>
					{content}
				</Grid>
			</Container>
		</div>
	);
};
