import React, { useEffect } from "react";
import CellEmpty from "./CellEmpty";
import { useDispatch, useSelector } from "react-redux";
import { fetchClassrooms } from "../../../../Redux/Actions/actions";
import CellFilled from "./CellFilled";
import CellFilledToBeAdded from "./CellFilledToBeAdded";
import CellFilledToBeEdited from "./CellFilledToBeEdited";
import CellFiltered from "./CellFiltered";

function TRow({ hour, day }) {
  const {
    data: Classrooms,
    error,
    loading,
  } = useSelector((state) => state.classrooms);
  const { data: courses } = useSelector((state) => state.courses);
  const filters = useSelector((state) => state.filters);
  const { data: courseProgram } = useSelector(
    (state) => state.courseProgramAndToBePrograms.courseProgram,
  );
  const filteredClassrooms = Classrooms.filter(
    (e) => !filters.classrooms.includes(e.Id),
  );

  const programsToBeAdded = useSelector(
    (state) => state.courseProgramAndToBePrograms.programsToBeAdded,
  );
  const programsToBeEdited = useSelector(
    (state) => state.courseProgramAndToBePrograms.programsToBeEdited,
  );

  const check = (classroom) => {
    if (courseProgram.coursePositions)
      for (let i = 0; i < courseProgram.coursePositions.length; i++) {
        if (
          courseProgram.coursePositions[i].day === day.id &&
          courseProgram.coursePositions[i].hour === hour.id &&
          courseProgram.coursePositions[i].classRoomId === classroom.Id
        ) {
          return courseProgram.coursePositions[i];
        }
      }
  };

  const checkProgramsToBeAdded = (classroom) => {
    for (let i = 0; i < programsToBeAdded.length; i++) {
      if (
        programsToBeAdded[i].position.day === day.id &&
        programsToBeAdded[i].position.hour === hour.id &&
        programsToBeAdded[i].position.classroom === classroom.Id
      ) {
        return programsToBeAdded[i];
      }
    }
  };
  const checkProgramsToBeEdited = (classroom) => {
    for (let i = 0; i < programsToBeEdited.length; i++) {
      if (
        programsToBeEdited[i].next.position.day === day.id &&
        programsToBeEdited[i].next.position.hour === hour.id &&
        programsToBeEdited[i].next.position.classroom === classroom.Id
      ) {
        return programsToBeEdited[i].next;
      }
    }
  };

  const checkSpan = (classroom) => {
    let countArr = [];
    if (courseProgram.coursePositions)
      for (let i = 0; i < courseProgram.coursePositions.length; i++) {
        if (
          courseProgram.coursePositions[i].day === day.id &&
          courseProgram.coursePositions[i].classRoomId === classroom.Id
        ) {
          for (let j = 1; j < courseProgram.coursePositions[i].count; j++) {
            countArr.push(courseProgram.coursePositions[i].hour + j);
          }
        }
      }
    if (countArr.includes(hour.id)) return false;
    else return true;
  };

  const applyFilters = (course) => {
    if (
      filters.teachers.includes(
        courses.find((e) => e.Id === course.courseId)?.TeacherId,
      ) ||
      filters.departments.includes(course.departmentId) ||
      filters.courses.includes(course.courseId)
    )
      return false;
    else return true;
  };

  return (
    <tr>
      <td className="hour">
        {hour.fullHour +
          " - " +
          (parseInt(hour.firstPart) + 1) +
          "." +
          hour.secondPart}
      </td>
      {filteredClassrooms.map((classroom, index) => {
        const position = {
          day: day.id,
          hour: hour.id,
          classroom: classroom.Id,
        };
        let checked;
        if ((checked = check(classroom))) {
          if (applyFilters(checked))
            return (
              <CellFilled
                course={checked}
                key={checked.Id}
                position={position}
              />
            );
          else return <CellFiltered course={checked} />;
        } else if ((checked = checkProgramsToBeAdded(classroom))) {
          return <CellFilledToBeAdded course={checked} position={position} />;
        } else if ((checked = checkProgramsToBeEdited(classroom))) {
          return <CellFilledToBeEdited course={checked} position={position} />;
        } else {
          if (checkSpan(classroom)) return <CellEmpty position={position} />;
        }
      })}
    </tr>
  );
}

export default TRow;
