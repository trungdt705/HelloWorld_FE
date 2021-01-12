import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import { sliceField } from '../utils/utils';

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

function transformPremiere(premiere) {
	return `Khởi chiếu: ${premiere}`;
}

export default function FilmCard(props) {
	const classes = useStyles();
	const { film } = props;
	return (
		<Box border={1} borderColor="#f5f5f5" className={'item'}>
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
					title={sliceField(film.name, 15)}
					titleTypographyProps={{ variant: 'subtitle1' }}
					subheader={transformPremiere(film.premiere)}
					subheaderTypographyProps={{ variant: 'subtitle2' }}
				/>
				<Link to={`/films/${film.id}`}>
					<CardMedia
						className={classes.media}
						image={film.image}
						title="Paella dish"
					/>
				</Link>
				<CardContent>
					<Typography
						variant="body2"
						color="textSecondary"
						component="p"
					>
						{sliceField(film.description, 40)}
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
