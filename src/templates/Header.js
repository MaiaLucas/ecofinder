import React, { useEffect, useState } from "react";
import logo from "../assets/img/ecofinder_logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faHeart } from "@fortawesome/free-solid-svg-icons";
import { userInfo, userHasLogged } from "../auth/Validations";

export default () => {
  // console.log((userInfo())
  const [user, setUser] = useState({});
  const [hasUser, setHasUser] = useState(false);

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
        <li className="nav-item d-flex justify-content-center align-items-center">
          <div className="mx-4 username">
            <h5>{hasUser ? `Olá, ${user.username}` : ""}</h5>
          </div>
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
              {hasUser ? (
                <a className="dropdown-item" href="/register">
                  Cadastrar Local
                </a>
              ) : (
                ""
              )}
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
};
