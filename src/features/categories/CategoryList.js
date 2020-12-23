import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectAllCategory, fetchCategories } from './categorySlice';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';

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
	const categoryStatus = useSelector((state) => state.category.statusAll);
	const categories = useSelector((state) => state.category.categories);
	const classes = useStyles();
	let contentCategory;
	if (categoryStatus === 'succeeded') {
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
		async function getCategories() {
			await dispatch(fetchCategories());
		}
		getCategories();
	}, []);

	return <React.Fragment>{contentCategory}</React.Fragment>;
};
