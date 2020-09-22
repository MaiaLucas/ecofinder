import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import Card from "../templates/Card";
import API from "../API";

export default (props) => {
  const {
    location: { headline, subheadline, pathname },
    match: { params },
  } = props;

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch(API + pathname)
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, [params.id, pathname]);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return (
      <div className="container d-flex justify-content-center p-4">
        <div className="spinner-border text-success" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  } else if (headline !== undefined) {
    return (
      <div>
        <div className="container mb-4">
          <h1>{headline}</h1>
          <h6>{subheadline}</h6>
        </div>

        <div className="row col-sm-12">
          {items.map((place) => {
            const config = { ...place };
            return (
              <div className="col-sm-4" key={place.id}>
                <Card config={config} />
              </div>
            );
          })}
        </div>
      </div>
    );
  } else {
    return <Redirect to={"/"} />;
  }
};
