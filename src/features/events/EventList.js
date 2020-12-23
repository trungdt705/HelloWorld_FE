import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroll-component';
import Timeline from '@material-ui/lab/Timeline';
import Container from '@material-ui/core/Container';
import {
	selectAllEvent,
	fetchEvents,
	selectPagination,
	nextPage
} from './eventSlice';
// import { makeStyles } from '@material-ui/core/styles';
import { show, hide } from '../backdrop/backDropSlice';
import EventItem from '../../components/EventItem';

// const useStyles = makeStyles((theme) => ({
// 	root: {
// 		flexGrow: 1
// 	}
// }));

export const EventList = () => {
	const dispatch = useDispatch();
	// const classes = useStyles();
	const events = useSelector(selectAllEvent);
	const pagination = useSelector(selectPagination);
	const loadMore = () => {
		dispatch(nextPage(pagination.page + 1));
	};
	useEffect(() => {
		function getEvents() {
			dispatch(fetchEvents(pagination));
		}
		getEvents();
	}, [pagination, dispatch]);
	return (
		<Timeline align="alternate" style={{ marginBottom: 100 }}>
			{events.length > 0 ? (
				<InfiniteScroll
					dataLength={events.length}
					next={loadMore}
					hasMore={true}
					loader={<h4>Loading...</h4>}
				>
					{events.map((event) => (
						<EventItem event={event} key={event.id} />
					))}
				</InfiniteScroll>
			) : (
				''
			)}
		</Timeline>
	);
};
