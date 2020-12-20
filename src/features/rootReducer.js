import { combineReducers } from "redux";
// import { DESTROY_SESSION } from "../actions/types";
import foodReducer from "../features/food/foodSlice";
import filmReducer from "../features/films/filmSlice";
import backDropReducer from "../features/backdrop/backDropSlice";
import botNavReducer from "../features/botnav/botNavSlice";
import eventReducer from "../features/events/eventSlice";
import categoryReducer from "../features/categories/categorySlice";

// Combine all reducers.
const appReducer = combineReducers({
	food: foodReducer,
	film: filmReducer,
	backdrop: backDropReducer,
	botnav: botNavReducer,
	event: eventReducer,
	category: categoryReducer,
});

const rootReducer = (state, action) => {
	// Clear all data in redux store to initial.
	if (action.type === "destroy_session") {
		state = undefined;
	}

	return appReducer(state, action);
};
export default rootReducer;
