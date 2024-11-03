import React, { useState } from "react";
import CellTools from "./CellTools";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBook,
  faBuilding,
  faGraduationCap,
  faPeopleRoof,
  faSwatchbook,
  faUser,
  faUserGroup,
  faUserPen,
  faUsers,
  faUserTie,
} from "@fortawesome/free-solid-svg-icons";
import toast from "react-hot-toast";

function CellClassrooms({
  classroom,
  setEvent,
  isModalOpen,
  setIsModalOpen,
  selectedCell,
  setSelectedCell,
  selector,
  setSelected,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isFacultyOpen, setIsFacultyOpen] = useState(false);

  const dataCellStyle = {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    rowGap: "1.5rem",
  };

  const infoBoxStyle = {
    position: "relative",
    display: "flex",
    columnGap: "0.5rem",
    padding: "0.7rem",
    borderRadius: "1rem",
    color: "white",
    backgroundColor: "#0099E0",
  };

  const infoStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    rowGap: "0.3rem",
  };

  return (
    <div
      className="data-cell"
      style={dataCellStyle}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      onClick={() => {
        setSelected && setSelected(classroom);
        setSelected && toast.success("Derslik başarıyla seçildi");
      }}
    >
      {isOpen && !selector && (
        <CellTools
          setEvent={setEvent}
          setIsModalOpen={setIsModalOpen}
          isModalOpen={isModalOpen}
          selectedCell={selectedCell}
          setSelectedCell={setSelectedCell}
          data={classroom}
        />
      )}
      <FontAwesomeIcon
        icon={faPeopleRoof}
        className="icon"
        style={{ fontSize: "4rem" }}
      />
      <div className="info" style={infoStyle}>
        <span
          style={{
            fontSize: "2rem",
            textAlign: "center",
            fontWeight: "500",
          }}
        >
          {classroom.Name}
        </span>
        <span
          style={{
            fontSize: "1.4rem",
            fontWeight: "300",
            display: "flex",
            columnGap: "1rem",
          }}
        >
          <span>
            <FontAwesomeIcon icon={faUsers} /> {classroom.Capacity}
          </span>
          <span>
            <FontAwesomeIcon icon={faUserPen} /> {classroom.ExamCapacity}
          </span>
        </span>
      </div>
      <div
        className="faculty"
        style={{ display: "flex", columnGap: "1rem", fontSize: "1.4rem" }}
      >
        <div
          className="faculty"
          style={infoBoxStyle}
          onMouseEnter={() => setIsFacultyOpen(true)}
          onMouseLeave={() => setIsFacultyOpen(false)}
        >
          <FontAwesomeIcon icon={faBuilding} className="icon" />
          <span>
            {classroom.Faculty.shortName}{" "}
            {isFacultyOpen && (
              <b
                style={{
                  position: "absolute",
                  top: "100%",
                  left: "-50%",
                  padding: "1rem",
                  whiteSpace: "nowrap",
                  backgroundColor: "#1cb8ff",
                  borderRadius: "1rem",
                  zIndex: "3",
                }}
              >
                {classroom.Faculty.name}
              </b>
            )}
          </span>
        </div>
      </div>
      <div
        className="planUrl"
        style={{
          padding: "0.5rem 1rem",
          backgroundColor: "#ffe45b",
          borderRadius: "1rem",
          fontSize: "1.4rem",
        }}
      >
        Derslik Planı
      </div>
    </div>
  );
}

export default CellClassrooms;
