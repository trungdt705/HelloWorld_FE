import {
	Container,
	Grid,
	CardMedia,
	Chip,
	Button,
	makeStyles,
} from "@material-ui/core";
import DoneIcon from "@material-ui/icons/Done";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectFilmById, getFilmById } from "./filmSlice";

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	paper: {
		padding: theme.spacing(2),
		textAlign: "center",
		color: theme.palette.text.secondary,
	},

	media: {
		height: 500,
	},

	title: {
		fontWeight: "bold",
		marginRight: 10,
	},
}));

export const FilmDetail = (props) => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const { match } = props;

	const film = useSelector(selectFilmById);
	const status = useSelector((state) => state.film.statusOne);

	const renderContentSuccess = (film) => {
		return (
			<React.Fragment>
				<Container maxWidth="sm" style={{ marginBottom: 100 }}>
					<Grid container spacing={1} style={{ textAlign: "left" }}>
						<Grid item xs={12}>
							<h2>{film.name}</h2>
						</Grid>
						<Grid item xs={12}>
							<CardMedia
								className={classes.media}
								image={film.image}
								title="Contemplative Reptile"
							/>
						</Grid>
						<Grid item xs={12}>
							<span className={classes.title}>Thể loại:</span>
							<span>{film.type}</span>
						</Grid>
						<Grid item xs={12}>
							<span className={classes.title}>Thời lượng:</span>
							<span>
								<Chip
									label={film.duration + " Phút"}
									clickable
									color="primary"
								/>
							</span>
						</Grid>
						<Grid item xs={12}>
							<span className={classes.title}>Diễn viên:</span>
							<span>{film.cast}</span>
						</Grid>
						<Grid item xs={12}>
							<span className={classes.title}>Khởi chiếu:</span>
							<span>
								<Chip
									label={film.premiere}
									clickable
									color="secondary"
									deleteIcon={<DoneIcon />}
								/>
							</span>
						</Grid>
						<Grid item xs={12}>
							<span className={classes.title}>Mô tả:</span>
							<p>{film.description}</p>
						</Grid>
						<Grid item xs={12}>
							<Button
								variant="outlined"
								color="primary"
								href={film.detail_link}
							>
								Link
							</Button>
						</Grid>
					</Grid>
				</Container>
			</React.Fragment>
		);
	};
	let content;
	useEffect(() => {
		dispatch(getFilmById(match.params.id));
	}, []);
	if (status === "succeeded") {
		content = renderContentSuccess(film);
	}
	if (status === "error") {
		console.log("not found");
	}
	return <div>{content}</div>;
};
