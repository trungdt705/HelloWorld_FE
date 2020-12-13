import { Container, Grid, CardMedia, makeStyles } from "@material-ui/core";
import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectFoodById, getFoodById } from "./foodSlice";

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

export const FoodDetail = (props) => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const history = useHistory();
	const { match } = props;

	const food = useSelector(selectFoodById);
	const status = useSelector((state) => state.food.statusOne);
	const renderContentSuccess = (food) => {
		return (
			<React.Fragment>
				<Container maxWidth="sm" style={{ marginBottom: 100 }}>
					<Grid container spacing={1} style={{ textAlign: "left" }}>
						<Grid item xs={12}>
							<h2>{food.name}</h2>
						</Grid>
						<Grid item xs={12}>
							<CardMedia
								className={classes.media}
								image={food.thumbnail}
								title="Contemplative Reptile"
								P
							/>
						</Grid>
						<Grid item xs={12}>
							<span className={classes.title}>Mô tả:</span>
							<span>{food.description}</span>
						</Grid>
						<Grid item xs={12}>
							<span className={classes.title}>Địa chỉ:</span>
							<span>{food.address}</span>
						</Grid>
					</Grid>
				</Container>
			</React.Fragment>
		);
	};
	let content;
	useEffect(() => {
		async function getDetail() {
			try {
				await dispatch(getFoodById(match.params.id));
			} catch (error) {}
		}
		getDetail();
	}, []);
	if (status === "succeeded") {
		console.log(food);
		content = renderContentSuccess(food);
	}
	if (status === "failed") {
		console.log(123);
		history.push("/not-found");
	}
	return <div>{content}</div>;
};
