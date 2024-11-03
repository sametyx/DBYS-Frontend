import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBuilding,
  faBook,
  faUserTie,
  faSwatchbook,
  faRankingStar,
  faPeopleRoof,
  faTimeline,
  faGraduationCap,
} from "@fortawesome/free-solid-svg-icons";

function Navbar() {
  return (
    <div className="navbar">
      <ul className="menu-list">
        <a href="/semester">
          <li className="menu-list-item">
            <FontAwesomeIcon icon={faTimeline} className="icon" />
            <span>Semester</span>
          </li>
        </a>
        <a href="/faculties">
          <li className="menu-list-item">
            <FontAwesomeIcon icon={faBuilding} className="icon" />
            <span>Fakülteler</span>
          </li>
        </a>
        <a href="/lessons">
          <li className="menu-list-item">
            <FontAwesomeIcon icon={faBook} className="icon" />
            <span>Dersler</span>
          </li>
        </a>
        <a href="/teachers">
          <li className="menu-list-item">
            <FontAwesomeIcon icon={faUserTie} className="icon" />
            <span>Eğitmenler</span>
          </li>
        </a>
        <a href="/departments">
          <li className="menu-list-item">
            <FontAwesomeIcon icon={faSwatchbook} className="icon" />
            <span>Bölümler</span>
          </li>
        </a>
        <a href="/ranks">
          <li className="menu-list-item">
            <FontAwesomeIcon icon={faGraduationCap} className="icon" />
            <span>Unvanlar</span>
          </li>
        </a>
        <a href="/classrooms">
          <li className="menu-list-item">
            <FontAwesomeIcon icon={faPeopleRoof} className="icon" />
            <span>Derslikler</span>
          </li>
        </a>
      </ul>
    </div>
  );
}

export default Navbar;
