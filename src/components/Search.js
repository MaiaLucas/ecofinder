import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export default (props) => {
  const [type, setType] = useState("");
  const [place, setPlace] = useState("");
  const [title, setTitle] = useState("Categorias");
  const [disabledLink, setDisabledLink] = useState("disabled-link");
  const [target, setTarget] = useState("/place");

  useEffect(() => {
    return () => {};
  }, []);

  const changePlace = (title, id) => {
    setType(id);
    setTitle(title);
    setTarget(`/place/${id}/list/${place}`);
  };

  const keyUpHandler = (e) => {
    setPlace(e.target.value);
    if (e.target.value.length) setDisabledLink("");
    else setDisabledLink("disabled-link");

    if (type !== "") setTarget(`/place/${type}/list/${place}`);
    else setTarget(`/place/list/${place}`);
  };

  return (
    <form className="Search input-group d-flex justify-content-end align-items-center">
      <div className="input-group-prepend">
        <button
          className="btn btn-outline-ligth btn-category dropdown-toggle"
          type="button"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
          required
        >
          {title}
        </button>
        <div className="dropdown-menu">
          <div
            className="dropdown-item"
            onClick={() => changePlace("Postos de Coleta", 1)}
          >
            Postos de Coleta
          </div>
          <div role="separator" className="dropdown-divider"></div>
          <div
            className="dropdown-item"
            onClick={() => changePlace("Experiências", 2)}
          >
            Experiências
          </div>
          <div role="separator" className="dropdown-divider"></div>
          <div
            className="dropdown-item"
            onClick={() => changePlace("Lojas", 3)}
          >
            Lojas
          </div>
        </div>
      </div>
      <input
        type="search"
        className="form-control mx-1"
        placeholder="Digite a cidade que deseja buscar"
        onKeyUp={keyUpHandler}
      />
      <Link
        className={`btn-search d-flex align-items-center justify-content-center ${disabledLink} mx-4`}
        to={{
          pathname: target,
          id: type ? type : 0,
          place: place,
        }}
      >
        <FontAwesomeIcon icon={faSearch} />
      </Link>
    </form>
  );
};
