import React from "react";
import components from "./ComponentIDs";
import CellFaculties from "./Cell/CellFaculties";
import CellLessons from "./Cell/CellLessons";
import CellRanks from "./Cell/CellRanks";
import CellTeachers from "./Cell/CellTeachers";
import CellDepartments from "./Cell/CellDepartments";
import CellClassrooms from "./Cell/CellClassrooms";

function GridTableCells({
  data,
  component,
  setEvent,
  isModalOpen,
  setIsModalOpen,
  selectedCell,
  setSelectedCell,
  selector,
  setSelected,
}) {
  switch (component) {
    case components.faculties:
      return data.map((e) => (
        <CellFaculties
          faculty={e}
          setEvent={setEvent}
          setIsModalOpen={setIsModalOpen}
          isModalOpen={isModalOpen}
          selectedCell={selectedCell}
          setSelectedCell={setSelectedCell}
          selector={selector}
          setSelected={setSelected}
        />
      ));
    case components.lessons:
      return data.map((e) => (
        <CellLessons
          lesson={e}
          setEvent={setEvent}
          setIsModalOpen={setIsModalOpen}
          isModalOpen={isModalOpen}
          selectedCell={selectedCell}
          setSelectedCell={setSelectedCell}
          selector={selector}
          setSelected={setSelected}
        />
      ));
    case components.ranks:
      return data.map((e) => (
        <CellRanks
          rank={e}
          setEvent={setEvent}
          setIsModalOpen={setIsModalOpen}
          isModalOpen={isModalOpen}
          selectedCell={selectedCell}
          setSelectedCell={setSelectedCell}
          selector={selector}
          setSelected={setSelected}
        />
      ));
    case components.teachers:
      return data.map((e) => (
        <CellTeachers
          teacher={e}
          setEvent={setEvent}
          setIsModalOpen={setIsModalOpen}
          isModalOpen={isModalOpen}
          selectedCell={selectedCell}
          setSelectedCell={setSelectedCell}
          selector={selector}
          setSelected={setSelected}
        />
      ));
    case components.departments:
      return data.map((e) => (
        <CellDepartments
          department={e}
          setEvent={setEvent}
          setIsModalOpen={setIsModalOpen}
          isModalOpen={isModalOpen}
          selectedCell={selectedCell}
          setSelectedCell={setSelectedCell}
          selector={selector}
          setSelected={setSelected}
        />
      ));
    case components.classrooms:
      return data.map((e) => (
        <CellClassrooms
          classroom={e}
          setEvent={setEvent}
          setIsModalOpen={setIsModalOpen}
          isModalOpen={isModalOpen}
          selectedCell={selectedCell}
          setSelectedCell={setSelectedCell}
          selector={selector}
          setSelected={setSelected}
        />
      ));
  }
}

export default GridTableCells;
