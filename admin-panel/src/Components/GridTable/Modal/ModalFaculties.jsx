import React, { useState } from "react";
import axios from "axios";
import api from "../../../apiURL";
import toast from "react-hot-toast";

function ModalFaculties({
  event,
  selectedCell,
  flag,
  setFlag,
  setIsModalOpen,
}) {
  const [newFaculty, setNewFaculty] = useState({
    name: "",
    shortName: "",
  });

  const [changeFaculty, setChangeFaculty] = useState({
    id: selectedCell.Id,
    name: selectedCell.Name,
    shortName: selectedCell.ShortName,
  });
  const addHandleChange = (event) => {
    const { name, value } = event.target;
    setNewFaculty((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const changeHandleChange = (event) => {
    const { name, value } = event.target;
    setChangeFaculty((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const addClickHandler = () => {
    if (newFaculty.name === "" || newFaculty.shortName === "")
      toast.error("Boş alan bırakılamaz!");
    else {
      axios.post(api.faculty.add, newFaculty).then((res) => {
        setIsModalOpen(false);
        setFlag(!flag);
        toast.success("Fakülte Başarıyla eklendi!");
      });
    }
  };

  const changeClickHandler = () => {
    if (changeFaculty.name === "" || changeFaculty.shortName === "")
      toast.error("Boş alan bırakılamaz!");
    else {
      axios
        .put(api.faculty.update(selectedCell.Id), changeFaculty)
        .then((res) => {
          setIsModalOpen(false);
          setFlag(!flag);
          toast.success("Fakülte başarıyla düzenlendi!");
        });
    }
  };
  const deleteClickHandler = () => {
    axios.delete(api.faculty.delete(selectedCell.Id)).then((res) => {
      setIsModalOpen(false);
      setFlag(!flag);
      toast.success("Fakülte başarıyla kaldırıldı!");
    });
  };

  switch (event) {
    case 0:
      return (
        <div className="add modal-container">
          <h2 className="title title-lg">Fakülte Ekle</h2>
          <form onSubmit={(event) => event.preventDefault()}>
            <div className="input-group">
              <span className="title title-sm">Fakülte Adı</span>
              <input
                type="text"
                name="name"
                value={newFaculty.name}
                onChange={addHandleChange}
              />
            </div>
            <div className="input-group">
              <span className="title title-sm">Fakülte Kısa Adı</span>
              <input
                type="text"
                name="shortName"
                value={newFaculty.shortName}
                onChange={addHandleChange}
              />
            </div>
            <div className="buttons">
              <button className="btn btn-md btn-blue" onClick={addClickHandler}>
                Ekle
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
    case 1:
      return (
        <div className="edit modal-container">
          <h2 className="title title-lg">Fakülteyi Düzenle</h2>
          <form onSubmit={(event) => event.preventDefault()}>
            <div className="input-group">
              <span className="title title-sm">Fakülte Adı</span>
              <input
                type="text"
                name="name"
                value={changeFaculty.name}
                onChange={changeHandleChange}
              />
            </div>
            <div className="input-group">
              <span className="title title-sm">Fakülte Kısa Adı</span>
              <input
                type="text"
                name="shortName"
                value={changeFaculty.shortName}
                onChange={changeHandleChange}
              />
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
          <h2 className="title title-lg">Fakülteyi Sil</h2>
          <div className="info">
            <span className="title title-lg">
              <b style={{ fontWeight: 900 }}>{selectedCell.ShortName}</b> <br />{" "}
              {selectedCell.Name}
            </span>
            <div className="warning">
              <h3 className="title title-sm">
                Gösterilen fakülte silinecek,
                <b style={{ fontWeight: 700 }}>onaylıyor musun?</b>
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

export default ModalFaculties;
