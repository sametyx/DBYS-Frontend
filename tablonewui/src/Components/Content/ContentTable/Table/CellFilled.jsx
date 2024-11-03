import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CourseShowInfo from "./CourseShowInfo";
import {
  setProgramsToBeAdded,
  setProgramsToBeEdited,
} from "../../../../Redux/Actions/actions";
import toast from "react-hot-toast";

function CellFilled({ course, position }) {
  const [infoIsOpen, setInfoIsOpen] = useState(false);
  const draggingLesson = useSelector((state) => state.draggingLesson);
  const dispatch = useDispatch();
  const [isOver, setIsOver] = useState(false);

  const {
    data: departments,
    error,
    loading,
  } = useSelector((state) => state.departments);

  const handleDrop = (event) => {
    event.preventDefault();
    const joinedData = { ...draggingLesson, position };
    dispatch(setProgramsToBeEdited.add(course, joinedData)).then(
      (intersection) => {
        if (intersection) {
          toast.error("Hata! Dersler çakışıyor.");
        } else {
          toast.success("Ders tabloya işlendi.");
        }
      },
    );
    setIsOver(false);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setIsOver(true);
  };

  const handleDragLeave = () => {
    setIsOver(false);
  };

  if (loading) return <td></td>;

  return (
    <td
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      style={{
        backgroundColor: departments.find((e) => e.Id === course.departmentId)
          .Color,
        color: "white",
      }}
      onMouseEnter={() => setInfoIsOpen(true)}
      onMouseLeave={() => setInfoIsOpen(false)}
      rowSpan={course.count}
    >
      {infoIsOpen && <CourseShowInfo courseId={course.id} />}
      <span
        className="name"
        style={{ fontWeight: 700, letterSpacing: ".2rem" }}
      >
        {course.courseShortName}
      </span>
    </td>
  );
}

export default CellFilled;
