import axios from "axios";
const BASE_URL = "http://119.82.135.130/api";

export const get = async (path) => {
	try {
		const response = await axios.get(`${BASE_URL}/${path}`);
		return response.data.results;
	} catch (error) {
		throw error;
	}
};

export const getById = async (path, id) => {
	try {
		const response = await axios.get(`${BASE_URL}/${path}/${id}/`);
		return response.data;
	} catch (error) {
		throw error;
	}
};
