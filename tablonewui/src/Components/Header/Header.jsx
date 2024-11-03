import React from "react";
import logo from "../../Images/logo.png";
import {
  faCircleLeft,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { setFaculty } from "../../Redux/Actions/actions";

function Header() {
  const dispatch = useDispatch();
  const faculty = useSelector((state) => state.faculty);
  const clickHandler = () => {
    dispatch(setFaculty.reset());
  };
  return (
    <header>
      <div className="back" onClick={clickHandler}>
        <FontAwesomeIcon icon={faCircleLeft} className="icon" />
        <span>Fakülte Seçim Ekranı</span>
      </div>
      <div className="logo">
        <img src={logo} alt="logo" />
        <span className="title-subtitle">
          <h1 className="title">
            Erzurum Teknik Üniversitesi - <span>{faculty.name}</span>
          </h1>
          <span className="subtitle">Derslik Yönetim Bilgi Sistemi</span>
        </span>
      </div>
      <span className="profile">Kullanıcı</span>
    </header>
  );
}

export default Header;
