import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { get } from "../../utils/client";

export const selectAllFood = (state) => state.food.foods;

export const selectFoodById = (state) => state.food.foodOne;

export const fetchFoods = createAsyncThunk("films/fetchFoods", async () => {
	try {
		const response = await get("foods/");
		return response;
	} catch (error) {
		throw error;
	}
});

export const getFoodById = createAsyncThunk("films/getFoodById", async (id) => {
	try {
		const response = await get(`foods/${id}/`);
		return response;
	} catch (error) {
		throw error;
	}
});

const foodSlice = createSlice({
	name: "food",
	initialState: {
		foods: [],
		foodOne: null,
		statusAll: "idle",
		statusOne: "idle",
		error: null,
	},
	reducers: {},
	extraReducers: {
		[fetchFoods.pending]: (state, action) => {
			state.status = "loading";
		},
		[fetchFoods.fulfilled]: (state, action) => {
			state.statusAll = "succeeded";
			// Add any fetched posts to the array
			state.foods = action.payload;
		},
		[fetchFoods.rejected]: (state, action) => {
			state.statusAll = "failed";
			state.error = action.error.message;
		},
		[getFoodById.pending]: (state, action) => {
			state.statusOne = "loading";
		},
		[getFoodById.fulfilled]: (state, action) => {
			state.statusOne = "succeeded";
			// Add any fetched posts to the array
			state.foodOne = action.payload;
		},
		[getFoodById.rejected]: (state, action) => {
			state.statusOne = "failed";
			state.error = action.error.message;
		},
	},
});

export default foodSlice.reducer;
