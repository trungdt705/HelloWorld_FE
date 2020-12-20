import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import {
	selectAllFilm,
	fetchFilms,
	selectPagination,
	nextPage,
} from "../features/films/filmSlice";
import { show, hide } from "../features/backdrop/backDropSlice";

function withInfinitiveScroll(Component) {
	return function WithInfinitiveScroll(props) {
		const data = useSelector(selectAllFilm);
		const pagination = useSelector(selectPagination);
		const dispatch = useDispatch();
		useEffect(() => {
			async function getFilms() {
				dispatch(show());
				await dispatch(fetchFilms({ page: pagination.page, limit: 5 }));
				dispatch(hide());
			}
			getFilms();
			return () => {
				if (props.history.location.pathname !== "/films") {
					dispatch({ type: "destroy_session" });
				}
			};
		}, [pagination.page]);
		const loadMore = () => {
			dispatch(nextPage(pagination.page + 1));
		};

		return (
			<InfiniteScroll
				dataLength={data.length}
				next={loadMore}
				hasMore={true}
				loader={<h4>Loading...</h4>}
			>
				<Container fixed style={{ marginTop: 16, marginBottom: 100 }}>
					<Grid container spacing={3}>
						<Component data={data} />
					</Grid>
				</Container>
			</InfiniteScroll>
		);
	};
}

export default withInfinitiveScroll;
