import React, { useEffect, useState, Suspense, lazy } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroll-component';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import FilmCard from '../../components/FilmCard';
import {
	selectAllFilm,
	fetchFilms,
	nextPage,
	setLoadMore,
	destroySession
} from './filmSlice';
const BackDropCustom = lazy(() => import('../../components/BackDrop'));

const FilmList = (props) => {
	const [open, setOpen] = useState(false);
	const data = useSelector(selectAllFilm);
	const isLoadMore = useSelector((state) => state.film.isLoadMore);
	const total = useSelector((state) => state.film.total);
	const isNew = useSelector((state) => state.auth.isNew);
	const query = useSelector((state) => state.film.query);
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
			await dispatch(fetchFilms(query));
			setOpen(false);
		}

		getData();
		return () => {
			if (props.history.location.pathname !== '/films') {
				dispatch(destroySession());
			}
		};
	}, [dispatch, isNew, query]);
	return (
		<Container fixed style={{ paddingTop: 50, paddingBottom: 50 }}>
			<Suspense fallback={<div>Loading...</div>}>
				<BackDropCustom open={open} />
			</Suspense>
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
