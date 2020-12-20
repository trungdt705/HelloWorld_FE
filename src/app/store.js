import { configureStore } from "@reduxjs/toolkit";
// import foodReducer from "../features/food/foodSlice";
// import filmReducer from "../features/films/filmSlice";
// import backDropReducer from "../features/backdrop/backDropSlice";
// import botNavReducer from "../features/botnav/botNavSlice";
// import eventReducer from "../features/events/eventSlice";
// import categoryReducer from "../features/categories/categorySlice";
import rootReducer from "../features/rootReducer";

export default configureStore({
	reducer: rootReducer,
});
