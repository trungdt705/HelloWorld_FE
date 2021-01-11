import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import moment from 'moment-timezone';

const useStyles = makeStyles((theme) => ({
	media: {
		height: 0,
		paddingTop: '56.25%' // 16:9
	},
	expandOpen: {
		transform: 'rotate(180deg)'
	},
	avatar: {
		backgroundColor: red[500]
	}
}));

export default function FoodCard(props) {
	const classes = useStyles();
	const { food } = props;
	return (
		<Box border={1} borderColor="#f5f5f5">
			<Card className={classes.root}>
				<CardHeader
					// avatar={
					// 	<Avatar aria-label="recipe" className={classes.avatar}>
					// 		R
					// 	</Avatar>
					// }
					// action={
					// 	<IconButton aria-label="settings">
					// 		<MoreVertIcon />
					// 	</IconButton>
					// }
					title={food.name}
					subheader={moment(food.created_at).format(
						'YYYY-MM-DD HH:mm'
					)}
				/>
				<Link to={`foods/${food.id}`}>
					<CardMedia
						className={classes.media}
						image={food.thumbnail}
						title="Paella dish"
					/>
				</Link>

				<CardContent>
					<Typography
						variant="body2"
						color="textSecondary"
						component="p"
					>
						<span style={{ fontWeight: 'bold' }}>Địa chỉ:</span>{' '}
						{food.address}
					</Typography>
				</CardContent>
				{/* <CardActions disableSpacing>
					<IconButton aria-label="add to favorites">
						<FavoriteIcon />
					</IconButton>
					<IconButton aria-label="share">
						<ShareIcon />
					</IconButton>
				</CardActions> */}
			</Card>
		</Box>
	);
}
