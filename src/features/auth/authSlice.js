import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	accessToken: `Bearer ${localStorage.getItem('access_token')}`,
	refreshToken: localStorage.getItem('refresh_token')
};
const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setAccessToken: (state, action) => {
			console.log('setAccessToken');
			state.accessToken = action.payload;
		},
		setRefreshToken: (state, action) => {
			state.refreshToken = action.payload;
		}
	}
});

export const { setAccessToken, setRefreshToken } = authSlice.actions;

export default authSlice.reducer;
