import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectAllCategory, fetchCategories } from './categorySlice';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import { fetchFoods } from '../food/foodSlice';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1
	},
	paper: {
		padding: theme.spacing(2),
		textAlign: 'center',
		color: theme.palette.text.secondary
	},
	large: {
		width: theme.spacing(8),
		height: theme.spacing(8)
	}
}));

export const CategoryList = () => {
	const dispatch = useDispatch();
	const status = useSelector((state) => state.category.statusAll);
	const categories = useSelector(selectAllCategory);
	const classes = useStyles();
	let contentCategory;
	const handle = (id) => {
		console.log(id);
		// dispatch(fetchFoods({ category: id }));
	};
	if (status === 'succeeded') {
		contentCategory = categories.map((category) => (
			<Grid item xs={3} key={category.id}>
				<Avatar
					onClick={() => handle(category.id)}
					alt="Remy Sharp"
					src={category.thumbnail}
					className={classes.large}
				/>
				<span style={{ fontWeight: 'bold' }}>{category.name}</span>
			</Grid>
		));
	}
	useEffect(() => {
		function getCategories() {
			dispatch(fetchCategories({}));
		}
		getCategories();
	}, []);

	return <React.Fragment>{contentCategory}</React.Fragment>;
};
