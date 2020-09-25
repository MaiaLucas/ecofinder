import React from "react";
import logo from "../assets/img/ecofinder_logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faHeart } from "@fortawesome/free-solid-svg-icons";

export default function Header() {
  return (
    <div className="Header align-items-center justify-content-between">
      <ul className="nav d-flex align-items-center justify-content-between px-3">
        <li className="nav-item">
          <a className="nav-link active" href="/">
            <img
              src={logo}
              alt="grundschrift-font"
              border="0"
              className="Logo"
            />
          </a>
        </li>
        <li className="nav-item">
          <div className="dropdown dropleft">
            <button
              className="btn btn-sm Login"
              type="button"
              id="dropdownMenuButton"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <FontAwesomeIcon icon={faUser} />
              <FontAwesomeIcon icon={faHeart} />
            </button>
            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <a className="dropdown-item" href="/login">
                Login
              </a>
            </div>
          </div>
          {/* <a
            className="nav-link Login"
            href="/"
            tabIndex="-1"
            aria-disabled="true"
          >
            <FontAwesomeIcon icon={faUser} />
          </a> */}
        </li>
      </ul>
    </div>
  );
}
