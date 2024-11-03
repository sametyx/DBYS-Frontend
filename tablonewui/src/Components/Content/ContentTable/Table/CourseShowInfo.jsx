import React, { useEffect, useState } from "react";
import api from "../../../../Datas/APIs";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import Hours from "../../../../Datas/Hours";
import Days from "../../../../Datas/Days";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPencil,
  faRotateLeft,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import {
  creatingMode,
  setProgramsToBeAdded,
  history,
  removeProgramFromPrograms,
  setProgramsToBeRemoved,
  setProgramsToBeEdited,
} from "../../../../Redux/Actions/actions";
import toast from "react-hot-toast";

function CourseShowInfo({
  courseId,
  setLoaded,
  load,
  toBeAdded,
  courseToBeAdded,
  position,
  courseToBeEdited,
  toBeEdited,
}) {
  const { data: classrooms } = useSelector((state) => state.classrooms);
  const { data: courses } = useSelector(
    (state) => state.courseProgramAndToBePrograms.courseProgram,
  );
  const creatingMode = useSelector((state) => state.creatingMode);
  const dispatch = useDispatch();
  const {
    isLoading,
    error,
    data: courseInfo,
  } = useQuery({
    queryKey: ["courseInfo", courseId],
    queryFn: () =>
      axios.get(api.course.getOneInfo(courseId)).then((res) => res.data),
  });

  const removeClickHandler = () => {
    const toBeRemoved = courses.coursePositions.find((e) => e.id === courseId);
    dispatch(setProgramsToBeRemoved.add(toBeRemoved));
    toast.success("Ders silindi");
  };

  const toBeAddedRemoveClickHandler = () => {
    dispatch(setProgramsToBeAdded.remove(courseToBeAdded, position));
    toast.success("İşlenmemiş ders kaldırıldı.");
  };
  const toBeEditedRemoveClickHandler = () => {
    dispatch(setProgramsToBeEdited.remove(courseToBeEdited));
    toast.success("Düzenleme geri alındı.");
  };

  const editClickHandler = () => {};

  if (isLoading) return <div className="show-info">Loading...</div>;
  if (error) return <div className="show-info">Error loading data</div>;
  if (!courseInfo || !courseInfo.course)
    return <div className="show-info">No course information available</div>;

  if (toBeEdited) {
    return (
      <div className="course-show-info show-info" style={{ color: "black" }}>
        <div className="position">
          <span>
            <b>Gün:</b>{" "}
            {
              Days.find((e) => e.id === courseToBeEdited.position.day)
                .dayTurkish
            }
          </span>
          <span>
            <b>Saat:</b>{" "}
            {
              Hours.find((e) => e.id === courseToBeEdited.position.hour)
                .fullHour
            }
          </span>
          <span>
            <b>Sınıf:</b>{" "}
            {
              classrooms.find(
                (e) => e.Id === courseToBeEdited.position.classroom,
              ).Name
            }
          </span>
          <span>
            <b>Hafta:</b> 0.Hafta
          </span>
        </div>
        <div className="general">
          <span>
            <b>Ders Adı:</b> {courseInfo.course.name}
          </span>
          <span>
            <b>Bölüm:</b> {courseInfo.course.department.name}
          </span>
          <span>
            <b>Dersi Alan:</b> {courseInfo.course.capacity}
          </span>
          <span>
            <b>Eğitmen:</b> {courseInfo.course.teacher.name}
          </span>
        </div>
        <div className="tools-showinfo">
          <div className="tool" onClick={toBeEditedRemoveClickHandler}>
            <FontAwesomeIcon icon={faRotateLeft} className="icon" />
            <span className="tool-name">Düzenlemeyi Geri Al</span>
          </div>
        </div>
        <div className="alert">
          <span>Bu ders henüz ders programına işlenmemiştir.</span>
        </div>
      </div>
    );
  }

  if (toBeAdded) {
    return (
      <div className="course-show-info show-info" style={{ color: "black" }}>
        <div className="position">
          <span>
            <b>Gün:</b>{" "}
            {Days.find((e) => e.id === courseToBeAdded.position.day).dayTurkish}
          </span>
          <span>
            <b>Saat:</b>{" "}
            {Hours.find((e) => e.id === courseToBeAdded.position.hour).fullHour}
          </span>
          <span>
            <b>Sınıf:</b>{" "}
            {
              classrooms.find(
                (e) => e.Id === courseToBeAdded.position.classroom,
              ).Name
            }
          </span>
          <span>
            <b>Hafta:</b> 0.Hafta
          </span>
        </div>
        <div className="general">
          <span>
            <b>Ders Adı:</b> {courseInfo.course.name}
          </span>
          <span>
            <b>Bölüm:</b> {courseInfo.course.department.name}
          </span>
          <span>
            <b>Dersi Alan:</b> {courseInfo.course.capacity}
          </span>
          <span>
            <b>Eğitmen:</b> {courseInfo.course.teacher.name}
          </span>
        </div>
        <div className="tools-showinfo">
          <div className="tool" onClick={toBeAddedRemoveClickHandler}>
            <FontAwesomeIcon icon={faTrash} className="icon" />
            <span className="tool-name" onClick={toBeAddedRemoveClickHandler}>
              Kaldır
            </span>
          </div>
        </div>
        <div className="alert">
          <span>Bu ders henüz ders programına işlenmemiştir.</span>
        </div>
      </div>
    );
  }
  return (
    <div
      className="course-show-info show-info"
      style={{
        color: "black",
        gridTemplateRows: creatingMode ? "1fr 2fr 1fr" : "1fr 2fr",
      }}
    >
      <div className="position">
        <span>
          <b>Gün:</b> {Days.find((e) => e.id === courseInfo.day).dayTurkish}
        </span>
        <span>
          <b>Saat:</b> {Hours.find((e) => e.id === courseInfo.hour).fullHour}
        </span>
        <span>
          <b>Sınıf:</b> {courseInfo.classRoom.name}
        </span>
        <span>
          <b>Hafta:</b> 0.Hafta
        </span>
      </div>
      <div className="general">
        <span>
          <b>Ders Adı:</b> {courseInfo.course.name}
        </span>
        <span>
          <b>Bölüm:</b> {courseInfo.course.department.name}
        </span>
        <span>
          <b>Dersi Alan:</b> {courseInfo.course.capacity}
        </span>
        <span>
          <b>Eğitmen:</b> {courseInfo.course.teacher.name}
        </span>
      </div>
      {creatingMode && (
        <div className="tools-showinfo">
          <div className="tool" onClick={removeClickHandler}>
            <FontAwesomeIcon icon={faTrash} className="icon" />
            <span className="tool-name">Kaldır</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default CourseShowInfo;
