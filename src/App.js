import React from "react";
import { Route, BrowserRouter as Router } from "react-router-dom";
import Header from "./templates/Header";
import Menu from "./templates/Menu";
import Places from "./templates/Places";
import Local from "./components/Local";

import "./App.css";

function App() {
  return (
    <Router>
      <Header />
      <Route path="/" exact component={Menu} />
      <Route path="/place" exact component={Places} />
      <Route path="/place/:id" component={Local} />
    </Router>
  );
}

export default App;
