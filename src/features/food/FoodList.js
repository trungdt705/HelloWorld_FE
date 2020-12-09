import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// omit other imports
import { selectAllFood, fetchFoods } from './foodSlice';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1
	},
	paper: {
		padding: theme.spacing(2),
		textAlign: 'center',
		color: theme.palette.text.secondary
	}
}));

export const FilmList = () => {
	const dispatch = useDispatch();
	const foods = useSelector(selectAllFood);
	const foodStatus = useSelector((state) => state.food.status);
	const classes = useStyles();
	const [expanded, setExpanded] = React.useState(false);

	const handleExpandClick = () => {
		setExpanded(!expanded);
	};
	let content;
	if (foodStatus === 'succeeded') {
		content = foods.map((food) => <p key={food.id}>{food.name}</p>);
	}
	useEffect(() => {
		if (foodStatus === 'idle') {
			dispatch(fetchFoods());
		}
	}, [foodStatus, dispatch]);

	return <div>{content}</div>;
};
