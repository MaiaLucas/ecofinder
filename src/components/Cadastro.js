import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faTrash } from "@fortawesome/free-solid-svg-icons";
import API from "../API";

export default (props) => {
  // const {
  //   match: { params },
  // } = props;
  const funcionamento = [
    { id: 1, dia: "seg", check: true },
    { id: 2, dia: "ter", check: true },
    { id: 3, dia: "qua", check: true },
    { id: 4, dia: "qui", check: true },
    { id: 5, dia: "sex", check: true },
    { id: 6, dia: "sab", check: true },
    { id: 7, dia: "dom", check: true },
  ];

  const [listTypes, setListTypes] = useState([]);
  const [daysOpening, setDaysOpening] = useState(funcionamento);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);
  const [objCadastro, setObjCadastro] = useState({});

  useEffect(() => {
    return () => {};
  }, []);

  useEffect(() => {
    fetch(`${API}/type`)
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setListTypes(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);

  const handleChange = (e, index) => {
    const days = [...daysOpening];
    days[index]["check"] = days[index]["check"] ? false : true;

    setDaysOpening(days);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log(daysOpening);
    const arrOpen = daysOpening.filter((day) => day.check);
    let workingDays = "";
    console.log(arrOpen);
    if (arrOpen.length < 7) {
      workingDays = arrOpen.map((dia) => dia.dia).join(",");
    } else {
      workingDays = "todos os dias";
    }

    const form = { ...objCadastro };
    form["author"] = "d7926dc0-ed58-41a9-9279-cf921bd9e5ab";
    form["opening_days"] = workingDays;

    setObjCadastro(form);

    console.log(JSON.stringify(form));

    fetch(`${API}/place`, {
      method: "POST",
      headers: {
        "Content-type": "application/json;charset=UTF-8",
        authorization: `bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6ImQ3OTI2ZGMwLWVkNTgtNDFhOS05Mjc5LWNmOTIxYmQ5ZTVhYiIsInVzZXJuYW1lIjoiUnViZW5zIiwiZW1haWwiOiJydWJlbnNAZW1haWwuY29tIiwiaWF0IjoxNjAxMjE5ODkyLCJleHAiOjE2MDEzMDYyOTJ9.gnUO8ALxoaZFmxPcckHdAcjNkloLkRrRLpzSn1NxVNM`,
        mode: "cors",
        cache: "default",
      },
      body: JSON.stringify(form),
    })
      .then((res) => res)
      .then(
        (result) => {
          console.log(result);
          return false;
        },
        (error) => {
          console.log(JSON.parse(error));
        }
      );

    return false;
  };

  const handelInputChange = (e) => {
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
        <h1 className="col-12 title">Cadastro</h1>
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
                    // required
                    onChange={(e) => handelInputChange(e)}
                  >
                    <option value="-1">Categorias </option>
                    {listTypes.map((cat) => (
                      <option value={cat.id} key={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-8">
                  <label htmlFor="title">Título *</label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    name="title"
                    // required
                    onKeyUp={(e) => handelInputChange(e)}
                    placeholder="Estação de Coleta ..."
                  />
                </div>
              </div>

              <div className="form-group d-flex">
                <div className="col-2">
                  <label htmlFor="state">Estado *</label>
                  <input
                    type="text"
                    className="form-control"
                    id="state"
                    name="state"
                    // required
                    onKeyUp={(e) => handelInputChange(e)}
                    placeholder="CE"
                  />
                </div>
                <div className="col-2">
                  <label htmlFor="cidade">Cidade *</label>
                  <input
                    type="text"
                    className="form-control"
                    id="cidade"
                    name="city"
                    // required
                    onKeyUp={(e) => handelInputChange(e)}
                    placeholder="Fortaleza"
                  />
                </div>
                <div className="col-8">
                  <label htmlFor="endereco">Endereço *</label>
                  <input
                    type="text"
                    className="form-control"
                    id="endereco"
                    name="address"
                    // required
                    onKeyUp={(e) => handelInputChange(e)}
                    placeholder="Rua dos Bobos, 0, Bairro"
                  />
                </div>
              </div>

              <div className="form-group col-12">
                <label htmlFor="descricao">Descrição</label>
                <textarea
                  className="form-control"
                  id="descricao"
                  name="description"
                  onKeyUp={(e) => handelInputChange(e)}
                  rows="3"
                ></textarea>
              </div>

              <div className="form-group d-flex">
                <div className="col-3">
                  <label htmlFor="phone">Telefone *</label>
                  <input
                    type="tel"
                    className="form-control"
                    id="phone"
                    name="phone"
                    // required
                    onKeyUp={(e) => handelInputChange(e)}
                    placeholder="(99) 99999-9999"
                  />
                </div>

                <div className="col-2">
                  <label htmlFor="hrIni">Horario inicial *</label>
                  <input
                    type="time"
                    className="form-control"
                    id="hrIni"
                    name="hr_init"
                    onChange={(e) => handelInputChange(e)}
                    placeholder="Fortaleza"
                  />
                </div>

                <div className="col-2">
                  <label htmlFor="hrFin">Horario final *</label>
                  <input
                    type="time"
                    className="form-control"
                    id="hrFin"
                    name="hr_final"
                    onChange={(e) => handelInputChange(e)}
                    placeholder="Fortaleza"
                  />
                </div>

                <div className="col-7">
                  <label htmlFor="funcionamento">Dias de Funcionamento</label>
                  <br />
                  <div className="form-check form-check-inline">
                    {daysOpening.map((dia, i) => (
                      <div className="mx-1" key={i}>
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id={dia.dia}
                          value="dia"
                          checked={dia.check}
                          onChange={(e) => handleChange(e, i)}
                        />
                        <label className="form-check-label" htmlFor={dia.dia}>
                          {dia.dia}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <button type="submit" className="btn-save w-25 mt-4">
                Salvar
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  } else {
    return <Redirect to={"/"} />;
  }
};
