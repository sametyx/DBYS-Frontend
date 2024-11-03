import React, { useEffect, useState } from "react";
import axios from "axios";
import api from "../../../apiURL";
import toast from "react-hot-toast";
import Select from "react-select";
import Faculties from "../../Pages/Faculties/Faculties";
import SelectorModal from "./SelectorModal";
import Ranks from "../../Pages/Ranks/Ranks";
import Departments from "../../Pages/Departments/Departments";
import Teachers from "../../Pages/Teachers/Teachers";

function ModalTeachers({
  event,
  selectedCell,
  flag,
  setFlag,
  setIsModalOpen,
  setSelectedCell,
}) {
  const [selectedDepartment, setSelectedDepartment] = useState(undefined);
  const [isDepartmentModalOpen, setIsDepartmentModalOpen] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState(undefined);
  const [isTeacherModalOpen, setIsTeacherModalOpen] = useState(false);
  const [newLesson, setNewLesson] = useState({
    name: "",
    shortName: "",
    capacity: 0,
    maxCount: 0,
    departmentId: 0,
    teacherId: 0,
  });

  useEffect(() => {
    if (event === 1) {
      setSelectedTeacher(selectedCell.Teacher);
      setSelectedDepartment(selectedCell.Department);
    }
  }, []);

  const [changeLesson, setChangeLesson] = useState({
    id: selectedCell.Id,
    name: selectedCell.Name,
    shortName: selectedCell.ShortName,
    capacity: selectedCell.Capacity,
    maxCount: selectedCell.MaxCount,
    departmentId: selectedCell?.DepartmentId,
    teacherId: selectedCell?.TeacherId,
  });
  const addHandleChange = (event) => {
    const { name, value } = event.target;
    setNewLesson((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const changeHandleChange = (event) => {
    const { name, value } = event.target;
    setChangeLesson((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const addClickHandler = () => {
    const tempTeacher = newLesson;
    tempTeacher.departmentId = selectedDepartment.Id;
    tempTeacher.teacherId = selectedTeacher.Id;
    setNewLesson(tempTeacher);
    if (newLesson.name === "" || newLesson.shortName === "")
      toast.error("Boş alan bırakılamaz!");
    else {
      axios.post(api.lesson.add, newLesson).then((res) => {
        setIsModalOpen(false);
        setFlag(!flag);
        toast.success("Ders Başarıyla eklendi!");
      });
    }
  };

  const changeClickHandler = () => {
    const tempTeacher = changeLesson;
    tempTeacher.teacherId = selectedTeacher.Id
      ? selectedTeacher.Id
      : selectedTeacher.id;
    tempTeacher.departmentId = selectedDepartment.Id
      ? selectedDepartment.Id
      : selectedDepartment.id;
    setChangeLesson(tempTeacher);
    if (changeLesson.name === "" || changeLesson.shortName === "")
      toast.error("Boş alan bırakılamaz!");
    else {
      axios
        .put(api.lesson.update(selectedCell.Id), changeLesson)
        .then((res) => {
          setIsModalOpen(false);
          setFlag(!flag);
          toast.success("Ders başarıyla düzenlendi!");
        });
    }
  };
  const deleteClickHandler = () => {
    axios.delete(api.lesson.delete(selectedCell.Id)).then((res) => {
      setIsModalOpen(false);
      setFlag(!flag);
      toast.success("Ders başarıyla kaldırıldı!");
    });
  };

  switch (event) {
    case 0:
      return (
        <div className="add modal-container">
          {isDepartmentModalOpen && (
            <SelectorModal closer={setIsDepartmentModalOpen}>
              <Departments selector={1} setSelected={setSelectedDepartment} />
            </SelectorModal>
          )}
          {isTeacherModalOpen && (
            <SelectorModal closer={setIsTeacherModalOpen}>
              <Teachers selector={1} setSelected={setSelectedTeacher} />
            </SelectorModal>
          )}
          <h2 className="title title-lg">Ders Ekle</h2>
          <form onSubmit={(event) => event.preventDefault()}>
            <div className="input-group">
              <span className="title title-sm">Ders Adı</span>
              <input
                type="text"
                name="name"
                value={newLesson.name}
                onChange={addHandleChange}
              />
            </div>
            <div className="input-group">
              <span className="title title-sm">Ders Kısa Adı</span>
              <input
                type="text"
                name="shortName"
                value={newLesson.shortName}
                onChange={addHandleChange}
              />
            </div>
            <div className="input-group">
              <span className="title title-sm">Dersi Alan Kişi Sayısı</span>
              <input
                type="number"
                name="capacity"
                value={newLesson.capacity}
                onChange={addHandleChange}
              />
            </div>
            <div className="input-group">
              <span className="title title-sm">Dersin Tekrar Sayısı</span>
              <input
                type="number"
                name="maxCount"
                value={newLesson.maxCount}
                onChange={addHandleChange}
              />
            </div>
            <div className="input-group">
              <span className="title title-sm">Bölüm</span>
              <div
                onClick={() => {
                  setIsTeacherModalOpen(false);
                  setIsDepartmentModalOpen(true);
                }}
              >
                {selectedDepartment ? (
                  <div className="rank-selector selector">
                    {selectedDepartment.Name}
                  </div>
                ) : (
                  <div className="rank-selector selector">
                    Bölüm seçmek için tıklayın.
                  </div>
                )}
              </div>
            </div>
            <div className="input-group">
              <span className="title title-sm">Eğitmen</span>
              <div
                onClick={() => {
                  setIsDepartmentModalOpen(false);
                  setIsTeacherModalOpen(true);
                }}
              >
                {selectedTeacher ? (
                  <div className="rank-selector selector">
                    {selectedTeacher.Name}
                  </div>
                ) : (
                  <div className="rank-selector selector">
                    Eğitmen seçmek için tıklayın.
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
          {isDepartmentModalOpen && (
            <SelectorModal closer={setIsDepartmentModalOpen}>
              <Departments selector={1} setSelected={setSelectedDepartment} />
            </SelectorModal>
          )}
          {isTeacherModalOpen && (
            <SelectorModal closer={setIsTeacherModalOpen}>
              <Teachers selector={1} setSelected={setSelectedTeacher} />
            </SelectorModal>
          )}
          <h2 className="title title-lg">Dersi Düzenle</h2>
          <form onSubmit={(event) => event.preventDefault()}>
            <div className="input-group">
              <span className="title title-sm">Ders Adı</span>
              <input
                type="text"
                name="name"
                value={changeLesson.name}
                onChange={changeHandleChange}
              />
            </div>
            <div className="input-group">
              <span className="title title-sm">Ders Kısa Adı</span>
              <input
                type="text"
                name="shortName"
                value={changeLesson.shortName}
                onChange={changeHandleChange}
              />
            </div>
            <div className="input-group">
              <span className="title title-sm">Dersi Alan Kişi Sayısı</span>
              <input
                type="number"
                name="capacity"
                value={changeLesson.capacity}
                onChange={changeHandleChange}
              />
            </div>
            <div className="input-group">
              <span className="title title-sm">Dersin Tekrar Sayısı</span>
              <input
                type="number"
                name="maxCount"
                value={changeLesson.maxCount}
                onChange={changeHandleChange}
              />
            </div>
            <div className="input-group">
              <span className="title title-sm">Bölüm</span>
              <div
                onClick={() => {
                  setIsTeacherModalOpen(false);
                  setIsDepartmentModalOpen(true);
                }}
              >
                {selectedDepartment ? (
                  <div className="rank-selector selector">
                    {selectedDepartment.name
                      ? selectedDepartment.name
                      : selectedDepartment.Name}
                  </div>
                ) : (
                  <div className="rank-selector selector">
                    Bölüm seçmek için tıkla.
                  </div>
                )}
              </div>
            </div>
            <div className="input-group">
              <span className="title title-sm">Eğitmen</span>
              <div
                onClick={() => {
                  setIsDepartmentModalOpen(false);
                  setIsTeacherModalOpen(true);
                }}
              >
                {selectedTeacher ? (
                  <div className="rank-selector selector">
                    {selectedTeacher.name
                      ? selectedTeacher.name
                      : selectedTeacher.Name}
                  </div>
                ) : (
                  <div className="rank-selector selector">
                    Eğitmen seçmek için tıklayın.
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
          <h2 className="title title-lg">Dersi Sil</h2>
          <div className="info">
            <span className="title title-lg">
              <b style={{ fontWeight: 100 }}>{selectedCell.ShortName}</b> <br />{" "}
              <b style={{ fontWeight: 900 }}>{selectedCell.Name}</b> <br />
              <b style={{ fontWeight: 300 }}>
                {selectedCell.Department.shortName}
              </b>{" "}
              <br />
              <b style={{ fontWeight: 200 }}>{selectedCell.Teacher.name}</b>
            </span>
            <div className="warning">
              <h3 className="title title-sm">
                Gösterilen ders silinecek,
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
