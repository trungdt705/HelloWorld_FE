import React, { useEffect, Suspense, lazy, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroll-component';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import FoodCard from '../../components/FoodCard';
import { CategoryList } from '../categories/CategoryList';
import {
	fetchFoods,
	selectAllFood,
	nextPage,
	setLoadMore,
	destroySession
} from './foodSlice';

const BackDropCustom = lazy(() => import('../../components/BackDrop'));

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
	const [open, setOpen] = useState(false);
	const isLoadMore = useSelector((state) => state.food.isLoadMore);
	const total = useSelector((state) => state.food.total);
	const isNew = useSelector((state) => state.auth.isNew);
	const query = useSelector((state) => state.food.query);
	const dispatch = useDispatch();
	const loadMore = () => {
		if (data.length !== 0 && data.length >= total) {
			dispatch(setLoadMore(false));
		} else {
			dispatch(nextPage(query.page + 1));
		}
	};

	useEffect(() => {
		async function getData() {
			setOpen(true);
			await dispatch(fetchFoods(query));
			setOpen(false);
		}

		getData();
		return () => {
			if (props.history.location.pathname !== '/foods') {
				dispatch(destroySession());
			}
		};
	}, [dispatch, isNew, query]);
	return (
		<React.Fragment>
			<Suspense fallback={<div>Loading...</div>}>
				<BackDropCustom open={open} />
			</Suspense>
			<Container fixed style={{ marginTop: 60 }}>
				<Grid container spacing={3} style={{ marginBottom: 16 }}>
					<CategoryList />
				</Grid>
			</Container>
			<Container fixed style={{ marginBottom: 50 }}>
				{data.length > 0 ? (
					<InfiniteScroll
						dataLength={data.length}
						next={loadMore}
						hasMore={isLoadMore}
						loader={<h4>Loading...</h4>}
					>
						{data.length > 0
							? data.map((food) => {
									return (
										<Grid
											item
											xs={12}
											key={food.id}
											style={{ marginBottom: 12 }}
										>
											<FoodCard food={food} />
										</Grid>
									);
							  })
							: ''}
					</InfiniteScroll>
				) : (
					''
				)}
			</Container>
		</React.Fragment>
	);
};

export default FoodList;
