import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  history,
  setProgramsToBeAdded,
} from "../../../../Redux/Actions/actions";
import toast from "react-hot-toast";

function CellEmpty({ position }) {
  const tdRef = useRef(null);
  const [isOver, setIsOver] = useState(false);
  const dispatch = useDispatch();
  const draggingLesson = useSelector((state) => state.draggingLesson);

  const handleDrop = (event) => {
    event.preventDefault();
    const joinedData = { ...draggingLesson, position };
    dispatch(setProgramsToBeAdded.add(joinedData)).then((intersection) => {
      if (intersection) {
        toast.error("Hata! Dersler çakışıyor.");
        tdRef.current.rowSpan = 1;
      } else {
        toast.success("Ders tabloya işlendi.");
      }
    });
    setIsOver(false);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setIsOver(true);
    tdRef.current.rowSpan = draggingLesson.count;
  };

  const handleDragLeave = () => {
    setIsOver(false);
    tdRef.current.rowSpan = 1;
  };

  return (
    <td
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      style={{
        backgroundColor: isOver && "#27ea00",
      }}
      ref={tdRef}
    ></td>
  );
}

export default CellEmpty;
