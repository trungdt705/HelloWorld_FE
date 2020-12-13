import { createSlice } from "@reduxjs/toolkit";

export const selectBotNavIcon = (state) => state.botnav.icon;

const botNavSlice = createSlice({
	name: "botnav",
	initialState: {
		icon: "/",
	},
	reducers: {
		setIcon: (state, action) => {
			state.icon = action.payload;
		},
	},
});

export const { setIcon } = botNavSlice.actions;

export default botNavSlice.reducer;
