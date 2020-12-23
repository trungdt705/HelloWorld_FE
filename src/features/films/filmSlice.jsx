import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { get, getById } from '../../utils/client';
import { handleRefreshToken } from '../../utils/auth';

export const selectAllFilm = (state) => state.film.films;

export const selectFilmById = (state) => state.film.oneFilm;

export const selectPagination = (state) => state.film.pagination;
let a = 1;
export const fetchFilms = createAsyncThunk(
	'films/fetchFilms',
	async (query, { getState, dispatch }) => {
		const token = getState().auth.accessToken;
		try {
			const response = await get(
				`films/?page=${query.page}&limit=${query.limit}`,
				{
					headers: {
						Authorization: `${token}`
					}
				}
			);
			return response;
		} catch (error) {
			await handleRefreshToken(getState().auth.refreshToken);
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

const initialState = {
	films: [],
	oneFilm: null,
	statusAll: 'idle',
	statusOne: 'idle',
	isLoadMore: true,
	total: 0,
	pagination: {
		page: 1,
		limit: 5
	},
	error: null
};

const filmSlice = createSlice({
	name: 'film',
	initialState,
	reducers: {
		nextPage: (state, action) => {
			state.pagination.page = action.payload;
		},
		setLoadMore: (state, action) => {
			state.isLoadMore = action.payload;
		},
		setStatus: (state, action) => {
			state.statusAll = action.payload;
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

export const { nextPage, setLoadMore, setStatus } = filmSlice.actions;

export default filmSlice.reducer;
