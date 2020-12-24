import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { get, getById } from '../../utils/client';

export const selectAllFood = (state) => state.food.foods;

export const selectFoodById = (state) => state.food.foodOne;

export const selectPagination = (state) => state.food.pagination;

export const fetchFoods = createAsyncThunk(
	'films/fetchFoods',
	async (query, { getState, dispatch }) => {
		try {
			const response = await get(
				`foods/?page=${query.page}&limit=${query.limit}`,
				{
					headers: {
						Authorization: `${getState().auth.accessToken}`
					}
				}
			);
			return response.results;
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
	pagination: {
		page: 1,
		limit: 5
	},
	statusAll: 'idle',
	statusOne: 'idle',
	error: null
};

const foodSlice = createSlice({
	name: 'food',
	initialState,
	reducers: {
		nextPage: (state, action) => {
			state.pagination.page = action.payload;
		},
		setLoadMore: (state, action) => {
			state.isLoadMore = action.payload;
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
			state.foods = state.foods.concat(action.payload);
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

export const { nextPage, setLoadMore, destroySession } = foodSlice.actions;

export default foodSlice.reducer;
