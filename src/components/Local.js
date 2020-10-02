import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import Card from "../templates/Card";
import API from "../API";
import Loading from "../templates/Loading";

export default (props) => {
  const {
    location: { pathname, id, place },
    match: { params },
  } = props;

  const placeId = params.id === "list" ? id : params.id;
  const placeString = place !== undefined ? place : "";

  const pageInfo = [
    {
      headline: placeString.toUpperCase(),
      subheadline:
        "Aqui você encontrará tudo que precisa em " + placeString.toUpperCase(),
    },
    {
      headline: "Ache Pontos de Coleta",
      subheadline: "Encontre o posto de coleta perfeito para o seu lixo",
    },
    {
      headline: "Encontre as Melhores Experiências",
      subheadline:
        "Aproveite para dar aquela relaxada com as melhores Ecoaventuras da sua região",
    },
    {
      headline: "Compras Online",
      subheadline: "Aproveite para fazer aquelas Ecocomprinhas",
    },
  ];
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [items, setItems] = useState([]);
  useEffect(() => {
    fetch(`${API}${pathname}`)
      .then((res) => res.json())
      .then(
        (result) => {
          if (result.length && (placeId || placeString)) {
            setIsLoaded(true);
            setItems(result);
          } else {
            setRedirect(true);
          }
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, [pathname, placeId, placeString]);

  if (error) {
    return <div className="Menu">Error: {error.message}</div>;
  } else if (!isLoaded && !redirect) {
    return <Loading />;
  } else if (isLoaded) {
    return (
      <div className="Menu">
        <div className="local-highlights d-flex justify-content-center mb-4">
          <div className="d-flex flex-column justify-content-center align-items-center">
            <h1>{pageInfo[placeId].headline}</h1>
            <h6>{pageInfo[placeId].subheadline}</h6>
          </div>
        </div>

        <div className="view-cards">
          <div className="d-flex justify-content-center flex-wrap">
            {items.map((place) => {
              const config = { ...place };
              return (
                <div key={place.id}>
                  <Card config={config} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  } else {
    return <Redirect to={"/"} />;
  }
};
