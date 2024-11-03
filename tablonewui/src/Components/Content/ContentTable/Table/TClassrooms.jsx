import React, { useState } from "react";
import ClassroomShowInfo from "./ClassroomShowInfo";

function TClassrooms({ classroom }) {
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  return (
    <th
      onMouseEnter={() => setIsInfoOpen(true)}
      onMouseLeave={() => setIsInfoOpen(false)}
    >
      {isInfoOpen && <ClassroomShowInfo classroom={classroom} />}
      {classroom.Name}
    </th>
  );
}

export default TClassrooms;
