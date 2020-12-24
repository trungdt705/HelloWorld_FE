import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { UNAUTHORIZED } from 'http-status';
import { get } from '../../utils/client';
import { handleRefreshToken } from '../../utils/auth';

export const selectAllEvent = (state) => state.event.events;

export const selectEventById = (state) => state.event.event;

export const selectPagination = (state) => state.event.pagination;

export const fetchEvents = createAsyncThunk(
	'films/fetchEvents',
	async (query, { getState }) => {
		try {
			const response = await get(
				`events/?page=${query.page}&limit=${query.limit}`,
				{
					headers: {
						Authorization: `${getState().auth.accessToken}`
					}
				}
			);
			return response.results;
		} catch (error) {
			if (
				error.response.status === UNAUTHORIZED &&
				!getState().auth.isNew
			) {
				await handleRefreshToken(getState().auth.refreshToken);
			}
			throw error;
		}
	}
);

export const getEventById = createAsyncThunk(
	'films/getEventById',
	async (id, { getState }) => {
		try {
			const response = await get(`events/${id}/`, {
				headers: {
					Authorization: `${getState().auth.accessToken}`
				}
			});
			return response;
		} catch (error) {
			if (
				error.response.status === UNAUTHORIZED &&
				!getState().auth.isNew
			) {
				await handleRefreshToken(getState().auth.refreshToken);
			}
			throw error;
		}
	}
);

const initialState = {
	events: [],
	event: null,
	statusAll: 'idle',
	statusOne: 'idle',
	pagination: {
		page: 1,
		limit: 10
	},
	error: null
};

const eventSlice = createSlice({
	name: 'event',
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
		},
		destroySession: (state) => {
			return initialState;
		}
	},
	extraReducers: {
		[fetchEvents.pending]: (state, action) => {
			state.statusAll = 'loading';
		},
		[fetchEvents.fulfilled]: (state, action) => {
			state.statusAll = 'succeeded';
			state.events = state.events.concat(action.payload);
		},
		[fetchEvents.rejected]: (state, action) => {
			state.statusAll = 'failed';
			state.error = action.error.message;
		},
		[getEventById.pending]: (state, action) => {
			state.statusOne = 'loading';
		},
		[getEventById.fulfilled]: (state, action) => {
			state.statusOne = 'succeeded';
			state.event = action.payload;
		},
		[getEventById.rejected]: (state, action) => {
			state.statusOne = 'failed';
			state.error = action.error.message;
		}
	}
});

export const { nextPage, setLoadMore, destroySession } = eventSlice.actions;

export default eventSlice.reducer;
