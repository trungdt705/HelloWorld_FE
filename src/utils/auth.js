import { post, get } from './client';
import store from '../app/store';
import { setAccessToken } from '../features/auth/authSlice';
import jwtDecode from 'jwt-decode';

export const authenticate = async (user) => {
	try {
		const result = await post('login/', user);
		return result;
	} catch (error) {
		throw error;
	}
};

export const getCurrentUser = async (token) => {
	try {
		const result = await get('users/current/', {
			headers: {
				Authorization: `Bearer ${token}`
			}
		});
		return result;
	} catch (error) {
		throw error;
	}
};

export const isAuthenticate = (accessToken, refreshToken) => {
	const decodedAccessToken = jwtDecode(accessToken);
	const decodedRefreshToken = jwtDecode(refreshToken);
	if (
		accessToken &&
		decodedAccessToken.exp > Math.round(new Date().getTime() / 1000)
	) {
		return true;
	}

	if (
		!decodedRefreshToken ||
		decodedRefreshToken.exp < Math.round(new Date().getTime() / 1000)
	) {
		return false;
	}
	return true;
};

export const handleRefreshToken = async (refreshToken) => {
	console.log('handleRefreshToken');
	try {
		const result = await post('token/refresh/', {
			refresh: refreshToken
		});
		if (result) {
			store.dispatch(setAccessToken(`Bearer ${result.access}`));
		}
	} catch (error) {
		throw error;
	}
};
