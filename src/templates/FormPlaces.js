import React from "react";
import Input from "../templates/Input";

export default (props) => {
  const funcionamento = ["seg", "ter", "qua", "qui", "sex", "sab", "dom"];
  const listTypes = [
    { id: 1, name: "Postos de Coleta" },
    { id: 2, name: "Experiências" },
    { id: 3, name: "Lojas" },
  ];

  const onSubmit = (e) => {
    props.submit(e);
  };

  const handleInputChange = (e) => {
    props.inputChange(e);
  };

  const handleCheckboxChange = (e, i) => {
    props.checkboxChange(e, i);
  };

  return (
    <div className="Menu d-flex flex-column justify-content-start align-items-center">
      <h1 className="col-12 title">
        {props.target.id ? "Edição" : "Cadastro"}
      </h1>
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
                  value={props.target.type}
                >
                  <option value="" disabled>
                    Categorias
                  </option>
                  {listTypes.map((cat, i) => (
                    <option key={i} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
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
                value={props.target.title}
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
                value={props.target.state}
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
                value={props.target.city}
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
                value={props.target.address}
                func={handleInputChange}
              />
            </div>

            <div className="form-group col-12">
              <label htmlFor="descricao">Descrição</label>
              <textarea
                className="form-control"
                id="descricao"
                name="description"
                defaultValue={props.target.description}
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
                value={props.target.hr_init}
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
                value={props.target.hr_final}
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
                value={props.target.phone}
                func={handleInputChange}
              />
            </div>

            <div className="form-group d-flex">
              <label htmlFor="funcionamento">Dias de Funcionamento</label>
              <div className="ml-4 form-check form-check-inline">
                {funcionamento.map((dia, i) => {
                  return (
                    <div className="mx-1" key={i}>
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id={dia}
                        value={dia}
                        checked={
                          props.target.opening_days.indexOf(dia) !== -1
                            ? "checked"
                            : ""
                        }
                        // checked={check}
                        onChange={(e) => handleCheckboxChange(e, i)}
                      />
                      <label className="form-check-label" htmlFor={dia}>
                        {dia}
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

              <div className={`alert alert-save ${props.message.class} m-0`}>
                {props.message.msg}
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
