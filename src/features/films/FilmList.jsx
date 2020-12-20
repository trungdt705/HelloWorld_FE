import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import {
	selectAllFilm,
	fetchFilms,
	selectPagination,
	nextPage,
} from "./filmSlice";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import FilmCard from "../../components/FilmCard";
import { show, hide } from "../backdrop/backDropSlice";
import withInfinitiveScroll from "../../hoc/withInfinitiveScroll";

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	paper: {
		padding: theme.spacing(2),
		textAlign: "center",
		color: theme.palette.text.secondary,
	},
}));

const FilmList = (props) => {
	console.log(props.data);
	// const dispatch = useDispatch();
	// const films = useSelector(selectAllFilm);
	// const pagination = useSelector(selectPagination);
	const classes = useStyles();

	// const loadMore = () => {
	// 	dispatch(nextPage(pagination.page + 1));
	// };

	useEffect(() => {
		// async function getFilms() {
		// 	dispatch(show());
		// 	await dispatch(fetchFilms({ page: pagination.page, limit: 5 }));
		// 	dispatch(hide());
		// }
		// getFilms();
		// return () => {
		// 	if (props.history.location.pathname !== "/films") {
		// 		dispatch({ type: "destroy_session" });
		// 	}
		// };
	}, []);

	return (
		<div className={classes.root}>
			{props.data.length > 0
				? props.data.map((film) => {
						return (
							<Grid item xs={12} key={film.id}>
								<FilmCard film={film} />
							</Grid>
						);
				  })
				: ""}
		</div>
	);
};

export default withInfinitiveScroll(FilmList);
