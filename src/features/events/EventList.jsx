import React, { useEffect, useState, Suspense, lazy } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroll-component';
import Timeline from '@material-ui/lab/Timeline';
import {
	selectAllEvent,
	fetchEvents,
	nextPage,
	setLoadMore,
	destroySession
} from './eventSlice';
import EventItem from '../../components/EventItem';
const BackDropCustom = lazy(() => import('../../components/BackDrop'));

export const EventList = (props) => {
	const dispatch = useDispatch();
	const [open, setOpen] = useState(false);
	const data = useSelector(selectAllEvent);
	const query = useSelector((state) => state.event.query);
	const isLoadMore = useSelector((state) => state.event.isLoadMore);
	const total = useSelector((state) => state.event.total);
	const isNew = useSelector((state) => state.auth.isNew);
	const loadMore = () => {
		if (data.length !== 0 && data.length >= total) {
			dispatch(setLoadMore(false));
		} else {
			dispatch(nextPage(query.page + 1));
		}
	};
	useEffect(() => {
		async function getEvents() {
			setOpen(true);
			await dispatch(fetchEvents(query));
			setOpen(false);
		}
		getEvents();
		return () => {
			if (props.history.location.pathname !== '/events') {
				dispatch(destroySession());
			}
		};
	}, [dispatch, isNew, query]);
	return (
		<Timeline
			align="alternate"
			style={{ paddingTop: 50, paddingBottom: 50 }}
		>
			<Suspense fallback={<div>Loading...</div>}>
				<BackDropCustom open={open} />
			</Suspense>
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
