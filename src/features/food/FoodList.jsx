import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroll-component';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import FoodCard from '../../components/FoodCard';
import { CategoryList } from '../categories/CategoryList';
import { show, hide } from '../backdrop/backDropSlice';
import {
	fetchFoods,
	selectAllFood,
	selectPagination,
	nextPage
} from './foodSlice';

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

const FoodList = (props) => {
	const data = useSelector(selectAllFood);
	const pagination = useSelector(selectPagination);
	const classes = useStyles();
	const dispatch = useDispatch();
	const loadMore = () => {
		dispatch(nextPage(pagination.page + 1));
	};

	useEffect(() => {
		function getData() {
			dispatch(show());
			dispatch(fetchFoods({ page: pagination.page, limit: 5 }));
			dispatch(hide());
		}
		getData();
		return () => {
			if (props.history.location.pathname !== '/foods') {
				dispatch({ type: 'destroy_session' });
			}
		};
	}, []);

	return (
		<React.Fragment>
			<Container fixed style={{ marginTop: 16, marginBottom: 100 }}>
				<Grid container spacing={3} style={{ marginBottom: 16 }}>
					<CategoryList />
				</Grid>
				{data.length > 0 ? (
					<InfiniteScroll
						dataLength={data.length}
						next={loadMore}
						hasMore={true}
						loader={<h4>Loading...</h4>}
					>
						<Grid container spacing={3}>
							{data.length > 0
								? data.map((food) => {
										return (
											<Grid item xs={12} key={food.id}>
												<FoodCard food={food} />
											</Grid>
										);
								  })
								: ''}
						</Grid>
					</InfiniteScroll>
				) : (
					''
				)}
			</Container>
		</React.Fragment>
	);
};

export default FoodList;
