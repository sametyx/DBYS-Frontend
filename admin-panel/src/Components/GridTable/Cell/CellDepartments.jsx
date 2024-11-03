import React, { useState } from "react";
import CellTools from "./CellTools";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBook,
  faBuilding,
  faGraduationCap,
  faSwatchbook,
  faUser,
  faUserGroup,
  faUserTie,
} from "@fortawesome/free-solid-svg-icons";
import toast from "react-hot-toast";

function CellDepartments({
  department,
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
    rowGap: "2rem",
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
        setSelected && setSelected(department);
        setSelected && toast.success("Bölüm başarıyla seçildi");
      }}
    >
      {isOpen && !selector && (
        <CellTools
          setEvent={setEvent}
          setIsModalOpen={setIsModalOpen}
          isModalOpen={isModalOpen}
          selectedCell={selectedCell}
          setSelectedCell={setSelectedCell}
          data={department}
        />
      )}
      <FontAwesomeIcon
        icon={faSwatchbook}
        className="icon"
        style={{ fontSize: "4rem" }}
      />
      <div className="info" style={infoStyle}>
        <span
          style={{
            fontSize: "1.6rem",
            textAlign: "center",
            fontWeight: "500",
          }}
        >
          {department.Name}
        </span>
        <span style={{ fontSize: "1.2rem", fontWeight: "300" }}>
          {department.ShortName}
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
            {department.Faculty.shortName}{" "}
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
                {department.Faculty.name}
              </b>
            )}
          </span>
        </div>
      </div>
    </div>
  );
}

export default CellDepartments;
