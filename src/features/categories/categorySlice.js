import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { get, getById } from '../../utils/client';
import { handleUnauthorizeError } from '../../utils/utils';
import { setStatus } from '../auth/authSlice';

export const selectAllCategory = (state) => state.category.categories;

export const selectCategoryById = (state) => state.category.category;

export const fetchCategories = createAsyncThunk(
	'films/fetchCategories',
	async ({}, { getState, dispatch }) => {
		try {
			const response = await get('categories/', {
				headers: {
					Authorization: `${getState().auth.accessToken}`
				}
			});
			return response.results;
		} catch (error) {
			await handleUnauthorizeError(error, { getState, dispatch });
			throw error;
		}
	}
);

export const getCategoryById = createAsyncThunk(
	'films/getCategoryById',
	async (id, { getState, dispatch }) => {
		try {
			const response = await getById('categories', id, {
				headers: {
					Authorization: `${getState().auth.accessToken}`
				}
			});
			return response;
		} catch (error) {
			await handleUnauthorizeError(error, { getState, dispatch });
			throw error;
		}
	}
);

const categorySlice = createSlice({
	name: 'category',
	initialState: {
		categories: [],
		category: null,
		statusAll: 'idle',
		statusOne: 'idle',
		error: null
	},
	reducers: {},
	extraReducers: {
		[fetchCategories.pending]: (state, action) => {
			state.status = 'loading';
		},
		[fetchCategories.fulfilled]: (state, action) => {
			state.statusAll = 'succeeded';
			// Add any fetched posts to the array
			state.categories = action.payload;
		},
		[fetchCategories.rejected]: (state, action) => {
			state.statusAll = 'failed';
			state.error = action.error.message;
		},
		[getCategoryById.pending]: (state, action) => {
			state.statusOne = 'loading';
		},
		[getCategoryById.fulfilled]: (state, action) => {
			state.statusOne = 'succeeded';
			state.category = action.payload;
		},
		[getCategoryById.rejected]: (state, action) => {
			state.statusOne = 'failed';
			state.error = action.error.message;
		}
	}
});

export default categorySlice.reducer;
