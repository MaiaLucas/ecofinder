import React, { useEffect, useState } from "react";
import { FiArrowRight, FiPlus } from "react-icons/fi";
import { Link } from "react-router-dom";
import mapMarkerImg from "../assets/map-marker.svg";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";

import "../styles/pages/page-map.css";
import mapIcon from "../util/mapIcon";
import api from "../services/api";

export default () => {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    api.get("place").then((response) => {
      setPlaces(response.data);
    });
    return () => {};
  }, []);

  return (
    <div id="page-map">
      <aside>
        <header>
          <img src={mapMarkerImg} alt="" />
          <h2>Escolha um orfanato no mapa</h2>
          <p>Muitas crianças est"ao esperando a sua visita :)</p>
        </header>
        <footer>
          <strong>Fortaleza</strong>
          <span>Ceará</span>
        </footer>
      </aside>

      <Map
        center={[-3.7722138, -38.5795397]}
        zoom={5}
        style={{ width: "50%", height: "50%" }}
      >
        {/* <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" /> */}
        <TileLayer
          url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
        />

        {places.map((place) => {
          return (
            <Marker
              key={place.id}
              position={[place.latitude, place.longitude]}
              icon={mapIcon}
            >
              <Popup
                closeButton={false}
                minWidth={240}
                maxWidth={240}
                className="map-popup"
              >
                {place.name}
                <Link to={`/place/${place.id}`}>
                  <FiArrowRight size={20} color="#fff" />
                </Link>
              </Popup>
            </Marker>
          );
        })}
      </Map>

      <Link to="/place/create" className="create-place">
        <FiPlus size={32} color="#f9f9f9" />{" "}
      </Link>
    </div>
  );
};
