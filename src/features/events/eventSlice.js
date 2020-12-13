import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { get } from "../../utils/client";

export const selectAllEvent = (state) => state.event.events;

export const selectEventById = (state) => state.event.event;

export const selectPagination = (state) => state.event.pagination;

export const fetchEvents = createAsyncThunk(
	"films/fetchEvents",
	async (query) => {
		try {
			const response = await get(
				`events/?page=${query.page}&limit=${query.limit}`
			);
			return response;
		} catch (error) {
			throw error;
		}
	}
);

export const getEventById = createAsyncThunk(
	"films/getEventById",
	async (id) => {
		try {
			const response = await get(`events/${id}/`);
			return response;
		} catch (error) {
			throw error;
		}
	}
);

const eventSlice = createSlice({
	name: "event",
	initialState: {
		events: [],
		event: null,
		statusAll: "idle",
		statusOne: "idle",
		pagination: {
			page: 1,
			limit: 10,
		},
		error: null,
	},
	reducers: {
		nextPage: (state, action) => {
			// state.pagination.page = action.payload.page;
		},
	},
	extraReducers: {
		[fetchEvents.pending]: (state, action) => {
			state.statusAll = "loading";
		},
		[fetchEvents.fulfilled]: (state, action) => {
			state.statusAll = "succeeded";
			state.events = action.payload;
		},
		[fetchEvents.rejected]: (state, action) => {
			state.statusAll = "failed";
			state.error = action.error.message;
		},
		[getEventById.pending]: (state, action) => {
			state.statusOne = "loading";
		},
		[getEventById.fulfilled]: (state, action) => {
			state.statusOne = "succeeded";
			state.event = action.payload;
		},
		[getEventById.rejected]: (state, action) => {
			state.statusOne = "failed";
			state.error = action.error.message;
		},
	},
});

export const { nextPage } = eventSlice.actions;

export default eventSlice.reducer;
