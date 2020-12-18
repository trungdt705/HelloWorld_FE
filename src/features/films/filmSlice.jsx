import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { get, getById } from '../../utils/client';

export const selectAllFilm = (state) => state.film.films;

export const selectFilmById = (state) => state.film.oneFilm;

export const selectPagination = (state) => state.film.pagination;

export const fetchFilms = createAsyncThunk(
	'films/fetchFilms',
	async (query) => {
		try {
			const response = await get(
				`films/?page=${query.page}&limit=${query.limit}`
			);
			return response;
		} catch (error) {
			throw error;
		}
	}
);

export const getFilmById = createAsyncThunk('films/getFilmById', async (id) => {
	try {
		const response = await getById('films', id);
		return response;
	} catch (error) {
		throw error;
	}
});

const filmSlice = createSlice({
	name: 'film',
	initialState: {
		films: [],
		oneFilm: null,
		statusAll: 'idle',
		statusOne: 'idle',
		pagination: {
			page: 1,
			limit: 10
		},
		error: null
	},
	reducers: {},
	extraReducers: {
		[fetchFilms.pending]: (state, action) => {
			state.statusAll = 'loading';
		},
		[fetchFilms.fulfilled]: (state, action) => {
			state.statusAll = 'succeeded';
			console.log(
				'state.films.length',
				state.films.length,
				action.payload
			);
			// if (state.films.length === 0) {
			// 	state.films = action.payload;
			// } else {
			// 	state.films = state.films.concat(action.payload);
			// }
			state.films = state.films.concat(action.payload);
		},
		[fetchFilms.rejected]: (state, action) => {
			state.statusAll = 'failed';
			state.error = action.error.message;
		},
		[getFilmById.pending]: (state, action) => {
			state.statusOne = 'loading';
		},
		[getFilmById.fulfilled]: (state, action) => {
			state.statusOne = 'succeeded';
			state.oneFilm = action.payload;
		},
		[getFilmById.rejected]: (state, action) => {
			state.statusOne = 'failed';
			state.error = action.error.message;
		}
	}
});

export default filmSlice.reducer;
