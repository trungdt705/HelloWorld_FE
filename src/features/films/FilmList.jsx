import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroll-component';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import FilmCard from '../../components/FilmCard';
import {
	selectAllFilm,
	fetchFilms,
	selectPagination,
	nextPage,
	setLoadMore,
	setStatus
} from './filmSlice';
import { show, hide } from '../backdrop/backDropSlice';

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

const FilmList = (props) => {
	const data = useSelector(selectAllFilm);
	const status = useSelector((state) => state.film.statusAll);
	const isLoadMore = useSelector((state) => state.film.isLoadMore);
	const total = useSelector((state) => state.film.total);
	const { page, limit } = useSelector(selectPagination);
	const dispatch = useDispatch();
	const loadMore = () => {
		console.log('loadmore');
		dispatch(nextPage(page + 1));
		if (data.length >= total) {
			dispatch(setLoadMore(false));
		}
	};

	useEffect(() => {
		function getData() {
			dispatch(show());
			dispatch(fetchFilms({ page, limit }));
			dispatch(hide());
		}

		if (status === 'idle' || status === 'failed') {
			getData();
		}
		return () => {
			if (props.history.location.pathname !== '/films') {
				dispatch({ type: 'destroy_session' });
			}
		};
	}, [dispatch, status, isLoadMore, page]);

	return (
		<React.Fragment>
			<Container fixed style={{ marginTop: 16, marginBottom: 100 }}>
				<Grid container spacing={0}>
					<InfiniteScroll
						dataLength={data.length}
						next={loadMore}
						hasMore={isLoadMore}
						loader={<h4>Loading...</h4>}
					>
						<Grid container spacing={3}>
							{data.length > 0
								? data.map((film) => {
										return (
											<Grid item xs={12} key={film.id}>
												<FilmCard film={film} />
											</Grid>
										);
								  })
								: ''}
						</Grid>
					</InfiniteScroll>
				</Grid>
			</Container>
		</React.Fragment>
	);
};

export default FilmList;
