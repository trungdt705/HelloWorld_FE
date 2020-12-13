import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
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
import { show, hide, selectBackDropStatus } from "../backdrop/backDropSlice";

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

export const FilmList = () => {
	const dispatch = useDispatch();
	const films = useSelector(selectAllFilm);
	const filmStatus = useSelector((state) => state.film.statusAll);
	const pagination = useSelector(selectPagination);
	const backDropStatus = useSelector(selectBackDropStatus);
	const classes = useStyles();
	let content;
	if (filmStatus === "succeeded" && !backDropStatus) {
		content = films.map((film) => {
			return (
				<Grid item xs={12} key={film.id}>
					<FilmCard film={film} />
				</Grid>
			);
		});
	}

	useEffect(() => {
		async function getFilms() {
			dispatch(show());
			await dispatch(fetchFilms(pagination));
			dispatch(hide());
		}
		getFilms();
	}, [pagination]);

	return (
		<div className={classes.root}>
			<Container fixed style={{ marginTop: 16, marginBottom: 100 }}>
				<Grid container spacing={3}>
					{content}
				</Grid>
			</Container>
		</div>
	);
};
