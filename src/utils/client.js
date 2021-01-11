import axios from 'axios';
import store from '../app/store';
import { handleRefreshToken } from '../utils/auth';
const BASE_URL = 'https://api.giadungthongminh.press';

// axios.interceptors.request.use(
// 	async (config) => {
// 		console.log(config);
// 		const value = await handleRefreshToken(
// 			localStorage.getItem('refresh_token')
// 		);
// 		const keys = JSON.parse(value);
// 		config.headers = {
// 			Authorization: `Bearer ${keys.access_token}`,
// 			Accept: 'application/json',
// 			'Content-Type': 'application/x-www-form-urlencoded'
// 		};
// 		return config;
// 	},
// 	(error) => {
// 		console.log('error', error);
// 		return Promise.reject(error);
// 	}
// );

// Response interceptor for API calls
axios.interceptors.response.use(
	(response) => {
		return response;
	},
	async function (error) {
		const originalRequest = error.config;
		if (error.response.status === 401 && !originalRequest._retry) {
			// originalRequest._retry = true;
			await handleRefreshToken(localStorage.getItem('refresh_token'));
			// axios.defaults.headers.common['Authorization'] =
			// 	'Bearer ' + access_token;
			// return axios(originalRequest);
		}
		return Promise.reject(error);
	}
);

export const get = async (path, config = {}) => {
	try {
		const response = await axios.get(`${BASE_URL}/${path}`, config);
		return response.data;
	} catch (error) {
		throw error;
	}
};

export const post = async (
	path,
	data,
	config = {
		headers: {
			Authorization: store.getState().auth.accessToken
		}
	}
) => {
	try {
		const response = await axios.post(`${BASE_URL}/${path}`, data, config);
		return response.data;
	} catch (error) {
		throw error;
	}
};

export const getById = async (
	path,
	id,
	config = {
		headers: {
			Authorization: store.getState().auth.accessToken
		}
	}
) => {
	try {
		const response = await axios.get(`${BASE_URL}/${path}/${id}/`, config);
		return response.data;
	} catch (error) {
		throw error;
	}
};
