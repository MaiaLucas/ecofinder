import React from "react";

export default (props) => (
  <a className={props.className} href={props.target}>
    <img src={props.img} className="info-img mr-3" alt="" />
    <div className="media-body">
      <h5 className="mt-0 info-title">Media heading</h5>
      <p className="info-description">
        Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque
        ante sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus
        viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla.
        Donec lacinia congue felis in faucibus.
      </p>
    </div>
  </a>
);
