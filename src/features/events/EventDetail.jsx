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
	gridList: {
		width: 500,
		height: 450
	}
}));

const tileData = [
	{
		img:
			'https://helpx.adobe.com/content/dam/help/en/stock/how-to/visual-reverse-image-search/jcr_content/main-pars/image/visual-reverse-image-search-v2_intro.jpg',
		title: 'Image',
		author: 'author',
		cols: 2
	},
	{
		img:
			'https://helpx.adobe.com/content/dam/help/en/stock/how-to/visual-reverse-image-search/jcr_content/main-pars/image/visual-reverse-image-search-v2_intro.jpg',
		title: 'Image',
		author: 'author',
		cols: 2
	},
	{
		img:
			'https://helpx.adobe.com/content/dam/help/en/stock/how-to/visual-reverse-image-search/jcr_content/main-pars/image/visual-reverse-image-search-v2_intro.jpg',
		title: 'Image',
		author: 'author',
		cols: 3
	},
	{
		img:
			'https://helpx.adobe.com/content/dam/help/en/stock/how-to/visual-reverse-image-search/jcr_content/main-pars/image/visual-reverse-image-search-v2_intro.jpg',
		title: 'Image',
		author: 'author',
		cols: 1
	},
	{
		img:
			'https://helpx.adobe.com/content/dam/help/en/stock/how-to/visual-reverse-image-search/jcr_content/main-pars/image/visual-reverse-image-search-v2_intro.jpg',
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
				<Grid
					container
					style={{
						paddingTop: 40,
						textAlign: 'left'
					}}
				>
					<img
						src="https://backstage.vn/wp-content/uploads/2018/12/shutterstock_538256848.jpg"
						style={{ width: '100%' }}
					/>
				</Grid>
				<Container
					maxWidth="sm"
					style={{
						marginTop: 20,
						paddingBottom: 60,
						textAlign: 'left'
					}}
				>
					<Grid container style={{ marginBottom: 10 }} spacing={2}>
						<Grid item xs={12}>
							<Typography
								variant="h4"
								style={{ fontWeight: 'bold' }}
							>
								{event.name}
							</Typography>
						</Grid>
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
					</Grid>
					<Divider />
					<Grid container>
						<Grid item xs={6}>
							<Typography variant="h6">Thời gian</Typography>
							<span className={classes.spanText}>
								{moment(event.due_date).format('DD-MM-YYYY')}
							</span>
						</Grid>
						<Grid item xs={6}>
							<Typography variant="h6">Còn lại</Typography>
							<span
								className={
									remainTime < 60
										? classes.closeDay
										: classes.farDay
								}
							>
								{remainTime} {remainTime > 0 ? 'ngày' : ''}
							</span>
						</Grid>
					</Grid>
					<Grid style={{ marginTop: 20 }}>
						<div className={classes.root}>
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
						</div>
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