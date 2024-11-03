import React, { useEffect, useState } from "react";
import axios from "axios";
import api from "../../../apiURL";
import toast from "react-hot-toast";
import Select from "react-select";
import Faculties from "../../Pages/Faculties/Faculties";
import SelectorModal from "./SelectorModal";
import Ranks from "../../Pages/Ranks/Ranks";

function ModalDepartments({
  event,
  selectedCell,
  flag,
  setFlag,
  setIsModalOpen,
  setSelectedCell,
}) {
  const [selectedFaculty, setSelectedFaculty] = useState(undefined);
  const [isFacultyModalOpen, setIsFacultyModalOpen] = useState(false);
  const [newDepartment, setNewDepartment] = useState({
    name: "",
    shortName: "",
    color: "",
    facultyId: 0,
  });

  useEffect(() => {
    if (event === 1) {
      setSelectedFaculty(selectedCell.Faculty);
    }
  }, []);

  const [changeDepartment, setChangeDepartment] = useState({
    id: selectedCell.Id,
    name: selectedCell.Name,
    shortName: selectedCell.ShortName,
    color: selectedCell.Color,
    facultyId: selectedCell?.FacultyId,
  });
  const addHandleChange = (event) => {
    const { name, value } = event.target;
    setNewDepartment((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const changeHandleChange = (event) => {
    const { name, value } = event.target;
    setChangeDepartment((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const addClickHandler = () => {
    const tempDepartment = newDepartment;
    tempDepartment.facultyId = selectedFaculty.Id;
    setNewDepartment(tempDepartment);
    console.log(newDepartment);
    if (newDepartment.name === "" || newDepartment.shortName === "")
      toast.error("Boş alan bırakılamaz!");
    else {
      axios.post(api.department.add, newDepartment).then((res) => {
        setIsModalOpen(false);
        setFlag(!flag);
        toast.success("Bölüm Başarıyla eklendi!");
      });
    }
  };

  const changeClickHandler = () => {
    const tempDepartment = changeDepartment;
    tempDepartment.facultyId = selectedFaculty.Id
      ? selectedFaculty.Id
      : selectedFaculty.id;
    setChangeDepartment(tempDepartment);
    if (changeDepartment.name === "" || changeDepartment.shortName === "")
      toast.error("Boş alan bırakılamaz!");
    else {
      axios
        .put(api.department.update(selectedCell.Id), changeDepartment)
        .then((res) => {
          setIsModalOpen(false);
          setFlag(!flag);
          toast.success("Bölüm başarıyla düzenlendi!");
        });
    }
  };
  const deleteClickHandler = () => {
    axios.delete(api.department.delete(selectedCell.Id)).then((res) => {
      setIsModalOpen(false);
      setFlag(!flag);
      toast.success("Bölüm başarıyla kaldırıldı!");
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
          <h2 className="title title-lg">Bölüm Ekle</h2>
          <form onSubmit={(event) => event.preventDefault()}>
            <div className="input-group">
              <span className="title title-sm">Bölüm Adı</span>
              <input
                type="text"
                name="name"
                value={newDepartment.name}
                onChange={addHandleChange}
              />
            </div>

            <div className="input-group">
              <span className="title title-sm">Kısa Adı</span>
              <input
                type="text"
                name="shortName"
                value={newDepartment.shortName}
                onChange={addHandleChange}
              />
            </div>
            <div className="input-group">
              <span className="title title-sm">Renk</span>
              <input
                type="color"
                name="color"
                value={newDepartment.color}
                onChange={addHandleChange}
                style={{ width: "100%", height: "5rem" }}
              />
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
          <h2 className="title title-lg">Bölümü Düzenle</h2>
          <form onSubmit={(event) => event.preventDefault()}>
            <div className="input-group">
              <span className="title title-sm">Bölüm Adı</span>
              <input
                type="text"
                name="name"
                value={changeDepartment.name}
                onChange={changeHandleChange}
              />
            </div>
            <div className="input-group">
              <span className="title title-sm">Bölüm Kısa Adı</span>
              <input
                type="text"
                name="shortName"
                value={changeDepartment.shortName}
                onChange={changeHandleChange}
              />
            </div>
            <div className="input-group">
              <span className="title title-sm">Renk</span>
              <input
                type="color"
                name="color"
                value={changeDepartment.color}
                onChange={changeHandleChange}
                style={{ width: "100%", height: "5rem" }}
              />
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
            <div className="buttons">
              <button
                className="btn btn-md btn-blue"
                onClick={changeClickHandler}
              >
                Kaydet
              </button>
              <button
                className="btn btn-md btn-red"
                onClick={() => setIsModalOpen(false)}
              >
                Vazgeç
              </button>
            </div>
          </form>
        </div>
      );
    case 2:
      return (
        <div className="remove modal-container">
          <h2 className="title title-lg">Bölümü Sil</h2>
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

export default ModalDepartments;
