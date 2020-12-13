import { createSlice } from "@reduxjs/toolkit";

export const selectBackDropStatus = (state) => state.backdrop.open;

const backDropSlice = createSlice({
	name: "backdrop",
	initialState: {
		open: false,
	},
	reducers: {
		show: (state) => {
			state.open = true;
		},
		hide: (state) => {
			state.open = false;
		},
	},
});

export const { show, hide } = backDropSlice.actions;

export default backDropSlice.reducer;
