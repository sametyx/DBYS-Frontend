import React, { useState } from "react";
import CellTools from "./CellTools";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBook,
  faBuilding,
  faGraduationCap,
  faRepeat,
  faSwatchbook,
  faUser,
  faUserGroup,
  faUsers,
  faUserTie,
} from "@fortawesome/free-solid-svg-icons";

function CellLessons({
  lesson,
  setEvent,
  isModalOpen,
  setIsModalOpen,
  selectedCell,
  setSelectedCell,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDepartmentOpen, setIsDepartmentOpen] = useState(false);
  const [isTeacherOpen, setIsTeacherOpen] = useState(false);

  const dataCellStyle = {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    rowGap: "1rem",
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
    >
      {isOpen && (
        <CellTools
          setEvent={setEvent}
          setIsModalOpen={setIsModalOpen}
          isModalOpen={isModalOpen}
          selectedCell={selectedCell}
          setSelectedCell={setSelectedCell}
          data={lesson}
        />
      )}
      <FontAwesomeIcon
        icon={faBook}
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
          {lesson.Name}
        </span>
        <span style={{ fontSize: "1.2rem", fontWeight: "300" }}>
          {lesson.ShortName}
        </span>
      </div>
      <span
        style={{
          fontSize: "1.4rem",
          fontWeight: "300",
          display: "flex",
          columnGap: "2rem",
        }}
      >
        <span>
          <FontAwesomeIcon icon={faUsers} /> {lesson.Capacity}
        </span>
        <span>
          <FontAwesomeIcon icon={faRepeat} /> {lesson.MaxCount}
        </span>
      </span>
      <div
        className="department-teacher"
        style={{ display: "flex", columnGap: "1rem", fontSize: "1.4rem" }}
      >
        <div
          className="department"
          style={infoBoxStyle}
          onMouseEnter={() => setIsDepartmentOpen(true)}
          onMouseLeave={() => setIsDepartmentOpen(false)}
        >
          <FontAwesomeIcon icon={faSwatchbook} className="icon" />
          <span>
            {lesson.Department.shortName}{" "}
            {isDepartmentOpen && (
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
                {lesson.Department.name}
              </b>
            )}
          </span>
        </div>
        <div
          className="teacher"
          style={infoBoxStyle}
          onMouseEnter={() => setIsTeacherOpen(true)}
          onMouseLeave={() => setIsTeacherOpen(false)}
        >
          <FontAwesomeIcon icon={faUserTie} className="icon" />
          <span>
            {lesson.Teacher.shortName}{" "}
            {isTeacherOpen && (
              <b
                style={{
                  position: "absolute",
                  top: "100%",
                  left: "0",
                  transform: "translate(-35%, 0)",
                  padding: "1rem",
                  whiteSpace: "nowrap",
                  backgroundColor: "#1cb8ff",
                  borderRadius: "1rem",
                  zIndex: "3",
                }}
              >
                {lesson.Teacher.name}
              </b>
            )}{" "}
          </span>
        </div>
      </div>
    </div>
  );
}

export default CellLessons;
