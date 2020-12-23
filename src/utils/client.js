import axios from 'axios';
import store from '../app/store';
const BASE_URL = 'http://119.82.135.130/api';

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
