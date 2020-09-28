import React from "react";
import amongNature from "../assets/img/among_nature.png";

export default (props) => {
  const info = props.config;

  const images = info.images_url ? info.images_url.split(";") : "";
  return (
    <div className="card col-sm-12 m-2 local-card" id={info.id}>
      <div className="row d-flex align-items-center">
        <img
          src={images[0] || amongNature}
          className="col-sm-6 my-3 card-place-img"
          alt=""
        />
        <div className="col-sm-6 card-body d-flex flex-column justify-content-between">
          <h3>{info.title}</h3>
          <p className="text-truncate">{info.description}</p>
          <p className="text-muted">
            {info.address}, {info.state}, {info.city}
          </p>

          <p className="text-monospace local-dates align-self-end">
            Tel: {info.phone} <br />
            Aberto: {info.opening_days} <br />
            Horário: {info.hr_init} - {info.hr_final}
          </p>
        </div>
      </div>
    </div>
  );
};
