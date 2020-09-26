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
    { id: 1, dia: "seg", check: false },
    { id: 2, dia: "ter", check: false },
    { id: 3, dia: "qua", check: false },
    { id: 4, dia: "qui", check: false },
    { id: 5, dia: "sex", check: false },
    { id: 6, dia: "sab", check: false },
    { id: 7, dia: "sdom", check: false },
  ];

  const [listTypes, setListTypes] = useState([]);
  const [daysOpening, setDaysOpening] = useState(funcionamento);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);
  const [objCadastro, setObjCadastro] = useState({});

  // useEffect(() => {
  //   return () => {};
  // }, []);

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

  const onSubmit = (e) => {
    const arrOpen = daysOpening.filter((day) => !day.check);
    let workingDays = "";
    if (arrOpen.length) {
      workingDays = arrOpen.join(",");
    } else {
      workingDays = "todos os dias";
    }

    const form = { ...objCadastro };
    form["opening_days"] = workingDays;

    setObjCadastro(form);

    console.log(objCadastro);
  };

  const handelInputChange = (e) => {
    const { name, value } = e.target;
    const form = { ...objCadastro };
    form[name] = value;

    setObjCadastro(form);

    console.log(objCadastro);
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
      <div className="Menu">
        <div className="container">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title">Cadastro</h3>
              <div className="form-group d-flex">
                <div className="col-4">
                  <label htmlFor="categorias">Categorias *</label>
                  <select
                    className="form-control"
                    id="categorias"
                    name="type"
                    required
                    onKeyUp={(e) => handelInputChange(e)}
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
                    required
                    onKeyUp={(e) => handelInputChange(e)}
                    placeholder="Estação de Coleta ..."
                  />
                </div>
              </div>

              {/* <p className="col-12">URL da Imagem</p>
              <div className="form-group url-group">
                {images.map((url, i) => {
                  return (
                    <div
                      className="d-flex justify-content-start align-items-start mt-2"
                      key={url.id}
                    >
                      <p>{url.id}# </p>
                      <input
                        type="text"
                        className="form-control"
                        id={`urlImage-${url.id}`}
                        onKeyUp={(e) => handleChange(e, i)}
                        placeholder="Insira aqui a url da imagem"
                        value={url.value}
                      />
                      {images.length !== 1 && (
                        <button
                          className="mx-1 btn btn-danger"
                          onClick={() => handleRemoveClick(i)}
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
              <div className="col-1 my-1">
                <input
                  onClick={handleCLick}
                  className="btn btn-success"
                  value="+"
                />
              </div> */}

              <div className="form-group d-flex">
                <div className="col-2">
                  <label htmlFor="state">Estado *</label>
                  <input
                    type="text"
                    className="form-control"
                    id="state"
                    name="state"
                    required
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
                    {funcionamento.map((dia, i) => (
                      <div className="mx-1" key={i}>
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id={dia.dia}
                          value="dia"
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

              <button
                type="submit"
                className="btn btn-primary"
                onClick={(e) => onSubmit(e)}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return <Redirect to={"/"} />;
  }
};
