import React from "react";
import Header from "../Header/Header";
import logo from "../../Images/logo.png";
import { Button, Card } from "react-bootstrap";
import { useSelector } from "react-redux";
import Faculty from "./Faculty";

function FacultyChooser() {
  const { data: faculties } = useSelector((state) => state.faculties);
  return (
    <div className="faculty-chooser">
      <div className="header">
        <div className="logo">
          <img src={logo} alt="logo" />
          <span className="title-subtitle">
            <span className="title">Erzurum Teknik Üniversitesi</span>
            <span className="subtitle">Derslik Yönetim Bilgi Sistemi</span>
          </span>
        </div>
        <div className="info">Fakülte Seçim Ekranı</div>
      </div>
      <h1 className="message">
        <h2 className="title">fakülte</h2>
        <p>
          Görünüşe göre fakülte seçimi yapmamışsın. Aşağıdan fakülte seçerek,
          seçtiğin fakültenin derslik durumlarını görebilirsin.
        </p>
      </h1>
      <div className="faculties">
        {faculties.map((e) => (
          <Faculty faculty={e} />
        ))}
      </div>
      <footer>
        <span>Erzurum Teknik Üniversitesi - DBYS, 2024</span>|
        <span className="credit">
          Muhammed Enes Aydın - Abdulsamed Yıldırım{" "}
        </span>
      </footer>
    </div>
  );
}

export default FacultyChooser;
