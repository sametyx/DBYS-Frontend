import React, { useState } from "react";
import axios from "axios";
import api from "../../../apiURL";
import toast from "react-hot-toast";

function ModalRanks({ event, selectedCell, flag, setIsModalOpen }) {
  const [newRanks, setNewRanks] = useState({
    name: "",
    shortName: "",
  });

  const [changeRanks, setChangeRanks] = useState({
    id: selectedCell.Id,
    name: selectedCell.Name,
    shortName: selectedCell.ShortName,
  });
  const addHandleChange = (event) => {
    const { name, value } = event.target;
    setNewRanks((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const changeHandleChange = (event) => {
    const { name, value } = event.target;
    setChangeRanks((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const addClickHandler = () => {
    if (newRanks.name === "" || newRanks.shortName === "")
      toast.error("Boş alan bırakılamaz!");
    else {
      axios.post(api.rank.add, newRanks).then((res) => {
        setIsModalOpen(false);
        toast.success("Unvanı Başarıyla eklendi!");
      });
    }
  };

  const changeClickHandler = () => {
    if (changeRanks.name === "" || changeRanks.shortName === "")
      toast.error("Boş alan bırakılamaz!");
    else {
      axios.put(api.rank.update(selectedCell.Id), changeRanks).then((res) => {
        setIsModalOpen(false);
        toast.success("Unvanı başarıyla düzenlendi!");
      });
    }
  };
  const deleteClickHandler = () => {
    axios.delete(api.rank.delete(selectedCell.Id)).then((res) => {
      setIsModalOpen(false);
      toast.success("Unvanı başarıyla kaldırıldı!");
    });
  };

  switch (event) {
    case 0:
      return (
        <div className="add modal-container">
          <h2 className="title title-lg">Unvan Ekle</h2>
          <form onSubmit={(event) => event.preventDefault()}>
            <div className="input-group">
              <span className="title title-sm">Unvan Adı</span>
              <input
                type="text"
                name="name"
                value={newRanks.name}
                onChange={addHandleChange}
              />
            </div>
            <div className="input-group">
              <span className="title title-sm">Unvan Kısa Adı</span>
              <input
                type="text"
                name="shortName"
                value={newRanks.shortName}
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
          <h2 className="title title-lg">Unvanı Düzenle</h2>
          <form onSubmit={(event) => event.preventDefault()}>
            <div className="input-group">
              <span className="title title-sm">Unvan Adı</span>
              <input
                type="text"
                name="name"
                value={changeRanks.name}
                onChange={changeHandleChange}
              />
            </div>
            <div className="input-group">
              <span className="title title-sm">Unvan Kısa Adı</span>
              <input
                type="text"
                name="shortName"
                value={changeRanks.shortName}
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
          <h2 className="title title-lg">Unvanı Sil</h2>
          <div className="info">
            <span className="title title-lg">
              <b style={{ fontWeight: 900 }}>{selectedCell.ShortName}</b> <br />{" "}
              {selectedCell.Name}
            </span>
            <div className="warning">
              <h3 className="title title-sm">
                Gösterilen unvan silinecek,
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

export default ModalRanks;
