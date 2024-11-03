import React, { useEffect, useState } from "react";
import {
  faBook,
  faChevronRight,
  faClock,
  faPeopleRoof,
  faSwatchbook,
  faUserTie,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FilterMain from "./FilterMain";
import { useDispatch } from "react-redux";
import { fetchTeachers } from "../../../Redux/Actions/actions";

function Filters() {
  const [unit, setUnit] = useState(1);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTeachers());
  }, []);
  return (
    <div className="filters">
      <div className="head"></div>
      <div className="chest">
        <div className="filters-navbar">
          <div className="filters-navbar-wrapper">
            <ul className="units">
              <li
                className={`unit ${unit === 1 && "active"}`}
                onClick={() => setUnit(1)}
              >
                <div className="name">
                  <FontAwesomeIcon icon={faUserTie} className="icon" />{" "}
                  <span>Eğitmen</span>
                </div>
                <div className="arrow">
                  <FontAwesomeIcon icon={faChevronRight} className="icon" />
                </div>
              </li>
              <li
                className={`unit ${unit === 2 && "active"}`}
                onClick={() => setUnit(2)}
              >
                <div className="name">
                  <FontAwesomeIcon icon={faSwatchbook} className="icon" />{" "}
                  <span>Bölüm</span>
                </div>
                <div className="arrow">
                  <FontAwesomeIcon icon={faChevronRight} className="icon" />
                </div>
              </li>
              <li
                className={`unit ${unit === 3 && "active"}`}
                onClick={() => setUnit(3)}
              >
                <div className="name">
                  <FontAwesomeIcon icon={faPeopleRoof} className="icon" />{" "}
                  <span>Derslik</span>
                </div>
                <div className="arrow">
                  <FontAwesomeIcon icon={faChevronRight} className="icon" />
                </div>
              </li>
              <li
                className={`unit ${unit === 4 && "active"}`}
                onClick={() => setUnit(4)}
              >
                <div className="name">
                  <FontAwesomeIcon icon={faBook} className="icon" />{" "}
                  <span>Ders</span>
                </div>
                <div className="arrow">
                  <FontAwesomeIcon icon={faChevronRight} className="icon" />
                </div>
              </li>
              <li
                className={`unit ${unit === 5 && "active"}`}
                onClick={() => setUnit(5)}
              >
                <div className="name">
                  <FontAwesomeIcon icon={faClock} className="icon" />{" "}
                  <span>Saat</span>
                </div>
                <div className="arrow">
                  <FontAwesomeIcon icon={faChevronRight} className="icon" />
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className="filters-content">
          <div className="filters-content-wrapper">
            <FilterMain unit={unit} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Filters;
