import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import foodReducer from '../features/food/foodSlice';

export default configureStore({
	reducer: {
		counter: counterReducer,
		food: foodReducer
	}
});
