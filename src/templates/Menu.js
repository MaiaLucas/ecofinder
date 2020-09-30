import React from "react";
import throwAway from "../assets/img/throw_away.png";
import onlineArticle from "../assets/img/online_article.png";
import amongNature from "../assets/img/among_nature.png";
import Highlights from "./Highlights";
import InformationCard from "./InformationCard";
import Search from "../components/Search";

export default function Menu() {
  return (
    <div className="Menu">
      <div className="principal">
        <div className="container">
          <div className="d-flex justify-content-center my-4">
            <Search />
          </div>
        </div>
      </div>

      {/* Destaques */}
      <div className="col-sm-12 highlights-group">
        <h2 className="text-center text-white">Destaques</h2>
        <div className="container">
          <div className="row justify-content-around py-3">
            <Highlights img={onlineArticle} id={3} target={"/place/3/list"} />
            <Highlights img={throwAway} id={1} target={"/place/1/list"} />
            <Highlights img={amongNature} id={2} target={"/place/2/list"} />
          </div>
        </div>
      </div>

      {/* Informativos */}
      <div className="container my-4">
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
