import moment from 'moment-timezone';
import {
	Container,
	Grid,
	Divider,
	Typography,
	makeStyles,
	Chip,
	GridList,
	GridListTile,
	GridListTileBar,
	IconButton
} from '@material-ui/core';
import { StarBorder } from '@material-ui/icons';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { getEventById, selectEventById } from './eventSlice';

const useStyles = makeStyles((theme) => ({
	descriptionText: {
		color: 'grey'
	},
	eventName: {
		fontWeight: 'bold',
		textShadow: '2 2'
	},
	spanText: {
		color: 'grey',
		fontStyle: 'italic'
	},
	closeDay: {
		color: 'red'
	},
	farDay: {
		color: 'green'
	},
	root: {
		display: 'flex',
		flexWrap: 'wrap',
		justifyContent: 'space-around',
		overflow: 'hidden',
		backgroundColor: theme.palette.background.paper
	},
	gridList: {}
}));

const tileData = [
	{
		img: '/images/event_image.jpg',
		title: 'Image',
		author: 'author',
		cols: 2
	},
	{
		img: '/images/event_image.jpg',
		title: 'Image',
		author: 'author',
		cols: 2
	},
	{
		img: '/images/event_image.jpg',
		title: 'Image',
		author: 'author',
		cols: 3
	},
	{
		img: '/images/event_image.jpg',
		title: 'Image',
		author: 'author',
		cols: 1
	},
	{
		img: '/images/event_image.jpg',
		title: 'Image',
		author: 'author',
		cols: 2
	}
];

export const EventDetail = (props) => {
	const { match } = props;
	const dispatch = useDispatch();
	const classes = useStyles();
	const event = useSelector(selectEventById);
	const status = useSelector((state) => state.event.statusOne);
	const isNew = useSelector((state) => state.auth.isNew);

	const renderContentSuccess = () => {
		return (
			<React.Fragment>
				<Container
					style={{
						paddingTop: 60,
						paddingBottom: 60,
						textAlign: 'left'
					}}
				>
					<Grid container spacing={3}>
						<Grid item lg={6} xs={12}>
							<img
								src="/images/event_thumbnail.jpg"
								style={{ width: '100%' }}
							/>
							<GridList
								cellHeight={200}
								spacing={1}
								className={classes.gridList}
							>
								{tileData.map((tile) => (
									<GridListTile
										key={tile.img}
										cols={tile.featured ? 2 : 1}
										rows={tile.featured ? 2 : 1}
									>
										<img src={tile.img} alt={tile.title} />
										<GridListTileBar
											title={tile.title}
											titlePosition="top"
											actionIcon={
												<IconButton
													aria-label={`star ${tile.title}`}
													className={classes.icon}
												>
													<StarBorder />
												</IconButton>
											}
											actionPosition="left"
											className={classes.titleBar}
										/>
									</GridListTile>
								))}
							</GridList>
						</Grid>
						<Grid item lg={6} xs={12}>
							<Typography
								variant="h4"
								style={{ fontWeight: 'bold' }}
							>
								{event.name}
							</Typography>
							<Grid item xs={12}>
								<span
									className={classes.spanText}
									style={{ marginRight: 5 }}
								>
									Tag:
								</span>
								<Chip
									size="small"
									label={event.tag.name}
									style={{
										backgroundColor: event.tag.color,
										color: 'white'
									}}
								/>
							</Grid>
							<Grid container>
								<Grid item xs={6}>
									<Typography variant="h6">
										Thời gian
									</Typography>
									<span className={classes.spanText}>
										{moment(event.due_date).format(
											'DD-MM-YYYY'
										)}
									</span>
								</Grid>
								<Grid item xs={6}>
									<Typography variant="h6">
										Còn lại
									</Typography>
									<span
										className={
											remainTime < 60
												? classes.closeDay
												: classes.farDay
										}
									>
										{remainTime}{' '}
										{remainTime > 0 ? 'ngày' : ''}
									</span>
								</Grid>
							</Grid>
						</Grid>
						<Divider />
					</Grid>
				</Container>
			</React.Fragment>
		);
	};
	let remainTime = 0;
	let content;
	useEffect(() => {
		dispatch(getEventById(match.params.id));
	}, [dispatch, isNew, match.params.id]);

	if (status === 'succeeded') {
		const now = moment();
		remainTime = now.diff(event.due_date, 'days');
		if (remainTime < 0) {
			remainTime = `${Math.abs(remainTime)}`;
		} else {
			remainTime = <Chip label="Đã qua" disabled variant="outlined" />;
		}
		content = renderContentSuccess(event);
	}
	if (status === 'failed') {
		return <Redirect to="/not-found" />;
	}
	return <div>{content}</div>;
};
