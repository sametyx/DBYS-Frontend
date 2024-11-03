import React, { useEffect, useState } from "react";
import axios from "axios";
import api from "../../../Datas/APIs";
import TClassrooms from "./Table/TClassrooms";
import TRow from "./Table/TRow";
import { useQuery } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { fetchClassrooms } from "../../../Redux/Actions/actions";

function Table({ day }) {
  const {
    data: Classrooms,
    loading,
    error,
  } = useSelector((state) => state.classrooms);
  const hours = useSelector((state) => state.hours);
  const filters = useSelector((state) => state.filters);

  const filteredClassrooms = Classrooms.filter(
    (e) => !filters.classrooms.includes(e.Id),
  );
  const filteredHours = hours.filter((e) => !filters.hours.includes(e.id));

  return (
    <table>
      <thead>
        <tr>
          <th className="smooth-cell"></th>
          {filteredClassrooms.map((classroom) => (
            <TClassrooms classroom={classroom} key={classroom.Id} />
          ))}
        </tr>
      </thead>
      <tbody>
        {filteredHours.map((hour) => (
          <TRow hour={hour} day={day} key={hour.id} />
        ))}
      </tbody>
    </table>
  );
}

export default Table;
