import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectAllFood, fetchFoods } from './foodSlice';
import {
	selectAllCategory,
	fetchCategories
} from '../categories/categorySlice';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Avatar from '@material-ui/core/Avatar';
import FoodCard from '../../components/FoodCard';
import { show, hide, selectBackDropStatus } from '../backdrop/backDropSlice';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		display: 'flex',
		'& > *': {
			margin: theme.spacing(1)
		}
	},
	paper: {
		padding: theme.spacing(2),
		textAlign: 'center',
		color: theme.palette.text.secondary
	},
	large: {
		width: theme.spacing(6),
		height: theme.spacing(6)
	}
}));

export const FoodList = () => {
	const dispatch = useDispatch();
	const foods = useSelector(selectAllFood);
	const categories = useSelector(selectAllCategory);
	const foodStatus = useSelector((state) => state.food.statusAll);
	const categoryStatus = useSelector((state) => state.category.statusAll);
	const backDropStatus = useSelector(selectBackDropStatus);
	const classes = useStyles();

	let contentProduct;
	let contentCategory;
	if (foodStatus === 'succeeded' && !backDropStatus) {
		contentProduct = foods.map((food) => (
			<Grid item xs={12} key={food.id}>
				<FoodCard food={food} />
			</Grid>
		));
	}
	if (categoryStatus === 'succeeded' && !backDropStatus) {
		contentCategory = categories.map((category) => (
			<Grid item xs={3} key={category.id}>
				<Avatar
					alt="Remy Sharp"
					src={category.thumbnail}
					className={classes.large}
				/>
				<span style={{ fontWeight: 'bold' }}>{category.name}</span>
			</Grid>
		));
	}
	useEffect(() => {
		async function getFoods() {
			dispatch(show());
			await dispatch(fetchFoods());
			await dispatch(fetchCategories());
			dispatch(hide());
		}
		getFoods();
	}, []);

	return (
		<div className={classes.root}>
			<Container fixed style={{ marginTop: 16, marginBottom: 100 }}>
				<Grid container spacing={3}>
					{contentCategory}
				</Grid>
				<Grid container spacing={3}>
					{contentProduct}
				</Grid>
			</Container>
		</div>
	);
};
