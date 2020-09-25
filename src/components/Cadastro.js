import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

export default (params) => {
  const funcionamento = ["seg", "ter", "qua", "qui", "sex", "sab", "dom"];

  useEffect(() => {
    return () => {};
  }, []);

  const [images, setImages] = useState([
    { id: 1, value: "imagem" },
    { id: 2, value: "imagem 2" },
    { id: 3, value: "imagem 3" },
  ]);

  const handleRemoveClick = (index) => {
    const list = [...images];
    list.splice(index, 1);
    // list[index].id -= 1;
    setImages(list);
  };

  const handleCLick = () => {
    let i = images[images.length - 1].id + 1;

    setImages([...images, { id: i }]);

    console.log(images);
  };

  const handleChange = (e, index) => {
    const { value } = e.target;
    const list = [...images];
    list[index]["value"] = value;
    setImages(list);
  };

  return (
    <div className="Menu">
      <div className="container">
        <div className="card">
          <div className="card-body">
            <h3 className="card-title">Cadastro</h3>
            <div className="form-group d-flex">
              <div className="col-4">
                <label htmlFor="categorias">Categorias</label>
                <select className="form-control" id="categorias">
                  <option>Default select</option>
                </select>
              </div>
              <div className="col-8">
                <label htmlFor="nome">Nome</label>
                <input
                  type="email"
                  className="form-control"
                  id="nome"
                  placeholder="Estação de Coleta ..."
                />
              </div>
            </div>

            <p className="col-12">URL da Imagem</p>
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
                      onChange={(e) => handleChange(e, i)}
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
            </div>

            <div className="form-group d-flex">
              <div className="col-2">
                <label htmlFor="estado">Estado</label>
                <select className="form-control" id="estado">
                  <option>CE</option>
                </select>
              </div>
              <div className="col-2">
                <label htmlFor="cidade">Cidade</label>
                <input
                  type="text"
                  className="form-control"
                  id="cidade"
                  placeholder="Fortaleza"
                />
              </div>
              <div className="col-8">
                <label htmlFor="endereco">Endereço</label>
                <input
                  type="text"
                  className="form-control"
                  id="endereco"
                  placeholder="Rua dos Bobos, 0, Bairro"
                />
              </div>
            </div>

            <div className="form-group col-12">
              <label htmlFor="descricao">Descrição</label>
              <textarea
                className="form-control"
                id="descricao"
                rows="3"
              ></textarea>
            </div>

            <div className="form-group d-flex">
              <div className="col-3">
                <label htmlFor="phone">Telefone</label>
                <input
                  type="tel"
                  className="form-control"
                  id="phone"
                  placeholder="(99) 99999-9999"
                />
              </div>

              <div className="col-2">
                <label htmlFor="hrIni">Horario inicial</label>
                <input
                  type="time"
                  className="form-control"
                  id="hrIni"
                  placeholder="Fortaleza"
                />
              </div>

              <div className="col-2">
                <label htmlFor="hrFin">Horario final</label>
                <input
                  type="time"
                  className="form-control"
                  id="hrFin"
                  placeholder="Fortaleza"
                />
              </div>

              <div className="col-7">
                <label htmlFor="funcionamento">Dias de Funcionamento</label>
                <br />
                <div className="form-check form-check-inline">
                  {funcionamento.map((dia) => (
                    <div className="mx-1" key={dia}>
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id={dia}
                        value={dia}
                      />
                      <label className="form-check-label" htmlFor={dia}>
                        {dia}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
