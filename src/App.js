import React from "react";
import { Route, BrowserRouter as Router } from "react-router-dom";
import Home from "./pages/Home";
import Map from "./pages/Map";

import "./styles/global.css";
// import "./App.css";

function App() {
  return (
    <>
      <Router>
        <Route path="/" exact component={Home} />
        <Route path="/app" component={Map} />
      </Router>
    </>
  );
}

export default App;
