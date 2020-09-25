import React from "react";
import { Route, BrowserRouter as Router } from "react-router-dom";
import Header from "./templates/Header";
import Menu from "./templates/Menu";
import Local from "./components/Local";

import "./App.css";
import Footer from "./templates/Footer";
import Cadastro from "./components/Cadastro";

function App() {
  return (
    <Router>
      <Header />
      <Route path="/" exact component={Menu} />
      <Route path="/cadastro" exact component={Cadastro} />
      <Route
        // path={encodeURIComponent("/place/:id?/:place?")}
        path={"/place/:id?/:place?"}
        component={Local}
      />
      <Footer />
    </Router>
  );
}

export default App;
