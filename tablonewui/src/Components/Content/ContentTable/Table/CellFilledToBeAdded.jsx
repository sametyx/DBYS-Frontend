import React, { useState } from "react";
import { useSelector } from "react-redux";
import CourseShowInfo from "./CourseShowInfo";

function CellFilledToBeAdded({ course, position }) {
  const [infoIsOpen, setInfoIsOpen] = useState(false);

  const {
    data: departments,
    error,
    loading,
  } = useSelector((state) => state.departments);

  return (
    <td
      style={{
        backgroundColor: departments.find((e) => e.Id === course.Department.id)
          .Color,
        color: "white",
      }}
      onMouseEnter={() => setInfoIsOpen(true)}
      onMouseLeave={() => setInfoIsOpen(false)}
      rowSpan={course.count}
    >
      {infoIsOpen && (
        <CourseShowInfo
          courseId={course.Id}
          toBeAdded={true}
          courseToBeAdded={course}
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

export default CellFilledToBeAdded;
