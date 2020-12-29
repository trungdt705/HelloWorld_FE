import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import clsx from 'clsx';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import IconButton from '@material-ui/core/IconButton';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { authenticate, isAuthenticate } from '../utils/auth';
import { setAccessToken, setRefreshToken } from '../features/auth/authSlice';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		flexWrap: 'wrap'
	},
	margin: {
		marginBottom: theme.spacing(1)
	},
	withoutLabel: {
		marginTop: theme.spacing(3)
	}
}));

export default function LoginForm(props) {
	const [values, setValues] = useState({
		email: '',
		password: '',
		showPassword: false
	});
	const history = useHistory();
	const dispatch = useDispatch();
	const classes = useStyles();

	const accessToken = useSelector((state) => state.auth.accessToken);
	const refreshToken = useSelector((state) => state.auth.refreshToken);

	const handleChange = (prop) => (event) => {
		setValues({ ...values, [prop]: event.target.value });
	};

	const handleClickShowPassword = () => {
		setValues({ ...values, showPassword: !values.showPassword });
	};

	const handleMouseDownPassword = (event) => {
		event.preventDefault();
	};

	const login = async () => {
		try {
			const data = await authenticate({
				email: values.email,
				password: values.password
			});
			dispatch(setAccessToken(data.access));
			dispatch(setRefreshToken(data.refresh));
			history.push('/');
		} catch (error) {
			history.push('/login');
		}
	};
	useEffect(() => {
		if (isAuthenticate(accessToken, refreshToken)) {
			history.push(props.redirectPath || '/');
		}
	}, []);

	return (
		<Container maxWidth="sm">
			<Grid
				container
				spacing={0}
				direction="column"
				alignItems="center"
				justify="center"
				style={{ minHeight: '100vh' }}
			>
				<form className={classes.root} noValidate autoComplete="off">
					<FormControl
						fullWidth
						className={clsx(classes.margin, classes.textField)}
						variant="outlined"
					>
						<InputLabel htmlFor="outlined-adornment-password">
							Email
						</InputLabel>
						<OutlinedInput
							id="outlined-adornment-password"
							type="text"
							value={values.email}
							onChange={handleChange('email')}
							labelWidth={70}
						/>
					</FormControl>
					<FormControl
						fullWidth
						className={clsx(classes.margin, classes.textField)}
						variant="outlined"
					>
						<InputLabel htmlFor="outlined-adornment-password">
							Password
						</InputLabel>
						<OutlinedInput
							id="outlined-adornment-password"
							type={values.showPassword ? 'text' : 'password'}
							value={values.password}
							onChange={handleChange('password')}
							endAdornment={
								<InputAdornment position="end">
									<IconButton
										aria-label="toggle password visibility"
										onClick={handleClickShowPassword}
										onMouseDown={handleMouseDownPassword}
										edge="end"
									>
										{values.showPassword ? (
											<Visibility />
										) : (
											<VisibilityOff />
										)}
									</IconButton>
								</InputAdornment>
							}
							labelWidth={70}
						/>
					</FormControl>
				</form>
				<div style={{ textAlign: 'center' }}>
					<Button
						variant="outlined"
						size="medium"
						color="primary"
						onClick={login}
						className={classes.margin}
					>
						Đăng nhập
					</Button>
				</div>
			</Grid>
		</Container>
	);
}
