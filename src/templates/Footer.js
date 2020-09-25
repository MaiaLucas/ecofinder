import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faGithub, faTwitter } from "@fortawesome/free-brands-svg-icons";

export default () => {
  return (
    <div className="Footer d-flex justify-content-between p-2">
      <div className="footer-message ml-4">
        Por amor ao nosso planeta{" "}
        <FontAwesomeIcon icon={faHeart} className="footer-icons fa-lg" />
      </div>
      <div className="external mr-4">
        <FontAwesomeIcon icon={faGithub} className="footer-icons fa-2x mx-2" />
        <FontAwesomeIcon icon={faTwitter} className="footer-icons fa-2x" />
      </div>
    </div>
  );
};
