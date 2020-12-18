import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroll-component';
import { selectAllFilm, fetchFilms } from './filmSlice';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import FilmCard from '../../components/FilmCard';
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

export const FilmList = () => {
	const [page, setPage] = useState(1);
	const dispatch = useDispatch();
	const films = useSelector(selectAllFilm);
	const classes = useStyles();
	const loadMore = () => {
		setPage(page + 1);
	};

	useEffect(() => {
		async function getFilms() {
			console.log(page);
			dispatch(show());
			await dispatch(fetchFilms({ page, limit: 5 }));
			dispatch(hide());
		}
		getFilms();
	}, [page]);

	return (
		<div className={classes.root}>
			<Container fixed style={{ marginTop: 16, marginBottom: 100 }}>
				<InfiniteScroll
					dataLength={films.length}
					next={loadMore}
					hasMore={true}
					loader={<h4>Loading...</h4>}
				>
					<Grid container spacing={3}>
						{films.length > 0
							? films.map((film) => {
									return (
										<Grid item xs={12} key={film.id}>
											<FilmCard film={film} />
										</Grid>
									);
							  })
							: ''}
					</Grid>
				</InfiniteScroll>
			</Container>
		</div>
	);
};
