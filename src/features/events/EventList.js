import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Timeline from "@material-ui/lab/Timeline";
import { selectAllEvent, fetchEvents, selectPagination } from "./eventSlice";
import { makeStyles } from "@material-ui/core/styles";
import { show, hide, selectBackDropStatus } from "../backdrop/backDropSlice";
import EventItem from "../../components/EventItem";

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
}));

export const EventList = () => {
	const dispatch = useDispatch();
	const classes = useStyles();
	const events = useSelector(selectAllEvent);
	const eventStatus = useSelector((state) => state.event.statusAll);
	const pagination = useSelector(selectPagination);
	const backDropStatus = useSelector(selectBackDropStatus);
	let content;
	if (eventStatus === "succeeded" && !backDropStatus) {
		content = events.map((event) => {
			return <EventItem event={event} key={event.id} />;
		});
	}

	useEffect(() => {
		async function getEvents() {
			dispatch(show());
			await dispatch(fetchEvents(pagination));
			dispatch(hide());
		}
		getEvents();
	}, [pagination]);

	return (
		<Timeline align="alternate" style={{ marginBottom: 100 }}>
			{content}
		</Timeline>
	);
};
