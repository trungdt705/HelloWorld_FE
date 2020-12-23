import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getCurrentUser, isAuthenticate } from '../../utils/auth';

export const fetchUserDetail = createAsyncThunk(
	'users/fetchUserDetail',
	async (token) => {
		try {
			const response = await getCurrentUser(token);
			return response;
		} catch (error) {
			throw error;
		}
	}
);

const userSlice = createSlice({
	name: 'user',
	initialState: {
		currentUser: null,
		status: 'idle',
		error: null
	},
	reducers: {},
	extraReducers: {
		[fetchUserDetail.pending]: (state, action) => {
			state.status = 'loading';
		},
		[fetchUserDetail.fulfilled]: (state, action) => {
			state.status = 'succeeded';
			// Add any fetched posts to the array
			state.currentUser = action.payload;
		},
		[fetchUserDetail.rejected]: (state, action) => {
			state.status = 'failed';
			state.error = action.error.message;
		}
	}
});
export default userSlice.reducer;
