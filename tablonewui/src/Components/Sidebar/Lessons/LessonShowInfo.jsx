import React from "react";

function LessonShowInfo({ lesson }) {
  return (
    <div className="lesson-show-info show-info">
      <div className="info">
        <b>Ders Adı:</b>
        <span>{lesson.Name}</span>
      </div>
      <div className="info">
        <b>Dersi Alan:</b>
        <span>{lesson.Capacity}</span>
      </div>
      <div className="info">
        <b>Dersin Eğitmeni:</b>
        <span>{lesson.Teacher.name}</span>
      </div>
      <div className="info">
        <b>Dersin Bölümü:</b>
        <span>{lesson.Department.name}</span>
      </div>
      <div className="info">
        <b>Dersin Maximum Tekrar Sayısı:</b>
        <span>{lesson.MaxCount}</span>
      </div>
    </div>
  );
}

export default LessonShowInfo;
