import React, { useState } from "react";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import GridTableCells from "./GridTableCells";
import {
  BounceLoader,
  ClipLoader,
  HashLoader,
  MoonLoader,
  RingLoader,
} from "react-spinners";
import GridTableTools from "./GridTableTools";
import GridTableModal from "./GridTableModal";
import ModalFaculties from "./Modal/ModalFaculties";
import components from "./ComponentIDs";
import ModalLessons from "./Modal/ModalLessons";
import ModalRanks from "./Modal/ModalRanks";
import ModalTeachers from "./Modal/ModalTeachers";
import Ranks from "../Pages/Ranks/Ranks";
import SelectorModal from "./Modal/SelectorModal";
import ModalDepartments from "./Modal/ModalDepartments";
import ModalClassrooms from "./Modal/ModalClassrooms";

function GridTable({
  data,
  component,
  loading,
  pagination,
  setPage,
  searchText,
  setSearchText,
  isModalOpen,
  setIsModalOpen,
  flag,
  setFlag,
  selector,
  setSelected,
}) {
  const [color, setColor] = useState("#646464");
  const [event, setEvent] = useState(undefined);
  const [selectedCell, setSelectedCell] = useState({});
  const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
    zIndex: "2",
  };

  const overlayStyle = {
    position: "absolute",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(255,255,255,0.8)",
    zIndex: "1",
    borderRadius: "1rem",
  };
  return (
    <div className="grid-table">
      {isModalOpen && (
        <>
          <GridTableModal
            setIsModalOpen={setIsModalOpen}
            isModalOpen={isModalOpen}
          >
            {(() => {
              switch (component) {
                case components.faculties:
                  return (
                    <ModalFaculties
                      event={event}
                      selectedCell={selectedCell}
                      setSelectedCell={setSelectedCell}
                      setIsModalOpen={setIsModalOpen}
                      flag={flag}
                      setFlag={setFlag}
                    />
                  );
                case components.lessons:
                  return (
                    <ModalLessons
                      event={event}
                      selectedCell={selectedCell}
                      setSelectedCell={setSelectedCell}
                      setIsModalOpen={setIsModalOpen}
                      flag={flag}
                      setFlag={setFlag}
                    />
                  );
                case components.ranks:
                  return (
                    <ModalRanks
                      event={event}
                      selectedCell={selectedCell}
                      setSelectedCell={setSelectedCell}
                      setIsModalOpen={setIsModalOpen}
                      flag={flag}
                      setFlag={setFlag}
                    />
                  );
                case components.teachers:
                  return (
                    <ModalTeachers
                      event={event}
                      selectedCell={selectedCell}
                      setSelectedCell={setSelectedCell}
                      setIsModalOpen={setIsModalOpen}
                      flag={flag}
                      setFlag={setFlag}
                    />
                  );
                case components.departments:
                  return (
                    <ModalDepartments
                      event={event}
                      selectedCell={selectedCell}
                      setSelectedCell={setSelectedCell}
                      setIsModalOpen={setIsModalOpen}
                      flag={flag}
                      setFlag={setFlag}
                    />
                  );
                case components.classrooms:
                  return (
                    <ModalClassrooms
                      event={event}
                      selectedCell={selectedCell}
                      setSelectedCell={setSelectedCell}
                      setIsModalOpen={setIsModalOpen}
                      flag={flag}
                      setFlag={setFlag}
                    />
                  );
              }
            })()}
          </GridTableModal>
          <div className="modal-overlay"></div>
        </>
      )}
      <div className="grid-table-wrapper ">
        <div className="grid-table-row tools">
          <GridTableTools
            dataLength={data.length}
            pagination={pagination}
            setPage={setPage}
            searchText={searchText}
            setSearchText={setSearchText}
          />
        </div>
        <div className="grid-table-row datas">
          {loading && (
            <div className="loading-overlay" style={overlayStyle}>
              <MoonLoader
                color={color}
                loading={loading}
                cssOverride={override}
                size={75}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            </div>
          )}
          {!selector && (
            <div
              className="data-cell add"
              onClick={() => {
                setIsModalOpen(true);
                setEvent(0);
              }}
            >
              <i className="bi bi-plus-lg add-icon"></i>
              <span>Ekle</span>
            </div>
          )}
          <GridTableCells
            data={data}
            component={component}
            setEvent={setEvent}
            setIsModalOpen={setIsModalOpen}
            isModalOpen={isModalOpen}
            selectedCell={selectedCell}
            setSelectedCell={setSelectedCell}
            selector={selector}
            setSelected={setSelected}
          />
        </div>
      </div>
    </div>
  );
}

export default GridTable;
