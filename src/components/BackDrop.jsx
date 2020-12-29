import React from 'react';
import { Backdrop, CircularProgress, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
	backdrop: {
		zIndex: theme.zIndex.drawer + 1,
		color: '#fff'
	}
}));

const BackDropCustom = (props) => {
	const classes = useStyles();
	return (
		<Backdrop className={classes.backdrop} open={props.open}>
			<CircularProgress color="inherit" />
		</Backdrop>
	);
};

export default BackDropCustom;
