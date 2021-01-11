import React from 'react';
import { makeStyles } from '@material-ui/core';
import {
	TimelineItem,
	TimelineSeparator,
	TimelineConnector,
	TimelineContent,
	TimelineOppositeContent,
	TimelineDot
} from '@material-ui/lab';
import { Paper, Typography } from '@material-ui/core';
import moment from 'moment-timezone';
import { EVENTICON } from '../contants/eventIcon';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
	paper: {
		padding: '6px 16px'
	},
	secondaryTail: {
		backgroundColor: theme.palette.secondary.main
	}
}));

export default function EventItem(props) {
	const classes = useStyles();
	const history = useHistory();
	const { event } = props;
	const goToDetail = (id) => {
		history.push(`/events/${id}`);
	};
	return (
		<TimelineItem onClick={() => goToDetail(event.id)}>
			<TimelineOppositeContent>
				<Typography variant="body2" color="textSecondary">
					{moment(event.due_date)
						.tz('Asia/Ho_Chi_Minh')
						.format('DD-MM-YYYY HH:mm')}
				</Typography>
			</TimelineOppositeContent>
			<TimelineSeparator>
				<TimelineDot>{EVENTICON[event.tag].icon}</TimelineDot>
				<TimelineConnector />
			</TimelineSeparator>
			<TimelineContent>
				<Paper elevation={3} className={classes.paper}>
					<Typography variant="h6" component="h5">
						{event.name}
					</Typography>
				</Paper>
			</TimelineContent>
		</TimelineItem>
	);
}
