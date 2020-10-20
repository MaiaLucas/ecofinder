import React, { useEffect, useState, useCallback } from "react";
import { Redirect } from "react-router-dom";
import API from "../API";
import AuthService from "../services/auth.service";
import FormPlaces from "../templates/FormPlaces";

let auxWorkingDays = ["seg", "ter", "qua", "qui", "sex", "sab", "dom"];
export default (props) => {
  const {
    match: { params },
  } = props;

  const initObjTarget = {
    title: "",
    description: "",
    type: "",
    state: "",
    city: "",
    address: "",
    phone: "",
    hr_init: "",
    hr_final: "",
    author: "",
    opening_days: "",
  };

  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState({
    class: "alert-danger error hide",
    msg: "Não foi possível salvar o local",
  });
  const [objCadastro, setObjCadastro] = useState(initObjTarget);
  const [user, setUser] = useState();

  useEffect(() => {
    let currentUser = AuthService.getCurrentUser();
    if (currentUser) {
      setUser({
        userId: currentUser.id,
        token: currentUser.token,
      });
    }
    setIsLoaded(true);
    return () => {};
  }, []);

  if (params.id) {
    useEffect(() => {
      let currentUser = AuthService.getCurrentUser();
      const setDefaultsValues = () => {
        fetch(`${API}/place/${params.id}`, {
          method: "GET",
          headers: {
            "Content-type": "application/json;charset=UTF-8",
            authorization: `bearer ${currentUser.token}`,
            mode: "cors",
          },
        })
          .then((res) => res.json())
          .then(
            (result) => {
              setIsLoaded(true);
              setObjCadastro({ ...result });
            },
            (error) => {
              setIsLoaded(true);
              setError(error);
            }
          );
      };
      setDefaultsValues();
      return () => {};
    }, [params.id]);
  }

  const handleCheckboxChange = useCallback(
    (e, index) => {
      const form = { ...objCadastro };
      auxWorkingDays = auxWorkingDays.map((dia, i) => {
        return form["opening_days"].indexOf(dia) !== -1 ? dia : null;
      });

      const { checked, value } = e.target;

      if (checked) {
        auxWorkingDays[index] = value;
      } else {
        auxWorkingDays[index] = null;
      }

      form["opening_days"] = auxWorkingDays.join(",");

      setObjCadastro(form);
    },
    [objCadastro]
  );

  const onSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const form = { ...objCadastro };
    form["opening_days"] = form["opening_days"]
      .split(",")
      .filter(function (str) {
        return /\S/.test(str);
      })
      .join(",");

    form["author"] = user.userId;

    setObjCadastro(form);

    fetch(`${API}/place${params.id ? "/" + params.id : ""}`, {
      method: params.id ? "PUT" : "POST",
      headers: {
        "Content-type": "application/json;charset=UTF-8",
        authorization: `bearer ${user.token}`,
        // mode: "cors",
      },
      body: JSON.stringify(form),
    })
      .then((res) => res.json())
      .then((res) => {
        let message = {
          class: "alert-danger error show",
          msg: res.message,
        };

        if (res.code === 200) {
          message["class"] = "alert-success success show";
        }

        setMessage(message);

        setTimeout(() => {
          setMessage({
            class: "hide",
            msg: "",
          });
        }, 2000);
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    const form = { ...objCadastro };
    form[name] = value;

    setObjCadastro(form);
  };

  if (error) {
    return <div className="Menu">Error: {error.message}</div>;
  } else if (!isLoaded) {
    return (
      <div className="Menu">
        <div className="container d-flex justify-content-center p-4">
          <div className="spinner-border text-success" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      </div>
    );
  } else if (isLoaded) {
    return (
      <FormPlaces
        submit={onSubmit}
        inputChange={handleInputChange}
        checkboxChange={handleCheckboxChange}
        target={objCadastro}
        message={message}
      />
    );
  } else {
    return <Redirect to={"/"} />;
  }
};
