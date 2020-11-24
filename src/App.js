import React from "react";
import { Route, BrowserRouter as Router } from "react-router-dom";
import Header from "./templates/Header";
import Menu from "./templates/Menu";
import Local from "./components/Local";

import "./App.css";
import Footer from "./templates/Footer";
import RegisterPlace from "./components/RegisterPlace";
import PlaceDetail from "./templates/PlaceDetail";
import Login from "./templates/Login";
import Register from "./templates/Register";
import CreatePlace from "./components/place/CreatePlace";
import EditPlace from "./components/place/EditPlace";

function App() {
	return (
		<>
			<Router>
				<Header />
				<Route path="/" exact component={Menu} />
				<Route path="/login" component={Login} />
				<Route path="/register" component={Register} />
				<Route path="/place" exact component={CreatePlace} />
				{/* <Route path="/place" exact component={RegisterPlace} /> */}
				{/* <Route path="/place/:id" exact component={RegisterPlace} /> */}
				<Route path="/place/:id" exact component={EditPlace} />
				<Route path={"/places"} component={Local} />
				<Route path={"/detail/:id"} component={PlaceDetail} />
				{/* <Footer /> */}
			</Router>
		</>
	);
}

export default App;
