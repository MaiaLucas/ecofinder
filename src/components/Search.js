import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export default (props) => {
  const [type, setType] = useState("");
  const [place, setPlace] = useState("");
  const [title, setTitle] = useState("Categorias");
  const [subheadline, setSubheadline] = useState("");

  const changePlace = (title, id, subheadline) => {
    setType(id);
    setTitle(title);
    setSubheadline(subheadline);
  };

  const handleInputChange = (e) => {
    setPlace(e.target.value);
  };

  return (
    <form className="Search input-group d-flex justify-content-end">
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
            onClick={() =>
              changePlace(
                "Postos de Coleta",
                1,
                "Encontre o posto de coleta perfeito para o seu lixo"
              )
            }
          >
            Postos de Coleta
          </div>
          <div role="separator" className="dropdown-divider"></div>
          <div
            className="dropdown-item"
            onClick={() =>
              changePlace(
                "Experiências",
                2,
                "Aproveite para dar aquela relaxada com as melhores Ecoaventuras da sua região"
              )
            }
          >
            Experiências
          </div>
          <div role="separator" className="dropdown-divider"></div>
          <div
            className="dropdown-item"
            onClick={() =>
              changePlace(
                "Lojas",
                3,
                "Aproveite para fazer aquelas Ecocomprinhas"
              )
            }
          >
            Lojas
          </div>
        </div>
      </div>
      <input
        type="search"
        className="form-control"
        placeholder="Digite a cidade que deseja buscar"
        onChange={handleInputChange}
      />
      <Link
        className="btn-search d-flex align-items-center"
        to={{
          pathname: `/place${type !== "" ? `/${type}/list` : ""}${
            place !== "" ? "/" + place : ""
          }`,
          headline: title === "Categorias" ? "Pesquisa" : title,
          subheadline: subheadline,
        }}
      >
        <FontAwesomeIcon icon={faSearch} />
      </Link>
    </form>
  );
};
