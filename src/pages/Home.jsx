import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";
import { FiArrowRight } from "react-icons/fi";
import "../styles/pages/home.css";

export default () => {
  return (
    <div id="page-landing">
      <div className="content-wrapper">
        <img src={logo} alt="" />
        <main>
          <h1>Por um mundo mais sustentável</h1>
          <p>Venha experimentar novas emoções de forma sustentável</p>
        </main>

        <div className="location">
          <strong>Fortaleza</strong>
          <span>Ceará</span>
        </div>

        <Link to="/app" className="enter-app">
          <FiArrowRight size={26} color="rgba(0,0,0,0.6)" />
        </Link>
      </div>
    </div>
  );
};
