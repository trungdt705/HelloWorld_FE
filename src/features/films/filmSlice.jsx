import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import queryString from 'querystring';
import { get, getById } from '../../utils/client';

export const selectAllFilm = (state) => state.film.films;

export const selectFilmById = (state) => state.film.oneFilm;

export const selectPagination = (state) => state.film.pagination;

export const fetchFilms = createAsyncThunk(
	'films/fetchFilms',
	async (query, { getState, dispatch }) => {
		try {
			const stringified = queryString.stringify(query);
			const response = await get(`films/?${stringified}`, {
				headers: {
					Authorization: `${getState().auth.accessToken}`
				}
			});
			return response;
		} catch (error) {
			throw error;
		}
	}
);

export const getFilmById = createAsyncThunk(
	'films/getFilmById',
	async (id, { getState, dispatch }) => {
		try {
			const token = getState().auth.accessToken;
			const response = await getById('films', id, {
				headers: {
					Authorization: `${token}`
				}
			});
			return response;
		} catch (error) {
			throw error;
		}
	}
);

const initialState = {
	films: [],
	oneFilm: null,
	statusAll: 'idle',
	statusOne: 'idle',
	isLoadMore: true,
	total: 0,
	query: {
		page: 1,
		limit: 3
	},
	error: null
};

const filmSlice = createSlice({
	name: 'film',
	initialState,
	reducers: {
		nextPage: (state, action) => {
			state.query.page = action.payload;
		},
		setLoadMore: (state, action) => {
			state.isLoadMore = action.payload;
		},
		setQuery: (state, action) => {
			state.query = action.payload;
		},
		destroySession: (state) => {
			return initialState;
		}
	},
	extraReducers: {
		[fetchFilms.pending]: (state, action) => {
			state.statusAll = 'loading';
		},
		[fetchFilms.fulfilled]: (state, action) => {
			state.statusAll = 'succeeded';
			state.films = state.films.concat(action.payload.results);
			state.total = action.payload.count;
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

export const {
	nextPage,
	setLoadMore,
	destroySession,
	setQuery
} = filmSlice.actions;

export default filmSlice.reducer;
