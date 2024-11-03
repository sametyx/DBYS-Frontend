import React, { useEffect, useRef, useState } from "react";
import Utils from "./Utils";
import ContentTable from "./ContentTable/ContentTable";
import Departments from "./Departments";
import Days from "../../Datas/Days";

function Content() {
  const [selectedDays, setSelectedDays] = useState(Days);

  return (
    <div className="content">
      <div className="content-wrapper">
        <Utils selectedDays={selectedDays} setSelectedDays={setSelectedDays} />
        <Departments />
        <ContentTable selectedDays={selectedDays} />
      </div>
    </div>
  );
}

export default Content;
