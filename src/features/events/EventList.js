import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroll-component';
import Timeline from '@material-ui/lab/Timeline';
import {
	selectAllEvent,
	fetchEvents,
	selectPagination,
	nextPage,
	setLoadMore,
	destroySession
} from './eventSlice';
import { show, hide } from '../backdrop/backDropSlice';
import EventItem from '../../components/EventItem';

export const EventList = (props) => {
	const dispatch = useDispatch();
	const data = useSelector(selectAllEvent);
	const { page, limit } = useSelector(selectPagination);
	const isLoadMore = useSelector((state) => state.food.isLoadMore);
	const total = useSelector((state) => state.food.total);
	const isNew = useSelector((state) => state.auth.isNew);
	const loadMore = () => {
		if (data.length >= total) {
			dispatch(setLoadMore(false));
		} else {
			dispatch(nextPage(page + 1));
		}
	};
	useEffect(() => {
		console.log('useEffect');
		function getEvents() {
			dispatch(show());
			dispatch(fetchEvents({ page, limit }));
			dispatch(hide());
		}
		getEvents();
		return () => {
			if (props.history.location.pathname !== '/events') {
				dispatch(destroySession());
			}
		};
	}, [dispatch, isNew, page]);
	return (
		<Timeline
			align="alternate"
			style={{ paddingTop: 50, paddingBottom: 50 }}
		>
			{data.length > 0 ? (
				<InfiniteScroll
					dataLength={data.length}
					next={loadMore}
					hasMore={isLoadMore}
					loader={<h4>Loading...</h4>}
				>
					{data.map((event) => (
						<EventItem event={event} key={event.id} />
					))}
				</InfiniteScroll>
			) : (
				''
			)}
		</Timeline>
	);
};
