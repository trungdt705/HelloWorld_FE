import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectAllFood, fetchFoods } from "./foodSlice";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import FoodCard from "../../components/FoodCard";
import { show, hide, selectBackDropStatus } from "../backdrop/backDropSlice";

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

export const FoodList = () => {
	const dispatch = useDispatch();
	const foods = useSelector(selectAllFood);
	const foodStatus = useSelector((state) => state.food.statusAll);
	const backDropStatus = useSelector(selectBackDropStatus);
	const classes = useStyles();

	let content;
	if (foodStatus === "succeeded" && !backDropStatus) {
		content = foods.map((food) => (
			<Grid item xs={12} key={food.id}>
				<FoodCard food={food} />
			</Grid>
		));
	}
	useEffect(() => {
		async function getFoods() {
			dispatch(show());
			await dispatch(fetchFoods());
			dispatch(hide());
		}
		getFoods();
	}, []);

	return (
		<div className={classes.root}>
			<Container fixed style={{ marginTop: 16, marginBottom: 100 }}>
				<Grid container spacing={3}>
					{content}
				</Grid>
			</Container>
		</div>
	);
};
