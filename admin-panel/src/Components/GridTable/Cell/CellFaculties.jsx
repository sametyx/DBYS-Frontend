import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBuilding } from "@fortawesome/free-solid-svg-icons";
import Situation from "../Situation";
import CellTools from "./CellTools";
import { useSpring, animated } from "@react-spring/web";
import toast from "react-hot-toast";

function CellFaculties({
  faculty,
  setEvent,
  isModalOpen,
  setIsModalOpen,
  selectedCell,
  setSelectedCell,
  selector,
  setSelected,
}) {
  const [isOpen, setIsOpen] = useState(false);

  const dataCellStyle = {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    rowGap: "3rem",
  };

  const infoStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    rowGap: "1rem",
  };

  return (
    <div
      className="data-cell"
      style={dataCellStyle}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      onClick={() => {
        setSelected && setSelected(faculty);
        setSelected && toast.success("Fakülte başarıyla seçildi");
      }}
    >
      {isOpen && !selector && (
        <CellTools
          setEvent={setEvent}
          setIsModalOpen={setIsModalOpen}
          isModalOpen={isModalOpen}
          selectedCell={selectedCell}
          setSelectedCell={setSelectedCell}
          data={faculty}
        />
      )}
      <FontAwesomeIcon
        icon={faBuilding}
        className="icon"
        style={{ fontSize: "5rem" }}
      />
      <div className="info" style={infoStyle}>
        <span
          style={{ fontSize: "1.6rem", textAlign: "center", fontWeight: "500" }}
        >
          {faculty.Name}
        </span>
        <span style={{ fontSize: "1.2rem", fontWeight: "300" }}>
          {faculty.ShortName}
        </span>
      </div>
    </div>
  );
}

export default CellFaculties;
