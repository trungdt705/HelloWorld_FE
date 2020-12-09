import React from "react";
import "./App.css";
import { FilmList } from "./features/food/FoodList";
import AppBar from "./components/AppBar";

function App() {
	return (
		<div className="App">
			<AppBar />
			<FilmList />
		</div>
	);
}

export default App;
