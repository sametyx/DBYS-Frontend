import React, { useRef, useState } from "react";
import {
  faBook,
  faChevronLeft,
  faChevronRight,
  faCircleInfo,
  faInfo,
  faRepeat,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import toast from "react-hot-toast";
import LessonShowInfo from "./LessonShowInfo";
import { useDispatch, useSelector } from "react-redux";
import { setDraggingLesson } from "../../../Redux/Actions/actions";

function Lesson({ lesson }) {
  const dragImageRef = useRef(null);
  const [count, setCount] = useState(1);
  const [infoIsOpen, setInfoIsOpen] = useState(false);
  const creatingMode = useSelector((state) => state.creatingMode);
  const dispatch = useDispatch();

  const handleDragStart = (event) => {
    dispatch(setDraggingLesson.set({ ...lesson, count: count }));
    const dragImage = dragImageRef.current;
    if (dragImage) {
      event.dataTransfer.setDragImage(dragImage, 0, 0);
    }
  };

  return (
    <div
      className="lesson"
      draggable={creatingMode ? true : false}
      onDragStart={creatingMode ? handleDragStart : () => {}}
    >
      <div
        ref={dragImageRef}
        style={{
          position: "absolute",
          top: "-1000px", // Görünmez yap
          height: "50px",
          width: "50px",
          zIndex: "50",
          backgroundColor: "white",
          border: ".1rem solid black",
          textAlign: "center",
          lineHeight: "50px",
          fontSize: "2rem",
          color: "black",
        }}
      >
        {lesson.ShortName}
      </div>
      <FontAwesomeIcon
        icon={faInfo}
        className="info-icon"
        onMouseEnter={() => setInfoIsOpen(true)}
        onMouseLeave={() => setInfoIsOpen(false)}
      />
      {infoIsOpen && <LessonShowInfo lesson={lesson} />}
      <div className="lesson-wrapper">
        <FontAwesomeIcon icon={faBook} className="main-icon" />
        <h1>{lesson.ShortName}</h1>
        <div className="capacity-count">
          <div className="capacity">
            <FontAwesomeIcon icon={faUsers} />
            <span>{lesson.Capacity}</span>
          </div>
          <div className="count">
            <FontAwesomeIcon icon={faRepeat} />
            <span>{lesson.MaxCount}</span>
          </div>
        </div>
      </div>
      <div className="set-count">
        <div
          className="left-arrow arrow"
          onClick={() =>
            count > 1
              ? setCount(count - 1)
              : toast.error("Sayı 1'den küçük olamaz!")
          }
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </div>
        <span className="num">{count}</span>
        <div
          className="right-arrow arrow"
          onClick={() =>
            count < lesson.MaxCount
              ? setCount(count + 1)
              : toast.error(`Sayı dersin tekrarından fazla olamaz!`)
          }
        >
          <FontAwesomeIcon icon={faChevronRight} />
        </div>
      </div>
    </div>
  );
}

export default Lesson;
