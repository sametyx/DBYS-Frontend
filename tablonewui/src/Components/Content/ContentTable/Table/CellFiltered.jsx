import React from "react";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function CellFiltered({ course }) {
  return (
    <td rowSpan={course.count}>
      <FontAwesomeIcon icon={faFilter} style={{ color: "gray" }} />
    </td>
  );
}

export default CellFiltered;
