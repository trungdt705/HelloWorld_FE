import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	accessToken: `Bearer ${localStorage.getItem('access_token')}`,
	refreshToken: localStorage.getItem('refresh_token'),
	isNew: false
};
const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setAccessToken: (state, action) => {
			localStorage.setItem('access_token', action.payload);
			state.accessToken = `Bearer ${action.payload}`;
		},
		setRefreshToken: (state, action) => {
			state.refreshToken = action.payload;
		},
		setIsNew: (state, action) => {
			state.isNew = action.payload;
		}
	}
});

export const { setAccessToken, setRefreshToken, setIsNew } = authSlice.actions;

export default authSlice.reducer;
