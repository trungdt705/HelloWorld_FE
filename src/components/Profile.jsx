import React, { useEffect } from 'react';
import clsx from 'clsx';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserDetail } from '../features/users/userSlice';

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		flexWrap: 'wrap',
		minWidth: 300,
		width: '100%'
	},
	margin: {
		marginBottom: theme.spacing(1)
	},
	withoutLabel: {
		marginTop: theme.spacing(3)
	}
}));

const Profile = () => {
	const dispatch = useDispatch();
	const classes = useStyles();
	const token = useSelector((state) => state.auth.accessToken);
	const currentUser = useSelector((state) => state.user.currentUser);
	useEffect(() => {
		console.log('useEffect');
		dispatch(fetchUserDetail(token));
	}, [dispatch]);
	return (
		<div className={classes.root}>
			<Container fixed style={{ marginTop: 50 }}>
				<Typography variant="h6" component="h2">
					THÔNG TIN CÁ NHÂN
				</Typography>
			</Container>
			<Container fixed style={{ marginTop: 50 }}>
				<Grid container spacing={0} direction="column">
					<form
						className={classes.root}
						noValidate
						autoComplete="off"
					>
						<FormControl
							fullWidth
							className={clsx(classes.margin, classes.textField)}
							variant="outlined"
							disabled
						>
							<InputLabel htmlFor="outlined-adornment-password">
								Email
							</InputLabel>
							<OutlinedInput
								id="outlined-adornment-password"
								type="text"
								value={currentUser ? currentUser.email : ''}
								labelWidth={70}
							/>
						</FormControl>
						<FormControl
							fullWidth
							className={clsx(classes.margin, classes.textField)}
							variant="outlined"
							disabled
						>
							<InputLabel htmlFor="outlined-adornment-password">
								Spouse Name
							</InputLabel>
							<OutlinedInput
								id="outlined-adornment-password"
								type="text"
								value={
									currentUser ? currentUser.spouse_name : ''
								}
								labelWidth={70}
							/>
						</FormControl>
						<FormControl
							fullWidth
							className={clsx(classes.margin, classes.textField)}
							variant="outlined"
							disabled
						>
							<InputLabel htmlFor="outlined-adornment-password">
								First Name
							</InputLabel>
							<OutlinedInput
								id="outlined-adornment-password"
								type="text"
								value={
									currentUser ? currentUser.first_name : ''
								}
								labelWidth={70}
							/>
						</FormControl>
						<FormControl
							fullWidth
							className={clsx(classes.margin, classes.textField)}
							variant="outlined"
							disabled
						>
							<InputLabel htmlFor="outlined-adornment-password">
								Favourite
							</InputLabel>
							<OutlinedInput
								id="outlined-adornment-password"
								type="text"
								value={currentUser ? currentUser.favourite : ''}
								labelWidth={70}
							/>
						</FormControl>
					</form>
				</Grid>
			</Container>
		</div>
	);
};

export default Profile;
