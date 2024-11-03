import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { HonestWeekPicker } from "./HonestWeekSelector/HonestWeekSelector";
import { useDispatch, useSelector } from "react-redux";

function WeekSelector() {
  const [week, setWeek] = useState({ firstDay: "02-02-2022" });
  const { week: selectedWeek } = useSelector((state) => state.week);
  const dispatch = useDispatch();

  const convertDate = (date) => {
    let dt = new Date(date);
    return `${dt.getDate()}.${dt.getMonth() + 1}.${dt.getFullYear()}`;
  };

  const onChange = (week) => {
    setWeek(week);
  };
  return <HonestWeekPicker onChange={onChange} />;
}

export default WeekSelector;
