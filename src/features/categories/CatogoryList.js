import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectAllCategory, fetchCategories } from "./categorySlice";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
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
	large: {
		width: theme.spacing(8),
		height: theme.spacing(8),
	},
}));

export const CategoryList = () => {
	const dispatch = useDispatch();
	const foods = useSelector(selectAllCategory);
	const categoryStatus = useSelector((state) => state.category.statusAll);
	const backDropStatus = useSelector(selectBackDropStatus);
	const classes = useStyles();

	let content;
	if (categoryStatus === "succeeded" && !backDropStatus) {
		content = foods.map((food) => (
			<Grid item xs={12} key={food.id}>
				{/* <FoodCard food={food} /> */}
			</Grid>
		));
	}
	useEffect(() => {
		async function getCategories() {
			dispatch(show());
			await dispatch(fetchCategories());
			dispatch(hide());
		}
		getCategories();
	}, []);

	return <div className={classes.root}>123</div>;
};
