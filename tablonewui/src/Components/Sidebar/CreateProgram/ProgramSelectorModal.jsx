import React, { useEffect, useState } from "react";
import axios from "axios";
import api from "../../../Datas/APIs";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { modal } from "../../../Redux/Actions/actions";

function ProgramSelectorModal({ setSelectedProgram }) {
  const [programs, setPrograms] = useState([]);
  const dispatch = useDispatch();

  const fetchAllPrograms = () => {
    axios.get(api.courseProgram.getAll).then((res) => {
      setPrograms(res.data);
    });
  };

  useEffect(() => {
    fetchAllPrograms();
  }, []);
  return (
    <div className="program-selector-modal">
      <span>Seçmek istediğiniz programın üstüne tıklayınız.</span>
      <div className="programs">
        {programs.map((e) => (
          <div
            className="program"
            onClick={() => {
              setSelectedProgram(e);
              toast.success("Başarıyla program seçildi!");
              dispatch(modal.unshow());
            }}
          >
            <span className="id">
              ID: <b>{e.id}</b>
            </span>
            <span className="date">
              Yayın Tarihi: <b>{e.date}</b>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProgramSelectorModal;
