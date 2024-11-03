import React from "react";
import Table from "./Table";

function Day({ day }) {
  return (
    <div className="day">
      <div className="day-name">{day.dayTurkish}</div>
      <Table day={day} />
    </div>
  );
}

export default Day;
