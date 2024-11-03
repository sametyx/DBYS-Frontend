import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import Days from "../../../Datas/Days";
import Day from "./Day";
import { useDispatch, useSelector } from "react-redux";
import { fetchCourseProgram } from "../../../Redux/Actions/actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarXmark,
  faSpinner,
  faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";

function ContentTable({ selectedDays }) {
  const week = useSelector((state) => state.week);
  const { data: courses, loading } = useSelector(
    (state) => state.courseProgramAndToBePrograms.courseProgram,
  );

  const creatingMode = useSelector((state) => state.creatingMode);
  const dispatch = useDispatch();

  const [maxHeight, setMaxHeight] = useState("none"); // maxHeight için state
  const contentRef = useRef(null);

  useEffect(() => {
    if (contentRef.current) {
      const visibleHeight = contentRef.current.getBoundingClientRect().height;
      setMaxHeight(`${visibleHeight}px`); // maxHeight state'ini güncelle
      console.log(visibleHeight);
    }
  }, [selectedDays]); // Boş bağımlılık dizisi ile sadece ilk render sonrası çalışır.

  useEffect(() => {
    dispatch(fetchCourseProgram(week.readable));
  }, [week]);

  if (loading)
    return (
      <div className="warning">
        <FontAwesomeIcon icon={faSpinner} className="icon" />
        Ders Programı yükleniyor...
      </div>
    );
  if (!creatingMode && !courses.coursePositions?.length) {
    return (
      <div className="warning">
        <FontAwesomeIcon icon={faTriangleExclamation} className="icon" />
        Bu tarihe ait bir ders programı bulunamadı.
      </div>
    );
  }
  if (!selectedDays.length) {
    return (
      <div className="warning">
        <FontAwesomeIcon icon={faCalendarXmark} className="icon" />
        Herhangi bir gün seçili değil.
      </div>
    );
  }

  return (
    <div
      className="content-table"
      style={{
        maxHeight: maxHeight,
        transition: "height 0.3s ease",
        fontSize: "50% !important",
      }}
      ref={contentRef}
    >
      {selectedDays
        .sort((a, b) => a.id - b.id)
        .map((day) => (
          <Day day={day} key={day.id} />
        ))}
    </div>
  );
}

export default ContentTable;
