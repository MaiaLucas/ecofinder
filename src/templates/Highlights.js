import React from "react";

export default function Highlights(props) {
  return (
    <a className="card highlight" href={props.target}>
      <img src={props.img} className="card-img-top" alt="" />
      <div className="card-body">
        <p className="headline">{props.headline}</p>
        <p className="subheadline">{props.subheadline}</p>
      </div>
    </a>
  );
}
