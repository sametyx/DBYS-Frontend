import React, { useEffect, useState } from "react";
import axios from "axios";
import api from "../../Datas/APIs";
import Department from "./Department";
import { useDispatch, useSelector } from "react-redux";
import { fetchDepartments } from "../../Redux/Actions/actions";

function Departments() {
  const {
    data: departments,
    error,
    loading,
  } = useSelector((state) => state.departments);

  return (
    <div className="departments">
      <h1>Bölümler: </h1>
      {departments.map((e) => (
        <Department department={e} key={e.Id} />
      ))}
    </div>
  );
}

export default Departments;
