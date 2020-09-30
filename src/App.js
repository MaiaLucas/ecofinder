import React from "react";
import { Route, BrowserRouter as Router } from "react-router-dom";
import Header from "./templates/Header";
import Menu from "./templates/Menu";
import Local from "./components/Local";

import "./App.css";
import Footer from "./templates/Footer";
import RegisterPlace from "./components/RegisterPlace";
import PlaceDetail from "./templates/PlaceDetail";

function App() {
  return (
    <Router>
      <Header />
      <Route path="/" exact component={Menu} />
      <Route path="/register" exact component={RegisterPlace} />
      <Route path="/edit/:id" exact component={RegisterPlace} />
      <Route path={"/place/:id?/:place?"} component={Local} />
      <Route path={"/detail/:id"} component={PlaceDetail} />
      <Footer />
    </Router>
  );
}

export default App;
