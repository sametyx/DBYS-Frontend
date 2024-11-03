import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear, faSliders, faTable } from "@fortawesome/free-solid-svg-icons";
import WeekSelector from "./WeekSelector";
import { useDispatch, useSelector } from "react-redux";
import Days from "../../Datas/Days";
import toast from "react-hot-toast";
import { modal } from "../../Redux/Actions/actions";
import Filters from "../Modal/Filters/Filters";

function Utils({ setSelectedDays, selectedDays }) {
  const creatingMode = useSelector((state) => state.creatingMode);
  const dispatch = useDispatch();
  const { num: filterNum } = useSelector((state) => state.filters);

  const setDays = (id) => {
    if (selectedDays.includes(Days.find((e) => e.id === id))) {
      setSelectedDays(selectedDays.filter((e) => e.id !== id));
    } else {
      setSelectedDays([...selectedDays, Days.find((e) => e.id === id)]);
      toast.success(`${Days.find((e) => e.id === id).dayTurkish} seçildi.`);
    }
  };

  return (
    <div className="utils">
      <div className="filter-export">
        <div
          className="filter custom-button"
          onClick={() => {
            dispatch(modal.show(<Filters />, "Filtreler"));
          }}
        >
          <span className="num">{filterNum}</span>
          <FontAwesomeIcon icon={faSliders} />
          <span>Filtreler</span>
        </div>
        <div className="export custom-button">
          <FontAwesomeIcon icon={faTable} />
          <span>Excel'e çevir</span>
        </div>
      </div>
      {creatingMode ? (
        <div className="creating-mode">
          <FontAwesomeIcon icon={faGear} />
          <span>Program Oluşturma modu açık.</span>
        </div>
      ) : (
        <WeekSelector />
      )}

      <div className="days">
        <div
          className={`day ${
            selectedDays.includes(Days.find((e) => e.id === 0)) && "active"
          }`}
          onClick={() => setDays(0)}
        >
          Pazartesi
        </div>
        <div
          className={`day ${
            selectedDays.includes(Days.find((e) => e.id === 1)) && "active"
          }`}
          onClick={() => setDays(1)}
        >
          Salı
        </div>
        <div
          className={`day ${
            selectedDays.includes(Days.find((e) => e.id === 2)) && "active"
          }`}
          onClick={() => setDays(2)}
        >
          Çarşamba
        </div>
        <div
          className={`day ${
            selectedDays.includes(Days.find((e) => e.id === 3)) && "active"
          }`}
          onClick={() => setDays(3)}
        >
          Perşembe
        </div>
        <div
          className={`day ${
            selectedDays.includes(Days.find((e) => e.id === 4)) && "active"
          }`}
          onClick={() => setDays(4)}
        >
          Cuma
        </div>
        <div
          className={`day ${
            selectedDays.includes(Days.find((e) => e.id === 5)) && "active"
          }`}
          onClick={() => setDays(5)}
        >
          Cumartesi
        </div>
      </div>
    </div>
  );
}

export default Utils;
