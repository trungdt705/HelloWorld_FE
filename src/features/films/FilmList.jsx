import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroll-component';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import FilmCard from '../../components/FilmCard';
import {
	selectAllFilm,
	fetchFilms,
	selectPagination,
	nextPage,
	setLoadMore,
	destroySession
} from './filmSlice';
import { show, hide } from '../backdrop/backDropSlice';

const FilmList = (props) => {
	const data = useSelector(selectAllFilm);
	const isLoadMore = useSelector((state) => state.film.isLoadMore);
	const total = useSelector((state) => state.film.total);
	const isNew = useSelector((state) => state.auth.isNew);
	const { page, limit } = useSelector(selectPagination);
	const dispatch = useDispatch();
	const loadMore = () => {
		if (data.length !== 0 && data.length >= total) {
			dispatch(setLoadMore(false));
		} else {
			dispatch(nextPage(page + 1));
		}
	};

	useEffect(() => {
		function getData() {
			dispatch(show());
			dispatch(fetchFilms({ page, limit }));
			dispatch(hide());
		}

		getData();
		return () => {
			if (props.history.location.pathname !== '/films') {
				dispatch(destroySession());
			}
		};
	}, [dispatch, isNew, page]);

	return (
		<Container fixed style={{ paddingTop: 50, paddingBottom: 50 }}>
			<InfiniteScroll
				dataLength={data.length}
				next={loadMore}
				hasMore={isLoadMore}
				loader={<h4>Loading...</h4>}
			>
				{data.length > 0
					? data.map((film) => {
							return (
								<Grid
									item
									xs={12}
									key={film.id}
									style={{ marginBottom: 12 }}
								>
									<FilmCard film={film} />
								</Grid>
							);
					  })
					: ''}
			</InfiniteScroll>
		</Container>
	);
};

export default FilmList;
