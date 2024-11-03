import React, { useState } from "react";
import { useSelector } from "react-redux";
import CourseShowInfo from "./CourseShowInfo";

function CellFilledToBeEdited({ position, course }) {
  const [infoIsOpen, setInfoIsOpen] = useState(false);

  const {
    data: departments,
    error,
    loading,
  } = useSelector((state) => state.departments);
  const sds = { backgroundColor: "#ea8500" };

  return (
    <td
      style={{
        backgroundColor: course.Department.color,
        color: "white",
        outline: ".2rem solid #ea8500",
      }}
      onMouseEnter={() => setInfoIsOpen(true)}
      onMouseLeave={() => setInfoIsOpen(false)}
      rowSpan={course.count}
    >
      {infoIsOpen && (
        <CourseShowInfo
          courseId={course.Id}
          toBeEdited={true}
          courseToBeEdited={course}
          position={position}
        />
      )}
      <span
        className="name"
        style={{ fontWeight: 700, letterSpacing: ".2rem" }}
      >
        {course.ShortName}
      </span>
    </td>
  );
}

export default CellFilledToBeEdited;
