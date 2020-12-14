import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TimelineItem from "@material-ui/lab/TimelineItem";
import TimelineSeparator from "@material-ui/lab/TimelineSeparator";
import TimelineConnector from "@material-ui/lab/TimelineConnector";
import TimelineContent from "@material-ui/lab/TimelineContent";
import TimelineOppositeContent from "@material-ui/lab/TimelineOppositeContent";
import TimelineDot from "@material-ui/lab/TimelineDot";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { EVENTICON } from "../contants/eventIcon";
import moment from "moment-timezone";

const useStyles = makeStyles((theme) => ({
	paper: {
		padding: "6px 16px",
	},
	secondaryTail: {
		backgroundColor: theme.palette.secondary.main,
	},
}));

export default function EventItem(props) {
	const classes = useStyles();
	const { event } = props;

	return (
		<React.Fragment>
			<TimelineItem>
				<TimelineOppositeContent>
					<Typography variant="body2" color="textSecondary">
						{moment(event.due_date)
							.tz("Asia/Ho_Chi_Minh")
							.format("DD-MM-YYYY HH:mm")}
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
		</React.Fragment>
	);
}
