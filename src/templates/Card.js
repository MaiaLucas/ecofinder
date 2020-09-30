import React from "react";
import { Link } from "react-router-dom";
import amongNature from "../assets/img/among_nature.png";

export default (props) => {
  const info = props.config;

  const images = info.images_url ? info.images_url.split(";") : "";
  return (
    <Link
      to={{
        pathname: "/detail/" + info.id,
        objPlace: props.config,
      }}
      className="link-place-detail"
    >
      <div
        className="d-flex flex-column align-items-center p-0 card-place"
        id={info.id}
      >
        <img src={images[0] || amongNature} className="img-fluid" alt="" />
        <b>{info.title}</b>
      </div>
    </Link>
  );
};
