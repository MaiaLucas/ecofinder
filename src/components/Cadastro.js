import React, { useEffect, useState, useCallback } from "react";
import { Redirect } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faTrash } from "@fortawesome/free-solid-svg-icons";
import API from "../API";
import Input from "../templates/Input";

const Option = (props) => {
  props.listTypes.map((cat, i) => (
    // <Option
    //   value={cat.id}
    //   key={i}
    //   select={objCadastro.type === cat.id ? "selected" : ""}
    //   name={cat.name}
    // />
    <option
      value={cat.id}
      key={i}
      selected={props.type === cat.id ? "selected" : ""}
    >
      {cat.name}
    </option>
  ));
  // return (
  //   <option value={props.value} id={props.value} selected={props.select}>
  //     {props.name}
  //   </option>
  // );
};

export default (props) => {
  const {
    match: { params },
  } = props;

  const funcionamento = [
    { id: 1, dia: "seg", check: true },
    { id: 2, dia: "ter", check: true },
    { id: 3, dia: "qua", check: true },
    { id: 4, dia: "qui", check: true },
    { id: 5, dia: "sex", check: true },
    { id: 6, dia: "sab", check: true },
    { id: 7, dia: "dom", check: true },
  ];
  const listTypes = [
    { id: 1, name: "Postos de Coleta" },
    { id: 2, name: "Experiências" },
    { id: 3, name: "Lojas" },
  ];

  const [daysOpening, setDaysOpening] = useState(funcionamento);
  const [isLoaded, setIsLoaded] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState({
    class: "alert-danger error hide",
    msg: "Não foi possível salvar o local",
  });
  const [objCadastro, setObjCadastro] = useState({});

  if (params.id) {
    useEffect(() => {
      fetch(`${API}/place/${params.id}`, {
        method: "GET",
        headers: {
          "Content-type": "application/json;charset=UTF-8",
          authorization: `bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6ImNiNmY5ODYyLWM3MWMtNGFkZi1iMTkwLWRmYWQ2ZjE3ZGZmNSIsInVzZXJuYW1lIjoiUnViZW5zIiwiZW1haWwiOiJydWJlbnNAZW1haWwuY29tIiwiaWF0IjoxNjAxMzEwMDEwLCJleHAiOjE2MDEzOTY0MTB9.5uH86r5t6leD7hQ_RP7fvHzsK0jqioicS7lkTTK_lg4`,
          // mode: "cors",
        },
      })
        .then((res) => res.json())
        .then(
          (result) => {
            setObjCadastro({
              title: result.title,
              description: result.description,
              type: result.type,
              state: result.state,
              city: result.city,
              address: result.address,
              phone: result.phone,
              hr_init: result.hr_init,
              hr_final: result.hr_final,
              author: result.author,
              opening_days: result.opening_days,
            });

            setIsLoaded(true);
          },
          (error) => {
            setIsLoaded(true);
            setError(error);
          }
        );

      return () => {};
    }, [daysOpening, objCadastro.opening_days, params.id]);
  }

  const handleChange = useCallback(
    (e, index) => {
      const days = [...daysOpening];
      days[index]["check"] = days[index]["check"] ? false : true;

      setDaysOpening(days);
    },
    [daysOpening]
  );

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      const arrOpen = daysOpening.filter((day) => day.check);
      let workingDays = "";
      if (arrOpen.length < 7) {
        workingDays = arrOpen.map((dia) => dia.dia).join(",");
      } else {
        workingDays = "todos os dias";
      }

      const form = { ...objCadastro };
      form["author"] = "cb6f9862-c71c-4adf-b190-dfad6f17dff5";
      form["opening_days"] = workingDays;

      setObjCadastro(form);

      fetch(`${API}/place${params.id ? "/" + params.id : ""}`, {
        method: params.id ? "PUT" : "POST",
        headers: {
          "Content-type": "application/json;charset=UTF-8",
          authorization: `bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6ImNiNmY5ODYyLWM3MWMtNGFkZi1iMTkwLWRmYWQ2ZjE3ZGZmNSIsInVzZXJuYW1lIjoiUnViZW5zIiwiZW1haWwiOiJydWJlbnNAZW1haWwuY29tIiwiaWF0IjoxNjAxMzEwMDEwLCJleHAiOjE2MDEzOTY0MTB9.5uH86r5t6leD7hQ_RP7fvHzsK0jqioicS7lkTTK_lg4`,
          // mode: "cors",
        },
        body: JSON.stringify(form),
      }).then((res) => {
        let message = {
          class: "alert-danger error show",
          msg: "Não foi possível salvar o local",
        };

        if (res.status === 200) {
          message = {
            class: "alert-success success show",
            msg: "Local salvo com sucesso!",
          };
        }

        setMessage(message);

        setTimeout(() => {
          setMessage({
            class: "hide",
            msg: "",
          });
        }, 2000);
      });

      return false;
    },
    [daysOpening, objCadastro, params.id]
  );

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
      <div className="Menu d-flex flex-column justify-content-start align-items-center">
        <h1 className="col-12 title">{params.id ? "Edição" : "Cadastro"}</h1>
        <form onSubmit={(e) => onSubmit(e)}>
          <div className="card">
            <div className="card-body">
              <div className="form-group d-flex">
                <div className="col-4">
                  <label htmlFor="categorias">Categorias *</label>
                  <select
                    className="form-control"
                    id="categorias"
                    name="type"
                    required
                    onChange={(e) => handleInputChange(e)}
                  >
                    <option value="">Categorias </option>
                    {/* <Option listTypes={listTypes} type={objCadastro.type} /> */}
                  </select>
                </div>
                <Input
                  type="text"
                  classGroup="col-8"
                  title="Titulo *"
                  classInput="form-control"
                  id="title"
                  name="title"
                  required={true}
                  placeholder="Digite aqui o título que deseja"
                  value={objCadastro.title}
                  func={handleInputChange}
                />
              </div>

              <div className="form-group d-flex">
                <Input
                  type="text"
                  classGroup="col-2"
                  title="Estado *"
                  classInput="form-control"
                  id="state"
                  name="state"
                  required={true}
                  placeholder="CE"
                  value={objCadastro.state}
                  func={handleInputChange}
                />
                <Input
                  type="text"
                  classGroup="col-2"
                  title="Cidade *"
                  classInput="form-control"
                  id="city"
                  name="city"
                  required={true}
                  placeholder="Fortaleza"
                  value={objCadastro.city}
                  func={handleInputChange}
                />
                <Input
                  type="text"
                  classGroup="col-8"
                  title="Endereço *"
                  classInput="form-control"
                  id="address"
                  name="address"
                  required={true}
                  placeholder="Rua dos Bobos, 0 - Castelão"
                  value={objCadastro.address}
                  func={handleInputChange}
                />
              </div>

              <div className="form-group col-12">
                <label htmlFor="descricao">Descrição</label>
                <textarea
                  className="form-control"
                  id="descricao"
                  name="description"
                  defaultValue={objCadastro.description}
                  onKeyUp={(e) => handleInputChange(e)}
                  placeholder="Conte-nos um pouco mais sobre o que está cadastrando"
                  rows="3"
                ></textarea>
              </div>

              <div className="form-group d-flex">
                <Input
                  type="time"
                  classGroup="col-3"
                  title="Abre às *"
                  classInput="form-control"
                  id="hr_init"
                  name="hr_init"
                  required={true}
                  placeholder=""
                  value={objCadastro.hr_init}
                  func={handleInputChange}
                />
                <Input
                  type="time"
                  classGroup="col-3"
                  title="Fecha às *"
                  classInput="form-control"
                  id="hr_final"
                  name="hr_final"
                  required={true}
                  placeholder=""
                  value={objCadastro.hr_final}
                  func={handleInputChange}
                />
                <Input
                  type="phone"
                  classGroup="col-6"
                  title="Telefone para contato *"
                  classInput="form-control"
                  id="phone"
                  name="phone"
                  required={true}
                  placeholder="+55 (99) 99999-9999"
                  value={objCadastro.phone}
                  func={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="funcionamento">Dias de Funcionamento</label>
                <div className="ml-4 form-check form-check-inline">
                  {daysOpening.map((dia, i) => {
                    let check = dia.check;

                    if (objCadastro.opening_days)
                      check =
                        objCadastro.opening_days.indexOf(dia.dia) !== -1
                          ? dia.check
                          : false;
                    return (
                      <div className="mx-1" key={i}>
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id={dia.dia}
                          value="dia"
                          // checked={dia.check}
                          checked={check}
                          onChange={(e) => handleChange(e, i)}
                        />
                        <label className="form-check-label" htmlFor={dia.dia}>
                          {dia.dia}
                        </label>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="d-flex justify-content-between align-items-end">
                <button type="submit" className="btn-save w-25">
                  Salvar
                </button>

                <div className={`alert alert-save ${message.class} m-0`}>
                  {message.msg}
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  } else {
    return <Redirect to={"/"} />;
  }
};
