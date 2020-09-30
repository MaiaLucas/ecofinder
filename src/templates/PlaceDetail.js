import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import API from "../API";
import { userInfo } from "../auth/Validations";
import Loading from "./Loading";

export default (props) => {
  const {
    location: { objPlace },
    match: { params },
  } = props;

  const [place, setPlace] = useState();
  const [user, setUser] = useState(userInfo());
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setUser(userInfo());
    setPlace();
    return () => {};
  }, [objPlace]);
  if (!place) {
    useEffect(() => {
      const setDefaultsValues = () => {
        fetch(`${API}/place/${params.id}`, {
          method: "GET",
          headers: {
            "Content-type": "application/json;charset=UTF-8",
            authorization: `bearer ${user.token}`,
            mode: "cors",
          },
        })
          .then((res) => res.json())
          .then(
            (result) => {
              console.log("result", result);
              setIsLoaded(true);
              // setPlace(result);
            },
            (error) => {
              // setIsLoaded(true);
            }
          );
      };
      setDefaultsValues();
      return () => {};
    }, [params.id, user.token]);
  }

  if (isLoaded) {
    console.log(place);
    return (
      <div className="Menu">
        <div className="container">
          <div className="Detail">
            <h1>Lucas</h1>
          </div>
        </div>
      </div>
    );
  } else if (!isLoaded) {
    return <Loading />;
  } else {
    return <Redirect to={"/"} />;
  }
};
