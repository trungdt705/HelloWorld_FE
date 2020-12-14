import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { get, getById } from "../../utils/client";

export const selectAllCategory = (state) => state.category.categories;

export const selectCategoryById = (state) => state.category.category;

export const fetchCategories = createAsyncThunk(
	"films/fetchCategories",
	async () => {
		try {
			const response = await get("categories/");
			return response;
		} catch (error) {
			throw error;
		}
	}
);

export const getCategoryById = createAsyncThunk(
	"films/getCategoryById",
	async (id) => {
		try {
			const response = await getById("categories", id);
			return response;
		} catch (error) {
			throw error;
		}
	}
);

const categorySlice = createSlice({
	name: "category",
	initialState: {
		categories: [],
		category: null,
		statusAll: "idle",
		statusOne: "idle",
		error: null,
	},
	reducers: {},
	extraReducers: {
		[fetchCategories.pending]: (state, action) => {
			state.status = "loading";
		},
		[fetchCategories.fulfilled]: (state, action) => {
			state.statusAll = "succeeded";
			// Add any fetched posts to the array
			state.categories = action.payload;
		},
		[fetchCategories.rejected]: (state, action) => {
			state.statusAll = "failed";
			state.error = action.error.message;
		},
		[getCategoryById.pending]: (state, action) => {
			state.statusOne = "loading";
		},
		[getCategoryById.fulfilled]: (state, action) => {
			state.statusOne = "succeeded";
			// Add any fetched posts to the array
			state.category = action.payload;
		},
		[getCategoryById.rejected]: (state, action) => {
			state.statusOne = "failed";
			state.error = action.error.message;
		},
	},
});

export default categorySlice.reducer;
