import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { isAuthenticate } from '../utils/auth';

const ProtectedRoute = ({ path, component: Component, render, ...rest }) => {
	const accessToken = useSelector((state) => state.auth.accessToken);
	const refreshToken = useSelector((state) => state.auth.refreshToken);
	return (
		<Route
			{...rest}
			render={(props) => {
				if (!isAuthenticate(accessToken, refreshToken)) {
					return <Redirect to="/login" />;
				}
				return Component ? <Component {...props} /> : render(props);
			}}
		></Route>
	);
};

export default ProtectedRoute;
