import { post, get } from './client';
import store from '../app/store';
import { setAccessToken, setIsNew } from '../features/auth/authSlice';
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
				Authorization: `${token}`
			}
		});
		return result;
	} catch (error) {
		throw error;
	}
};

export const isAuthenticate = (accessToken, refreshToken) => {
	try {
		if (!accessToken) return false;
		const decodedAccessToken = jwtDecode(accessToken);
		if (
			accessToken &&
			decodedAccessToken.exp > Math.round(new Date().getTime() / 1000)
		) {
			return true;
		}
		if (refreshToken) {
			const decodedRefreshToken = jwtDecode(refreshToken);
			if (
				!decodedRefreshToken ||
				decodedRefreshToken.exp <
					Math.round(new Date().getTime() / 1000)
			) {
				return false;
			}
		}
		return true;
	} catch (error) {
		return false;
	}
};

export const handleRefreshToken = async (refreshToken) => {
	try {
		const result = await post('token/refresh/', {
			refresh: refreshToken
		});
		if (result) {
			store.dispatch(setAccessToken(`${result.access}`));
			store.dispatch(setIsNew(true));
		}
	} catch (error) {
		throw error;
	}
};
