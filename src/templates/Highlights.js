import React from "react";
import { Link } from "react-router-dom";

export default function Highlights(props) {
  console.log(props.id);
  return (
    <Link
      className="card highlight"
      to={{
        pathname: props.target,
        id: props.id,
      }}
    >
      <img src={props.img} className="card-img-top" alt="" />
      <div className="card-body">
        <p className="headline">{props.headline}</p>
        <p className="subheadline">{props.subheadline}</p>
      </div>
    </Link>
  );
}
