import React, { useEffect, useState } from "react";
import axios from "axios";
import api from "../../../apiURL";
import toast from "react-hot-toast";
import Select from "react-select";
import Faculties from "../../Pages/Faculties/Faculties";
import SelectorModal from "./SelectorModal";
import Ranks from "../../Pages/Ranks/Ranks";

function ModalTeachers({
  event,
  selectedCell,
  flag,
  setFlag,
  setIsModalOpen,
  setSelectedCell,
}) {
  const [selectedRank, setSelectedRank] = useState(undefined);
  const [isRankModalOpen, setIsRankModalOpen] = useState(false);
  const [selectedFaculty, setSelectedFaculty] = useState(undefined);
  const [isFacultyModalOpen, setIsFacultyModalOpen] = useState(false);
  const [newTeacher, setNewTeacher] = useState({
    name: "",
    shortName: "",
    facultyId: 0,
    rankId: 0,
  });

  useEffect(() => {
    if (event === 1) {
      setSelectedFaculty(selectedCell.Faculty);
      setSelectedRank(selectedCell.Rank);
    }
  }, []);

  const [changeTeacher, setChangeTeacher] = useState({
    id: selectedCell.Id,
    name: selectedCell.Name,
    shortName: selectedCell.ShortName,
    facultyId: selectedCell?.FacultyId,
    rankId: selectedCell?.RankId,
  });
  const addHandleChange = (event) => {
    const { name, value } = event.target;
    setNewTeacher((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const changeHandleChange = (event) => {
    const { name, value } = event.target;
    setChangeTeacher((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const addClickHandler = () => {
    const tempTeacher = newTeacher;
    tempTeacher.facultyId = selectedFaculty.Id;
    tempTeacher.rankId = selectedRank.Id;
    setNewTeacher(tempTeacher);
    console.log(newTeacher);
    if (newTeacher.name === "" || newTeacher.shortName === "")
      toast.error("Boş alan bırakılamaz!");
    else {
      axios.post(api.teacher.add, newTeacher).then((res) => {
        setIsModalOpen(false);
        setFlag(!flag);
        toast.success("Ders Başarıyla eklendi!");
      });
    }
  };

  const changeClickHandler = () => {
    const tempTeacher = changeTeacher;
    tempTeacher.facultyId = selectedFaculty.Id
      ? selectedFaculty.Id
      : selectedFaculty.id;
    tempTeacher.rankId = selectedRank.Id ? selectedRank.Id : selectedRank.id;
    setChangeTeacher(tempTeacher);
    if (changeTeacher.name === "" || changeTeacher.shortName === "")
      toast.error("Boş alan bırakılamaz!");
    else {
      axios
        .put(api.teacher.update(selectedCell.Id), changeTeacher)
        .then((res) => {
          setIsModalOpen(false);
          setFlag(!flag);
          toast.success("Eğitmen başarıyla düzenlendi!");
        });
    }
  };
  const deleteClickHandler = () => {
    axios.delete(api.teacher.delete(selectedCell.Id)).then((res) => {
      setIsModalOpen(false);
      setFlag(!flag);
      toast.success("Eğitmen başarıyla kaldırıldı!");
    });
  };

  switch (event) {
    case 0:
      return (
        <div className="add modal-container">
          {isRankModalOpen && (
            <SelectorModal closer={setIsRankModalOpen}>
              <Ranks selector={1} setSelected={setSelectedRank} />
            </SelectorModal>
          )}
          {isFacultyModalOpen && (
            <SelectorModal closer={setIsFacultyModalOpen}>
              <Faculties selector={1} setSelected={setSelectedFaculty} />
            </SelectorModal>
          )}
          <h2 className="title title-lg">Eğitmen Ekle</h2>
          <form onSubmit={(event) => event.preventDefault()}>
            <div className="input-group">
              <span className="title title-sm">Unvanı</span>
              <div
                onClick={() => {
                  setIsFacultyModalOpen(false);
                  setIsRankModalOpen(true);
                }}
              >
                {selectedRank ? (
                  <div className="rank-selector selector">
                    {selectedRank.Name}
                  </div>
                ) : (
                  <div className="rank-selector selector">
                    Unvan seçmek için tıklayın.
                  </div>
                )}
              </div>
            </div>
            <div className="input-group">
              <span className="title title-sm">Adı Soyadi</span>
              <input
                type="text"
                name="name"
                value={newTeacher.name}
                onChange={addHandleChange}
              />
            </div>

            <div className="input-group">
              <span className="title title-sm">Kısa Adı</span>
              <input
                type="text"
                name="shortName"
                value={newTeacher.shortName}
                onChange={addHandleChange}
              />
            </div>
            <div className="input-group">
              <span className="title title-sm">Fakültesi</span>
              <div
                onClick={() => {
                  setIsRankModalOpen(false);
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
          {isRankModalOpen && (
            <SelectorModal closer={setIsRankModalOpen}>
              <Ranks selector={1} setSelected={setSelectedRank} />
            </SelectorModal>
          )}
          {isFacultyModalOpen && (
            <SelectorModal closer={setIsFacultyModalOpen}>
              <Faculties selector={1} setSelected={setSelectedFaculty} />
            </SelectorModal>
          )}
          <h2 className="title title-lg">Eğitmeni Düzenle</h2>
          <form onSubmit={(event) => event.preventDefault()}>
            <div className="input-group">
              <span className="title title-sm">Unvanı</span>
              <div
                onClick={() => {
                  setIsFacultyModalOpen(false);
                  setIsRankModalOpen(true);
                }}
              >
                {selectedRank ? (
                  <div className="rank-selector selector">
                    {selectedRank.name ? selectedRank.name : selectedRank.Name}
                  </div>
                ) : (
                  <div className="rank-selector selector">
                    Unvan seçmek için tıkla.
                  </div>
                )}
              </div>
            </div>
            <div className="input-group">
              <span className="title title-sm">Eğitmen Adı</span>
              <input
                type="text"
                name="name"
                value={changeTeacher.name}
                onChange={changeHandleChange}
              />
            </div>
            <div className="input-group">
              <span className="title title-sm">Eğitmen Kısa Adı</span>
              <input
                type="text"
                name="shortName"
                value={changeTeacher.shortName}
                onChange={changeHandleChange}
              />
            </div>
            <div className="input-group">
              <span className="title title-sm">Fakültesi</span>
              <div
                onClick={() => {
                  setIsRankModalOpen(false);
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
          <h2 className="title title-lg">Eğitmeni Sil</h2>
          <div className="info">
            <span className="title title-lg">
              <b style={{ fontWeight: 100 }}>{selectedCell.ShortName}</b> <br />{" "}
              <b style={{ fontWeight: 900 }}>
                {selectedCell.Rank.shortName}. {selectedCell.Name}
              </b>{" "}
              <br />
              <b style={{ fontWeight: 200 }}>{selectedCell.Faculty.name}</b>
            </span>
            <div className="warning">
              <h3 className="title title-sm">
                Gösterilen eğitmen silinecek,
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

export default ModalTeachers;
