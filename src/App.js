import React from "react";
import { Route, BrowserRouter as Router } from "react-router-dom";
import Header from "./templates/Header";
import Menu from "./templates/Menu";
import Local from "./components/Local";

import "./App.css";

function App() {
  return (
    <Router>
      <Header />
      <Route path="/" exact component={Menu} />
      <Route
        // path={encodeURIComponent("/place/:id?/:place?")}
        path={"/place/:id?/:place?"}
        component={Local}
      />
    </Router>
  );
}

export default App;
