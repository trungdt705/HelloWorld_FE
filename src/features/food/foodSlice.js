import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const selectAllFood = (state) => state.food.foods;

export const fetchFoods = createAsyncThunk('films/fetchFoods', async () => {
	console.log('fetchFoods');
	const response = await axios.get('http://119.82.135.130/api/foods/');
	return response.data;
});

const foodSlice = createSlice({
	name: 'food',
	initialState: {
		foods: [],
		status: 'idle',
		error: null
	},
	reducers: {},
	extraReducers: {
		[fetchFoods.pending]: (state, action) => {
			state.status = 'loading';
		},
		[fetchFoods.fulfilled]: (state, action) => {
			state.status = 'succeeded';
			// Add any fetched posts to the array
			state.foods = state.foods.concat(action.payload);
		},
		[fetchFoods.rejected]: (state, action) => {
			state.status = 'failed';
			state.error = action.error.message;
		}
	}
});

export default foodSlice.reducer;
