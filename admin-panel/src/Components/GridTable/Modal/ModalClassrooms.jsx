import React, { useEffect, useState } from "react";
import axios from "axios";
import api from "../../../apiURL";
import toast from "react-hot-toast";
import Select from "react-select";
import Faculties from "../../Pages/Faculties/Faculties";
import SelectorModal from "./SelectorModal";
import Ranks from "../../Pages/Ranks/Ranks";

function ModalClassrooms({
  event,
  selectedCell,
  flag,
  setFlag,
  setIsModalOpen,
  setSelectedCell,
}) {
  const [selectedFaculty, setSelectedFaculty] = useState(undefined);
  const [isFacultyModalOpen, setIsFacultyModalOpen] = useState(false);
  const [newClassroom, setNewClassroom] = useState({
    name: "",
    capacity: 0,
    examCapacity: 0,
    planUrl: "string",
    facultyId: 0,
  });

  useEffect(() => {
    if (event === 1) {
      setSelectedFaculty(selectedCell.Faculty);
    }
  }, []);

  const [changeClassroom, setChangeClassroom] = useState({
    id: selectedCell.Id,
    name: selectedCell.Name,
    capacity: selectedCell.Capacity,
    examCapacity: selectedCell.ExamCapacity,
    planUrl: selectedCell.PlanUrl,
    facultyId: selectedCell?.FacultyId,
  });
  const addHandleChange = (event) => {
    const { name, value } = event.target;
    setNewClassroom((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const changeHandleChange = (event) => {
    const { name, value } = event.target;
    setChangeClassroom((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const addClickHandler = () => {
    const tempClassroom = newClassroom;
    tempClassroom.facultyId = selectedFaculty.Id;
    setNewClassroom(tempClassroom);
    console.log(newClassroom);
    if (newClassroom.name === "") toast.error("Boş alan bırakılamaz!");
    else {
      axios.post(api.classroom.add, newClassroom).then((res) => {
        setIsModalOpen(false);
        setFlag(!flag);
        toast.success("Derslik Başarıyla eklendi!");
      });
    }
  };

  const changeClickHandler = () => {
    const tempClassroom = changeClassroom;
    tempClassroom.facultyId = selectedFaculty.Id
      ? selectedFaculty.Id
      : selectedFaculty.id;
    setChangeClassroom(tempClassroom);
    if (changeClassroom.name === "" || changeClassroom.shortName === "")
      toast.error("Boş alan bırakılamaz!");
    else {
      axios
        .put(api.classroom.update(selectedCell.Id), changeClassroom)
        .then((res) => {
          setIsModalOpen(false);
          setFlag(!flag);
          toast.success("Derslik başarıyla düzenlendi!");
        });
    }
  };
  const deleteClickHandler = () => {
    axios.delete(api.classroom.delete(selectedCell.Id)).then((res) => {
      setIsModalOpen(false);
      setFlag(!flag);
      toast.success("Derslik başarıyla kaldırıldı!");
    });
  };

  switch (event) {
    case 0:
      return (
        <div className="add modal-container">
          {isFacultyModalOpen && (
            <SelectorModal closer={setIsFacultyModalOpen}>
              <Faculties selector={1} setSelected={setSelectedFaculty} />
            </SelectorModal>
          )}
          <h2 className="title title-lg">Derslik Ekle</h2>
          <form onSubmit={(event) => event.preventDefault()}>
            <div className="input-group">
              <span className="title title-sm">Derslik Adı</span>
              <input
                type="text"
                name="name"
                value={newClassroom.name}
                onChange={addHandleChange}
              />
            </div>
            <div className="input-group">
              <span className="title title-sm">Derslik Kapasitesi</span>
              <input
                type="number"
                name="capacity"
                value={newClassroom.capacity}
                onChange={addHandleChange}
              />
            </div>
            <div className="input-group">
              <span className="title title-sm">Derslik Sınav Kapasitesi</span>
              <input
                type="number"
                name="examCapacity"
                value={newClassroom.examCapacity}
                onChange={addHandleChange}
              />
            </div>
            <div className="input-group">
              <span className="title title-sm">Derslik Planı</span>
              <input type="text" value="GEÇİCİ OLARAK DEVRE DIŞI" />
            </div>
            <div className="input-group">
              <span className="title title-sm">Fakültesi</span>
              <div
                onClick={() => {
                  setIsFacultyModalOpen(true);
                }}
              >
                {selectedFaculty ? (
                  <div className="rank-selector selector">
                    {selectedFaculty.Name}
                  </div>
                ) : (
                  <div className="rank-selector selector">
                    Fakülte seçmek için tıklayın.
                  </div>
                )}
              </div>
            </div>
            <button className="btn btn-md btn-blue" onClick={addClickHandler}>
              Ekle
            </button>
          </form>
        </div>
      );
    case 1:
      return (
        <div className="edit modal-container">
          {isFacultyModalOpen && (
            <SelectorModal closer={setIsFacultyModalOpen}>
              <Faculties selector={1} setSelected={setSelectedFaculty} />
            </SelectorModal>
          )}
          <h2 className="title title-lg">Dersliği Düzenle</h2>
          <form onSubmit={(event) => event.preventDefault()}>
            <div className="input-group">
              <span className="title title-sm">Derslik Adı</span>
              <input
                type="text"
                name="name"
                value={changeClassroom.name}
                onChange={changeHandleChange}
              />
            </div>
            <div className="input-group">
              <span className="title title-sm">Derslik Kapasitesi</span>
              <input
                type="number"
                name="capacity"
                value={changeClassroom.capacity}
                onChange={changeHandleChange}
              />
            </div>
            <div className="input-group">
              <span className="title title-sm">Derslik Sınav Kapasitesi</span>
              <input
                type="number"
                name="examCapacity"
                value={changeClassroom.examCapacity}
                onChange={changeHandleChange}
              />
            </div>
            <div className="input-group">
              <span className="title title-sm">Derslik Planı</span>
              <input type="text" value="GEÇİCİ OLARAK DEVRE DIŞI" />
            </div>
            <div className="input-group">
              <span className="title title-sm">Fakültesi</span>
              <div
                onClick={() => {
                  setIsFacultyModalOpen(true);
                }}
              >
                {selectedFaculty ? (
                  <div className="rank-selector selector">
                    {selectedFaculty.name
                      ? selectedFaculty.name
                      : selectedFaculty.Name}
                  </div>
                ) : (
                  <div className="rank-selector selector">
                    Fakülte seçmek için tıklayın.
                  </div>
                )}
              </div>
            </div>
            <button
              className="btn btn-md btn-blue"
              onClick={changeClickHandler}
            >
              Ekle
            </button>
          </form>
        </div>
      );
    case 2:
      return (
        <div className="remove modal-container">
          <h2 className="title title-lg">Dersliği Sil</h2>
          <div className="info">
            <span className="title title-lg">
              <b style={{ fontWeight: 100 }}>{selectedCell.ShortName}</b> <br />{" "}
              <b style={{ fontWeight: 900 }}>{selectedCell.Name}</b> <br />
              <b style={{ fontWeight: 200 }}>{selectedCell.Faculty.name}</b>
            </span>
            <div className="warning">
              <h3 className="title title-sm">
                Gösterilen bölüm silinecek,
                <b style={{ fontWeight: 700 }}> onaylıyor musun?</b>
              </h3>
              <div className="buttons">
                <button
                  className="btn btn-md btn-blue"
                  onClick={deleteClickHandler}
                >
                  Sil
                </button>
                <button
                  className="btn btn-md btn-red"
                  onClick={() => setIsModalOpen(false)}
                >
                  Vazgeç
                </button>
              </div>
            </div>
          </div>
        </div>
      );
  }
}

export default ModalClassrooms;
