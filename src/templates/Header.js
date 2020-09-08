import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

export default function Header() {
  return (
    <div className="Header">
      <ul className="nav align-items-center justify-content-between px-3">
        <li className="nav-item">
          <a className="nav-link active" href="/">
            <img
              src="https://fontmeme.com/permalink/200908/01db273d3f8c7a46dde984efc4512485.png"
              alt="grundschrift-font"
              border="0"
              className="Logo"
            ></img>
          </a>
        </li>
        <li className="nav-item">
          <a
            className="nav-link Login"
            href="/"
            tabIndex="-1"
            aria-disabled="true"
          >
            <FontAwesomeIcon icon={faUser} />
          </a>
        </li>
      </ul>
    </div>
  );
}
