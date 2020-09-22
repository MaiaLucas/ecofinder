import React from "react";
import lotus from "../assets/img/lotus.png";
import currentLocation from "../assets/img/current_location.png";
import throwAway from "../assets/img/throw_away.png";
import onlineArticle from "../assets/img/online_article.png";
import amongNature from "../assets/img/among_nature.png";
import Highlights from "./Highlights";
import InformationCard from "./InformationCard";
import Search from "../components/Search";

export default function Menu() {
  return (
    <div className="Menu">
      <div className="container">
        <div className="d-flex justify-content-center my-4">
          <Search />
        </div>
        <div className="d-flex justify-content-center">
          <img src={lotus} className="img-fluid col-sm-6" alt="" />
          <img src={currentLocation} className="img-fluid col-sm-6" alt="" />
        </div>
      </div>

      {/* Destaques */}
      <div className="col-sm-12 highlights-group">
        <h2 className="text-center text-white">Destaques</h2>
        <div className="container">
          <div className="row justify-content-around py-3">
            <Highlights
              img={onlineArticle}
              headline="Compras Online"
              subheadline="Aproveite para fazer aquelas Ecocomprinhas"
              target={"/place/3/list"}
            />
            <Highlights
              img={throwAway}
              headline="Ache Pontos de Coleta"
              subheadline="Encontre o posto de coleta perfeito para o seu lixo"
              target={"/place/1/list"}
            />
            <Highlights
              img={amongNature}
              headline="Encontre as Melhores Experiências"
              subheadline="Aproveite para dar aquela relaxada com as melhores 
              Ecoaventuras da sua região"
              target={"/place/2/list"}
            />
          </div>
        </div>
      </div>

      {/* Informativos */}
      <div className="container mt-4">
        <div className="list-group">
          <h2 className="text-center">Informativos</h2>
          <div className="list-group-item">
            <InformationCard
              target="/"
              img={amongNature}
              className="info-card media p-0 m-2"
            />
          </div>
          <div className="list-group-item">
            <InformationCard
              target="/"
              img={amongNature}
              className="info-card media p-0 m-2"
            />
          </div>
          <div className="list-group-item">
            <InformationCard
              target="/"
              img={amongNature}
              className="info-card media p-0 m-2"
            />
          </div>
          <div className="list-group-item">
            <InformationCard
              target="/"
              img={amongNature}
              className="info-card media p-0 m-2"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
