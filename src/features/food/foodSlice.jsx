import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import queryString from 'querystring';
import { get, getById } from '../../utils/client';

export const selectAllFood = (state) => state.food.foods;

export const selectFoodById = (state) => state.food.foodOne;

export const selectPagination = (state) => state.food.pagination;

export const fetchFoods = createAsyncThunk(
	'films/fetchFoods',
	async (query, { getState, dispatch }) => {
		try {
			const stringified = queryString.stringify(query);
			// window.location.search = stringified;
			const response = await get(`foods/?${stringified}`, {
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

export const getFoodById = createAsyncThunk(
	'films/getFoodById',
	async (id, { getState, dispatch }) => {
		try {
			const response = await getById('foods', id, {
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

const initialState = {
	foods: [],
	foodOne: null,
	isLoadMore: true,
	query: {
		page: 1,
		limit: 2,
		category: ''
	},
	total: 0,
	statusAll: 'idle',
	statusOne: 'idle',
	error: null
};

const foodSlice = createSlice({
	name: 'food',
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
		[fetchFoods.pending]: (state, action) => {
			state.status = 'loading';
		},
		[fetchFoods.fulfilled]: (state, action) => {
			state.statusAll = 'succeeded';
			// Add any fetched posts to the array
			state.foods = state.foods.concat(action.payload.results);
			state.total = action.payload.count;
		},
		[fetchFoods.rejected]: (state, action) => {
			state.statusAll = 'failed';
			state.error = action.error.message;
		},
		[getFoodById.pending]: (state, action) => {
			state.statusOne = 'loading';
		},
		[getFoodById.fulfilled]: (state, action) => {
			state.statusOne = 'succeeded';
			// Add any fetched posts to the array
			state.foodOne = action.payload;
		},
		[getFoodById.rejected]: (state, action) => {
			state.statusOne = 'failed';
			state.error = action.error.message;
		}
	}
});

export const {
	nextPage,
	setLoadMore,
	setQuery,
	destroySession
} = foodSlice.actions;

export default foodSlice.reducer;
