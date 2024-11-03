import React from "react";

function ClassroomShowInfo({ classroom }) {
  return (
    <div className="classroom-info show-info">
      <span className="name">{classroom.Name}</span>
      <div className="info">
        <table style={{ fontSize: "1.4rem" }}>
          <thead>
            <tr>
              <th></th>
              <th>Sınıf</th>
              <th>Sınav</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Kapasite</td>
              <td>{classroom.Capacity}</td>
              <td>{classroom.ExamCapacity}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ClassroomShowInfo;
