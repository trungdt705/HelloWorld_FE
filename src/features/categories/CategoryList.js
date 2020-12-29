import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectAllCategory, fetchCategories } from './categorySlice';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import { destroySession, setQuery } from '../food/foodSlice';

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
	const getFoodsByCategory = (id) => {
		dispatch(destroySession());
		dispatch(setQuery({ page: 1, limit: 1, category: id }));
	};
	if (status === 'succeeded') {
		contentCategory = categories.map((category) => (
			<Grid item xs={3} key={category.id}>
				<Avatar
					onClick={() => getFoodsByCategory(category.id)}
					alt={category.name}
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
	}, [dispatch]);

	return <React.Fragment>{contentCategory}</React.Fragment>;
};
