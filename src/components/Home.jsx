import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import ButtonBase from '@material-ui/core/ButtonBase';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import moment from 'moment-timezone';
import { get } from '../utils/client';

const categories = [
	{
		url: '/images/cinema.jpg',
		title: 'Phim ảnh',
		width: '100%',
		link: '/films'
	},
	{
		url: '/images/foods.jpg',
		title: 'Đồ ăn',
		width: '100%',
		link: '/foods'
	},
	{
		url: '/images/events.jpg',
		title: 'Sự kiện',
		width: '100%',
		link: '/events'
	}
];

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		flexWrap: 'wrap',
		minWidth: 300,
		width: '100%'
	},
	image: {
		position: 'relative',
		height: 200,
		[theme.breakpoints.down('xs')]: {
			width: '100% !important', // Overrides inline-style
			height: 100
		},
		'&:hover, &$focusVisible': {
			zIndex: 1,
			'& $imageBackdrop': {
				opacity: 0.15
			},
			'& $imageMarked': {
				opacity: 0
			},
			'& $imageTitle': {
				border: '4px solid currentColor'
			}
		}
	},
	focusVisible: {},
	imageButton: {
		position: 'absolute',
		left: 0,
		right: 0,
		top: 0,
		bottom: 0,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		color: theme.palette.common.white
	},
	imageSrc: {
		position: 'absolute',
		left: 0,
		right: 0,
		top: 0,
		bottom: 0,
		backgroundSize: 'cover',
		backgroundPosition: 'center 40%'
	},
	imageBackdrop: {
		position: 'absolute',
		left: 0,
		right: 0,
		top: 0,
		bottom: 0,
		backgroundColor: theme.palette.common.black,
		opacity: 0.4,
		transition: theme.transitions.create('opacity')
	},
	imageTitle: {
		position: 'relative',
		padding: `${theme.spacing(2)}px ${theme.spacing(4)}px ${
			theme.spacing(1) + 6
		}px`
	},
	imageMarked: {
		height: 3,
		width: 18,
		backgroundColor: theme.palette.common.white,
		position: 'absolute',
		bottom: -2,
		left: 'calc(50% - 9px)',
		transition: theme.transitions.create('opacity')
	}
}));

export default function Home(props) {
	const classes = useStyles();
	const dispatch = useDispatch();

	const [exchangeRate, setExchangeRate] = useState('');
	const accessToken = useSelector((state) => state.auth.accessToken);
	const goToPage = (link) => {
		props.history.push(link);
	};

	useEffect(() => {
		async function getExchangeRateToDay() {
			try {
				const response = await get('exchange-rates/actions/', {
					headers: {
						Authorization: accessToken
					}
				});
				// console.log(response);
				setExchangeRate(response.data);
			} catch (error) {
				throw error;
			}
		}
		getExchangeRateToDay();
	}, [dispatch, exchangeRate]);

	return (
		<div className={classes.root}>
			<Container fixed style={{ marginTop: 50 }}>
				<Grid>
					<div>
						<Button variant="outlined" color="secondary">
							Tỉ giá VND/AUD ngày {moment().format('YYYY-MM-DD')}:
							{' 17.444 '}
							{exchangeRate}
						</Button>
					</div>
				</Grid>
			</Container>
			<Container style={{ marginTop: 16 }}>
				<Grid container spacing={3}>
					{categories.map((category) => (
						<Grid item lg={4} xs={12}>
							<ButtonBase
								focusRipple
								key={category.title}
								className={classes.image}
								focusVisibleClassName={classes.focusVisible}
								style={{
									width: category.width
								}}
								onClick={() => goToPage(category.link)}
							>
								<span
									className={classes.imageSrc}
									style={{
										backgroundImage: `url(${category.url})`
									}}
								/>
								<span className={classes.imageBackdrop} />
								<span className={classes.imageButton}>
									<Typography
										component="span"
										variant="subtitle1"
										color="inherit"
										className={classes.imageTitle}
									>
										{category.title}
										<span className={classes.imageMarked} />
									</Typography>
								</span>
							</ButtonBase>
						</Grid>
					))}
				</Grid>
			</Container>
		</div>
	);
}
