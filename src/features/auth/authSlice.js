import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	accessToken: `Bearer ${localStorage.getItem('access_token')}`,
	refreshToken: localStorage.getItem('refresh_token'),
	isNew: false,
	refreshStatus: 'idle'
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
			localStorage.setItem('refresh_token', action.payload);
			state.refreshToken = action.payload;
		},
		logOut: (state, action) => {
			localStorage.removeItem('access_token');
			localStorage.removeItem('refresh_token');
			state.refreshToken = '';
			state.accessToken = '';
		},
		setStatus: (state, action) => {
			state.refreshStatus = action.payload;
		},
		setIsNew: (state, action) => {
			state.isNew = action.payload;
		}
	}
});

export const {
	setAccessToken,
	setRefreshToken,
	setIsNew,
	setStatus,
	logOut
} = authSlice.actions;

export default authSlice.reducer;
