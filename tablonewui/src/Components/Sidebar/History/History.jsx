import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Days from "../../../Datas/Days";
import Hours from "../../../Datas/Hours";
import { faRotateLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  addProgramToPrograms,
  history,
  setProgramsToBeAdded,
  setProgramsToBeEdited,
} from "../../../Redux/Actions/actions";
import toast from "react-hot-toast";

function History() {
  const histories = useSelector((state) => state.history);
  const { data: classrooms } = useSelector((state) => state.classrooms);
  const { data: departments } = useSelector((state) => state.departments);
  const dispatch = useDispatch();

  const undoClickHandler = (program) => {
    const { operation, type, ...rest } = program;
    if (program.type === 0) {
      dispatch(addProgramToPrograms(rest)).then((intersection) => {
        if (!intersection) {
          toast.success("İşlem geri alındı.");
        } else {
          toast.error("Bu dersin yerinde başka bir ders var.");
        }
      });
    } else if (program.type === 2) {
      dispatch(setProgramsToBeEdited.remove(rest));
    } else {
      dispatch(setProgramsToBeAdded.remove(rest));
      toast.success("İşlem geri alındı.");
    }
  };

  return (
    <div className="history">
      <ul className="processes">
        {histories.reverse().map((history) => {
          const color =
            history.operation === 0
              ? departments.find((e) => e.Id === history.departmentId).Color
              : history.operation === 2
              ? departments.find((e) => e.Id === history.prev.departmentId)
                  .Color
              : history.Department.color;
          const position =
            history.operation === 0
              ? {
                  day: history.day,
                  hour: history.hour,
                  classroom: history.classRoomId,
                }
              : history.operation === 2
              ? {
                  day: history.prev.day,
                  hour: history.prev.hour,
                  classroom: history.prev.classRoomId,
                }
              : history.position;
          const courseName =
            history.operation === 0
              ? history.courseShortName
              : history.operation === 2
              ? history.prev.courseShortName
              : history.ShortName;
          return (
            <li className="process">
              <div className="intro">
                <label
                  style={{
                    backgroundColor:
                      history.operation === 0
                        ? "#eb3434"
                        : history.operation === 1
                        ? "#6eeb34"
                        : "#ebb434",
                  }}
                ></label>
                <div className="info">
                  <span>
                    <b
                      style={{
                        backgroundColor: color,
                      }}
                    >
                      {courseName}
                    </b>
                    {history.next && (
                      <span>
                        {" "}
                        ->{" "}
                        <b
                          style={{
                            backgroundColor: history.next.Department.color,
                          }}
                        >
                          {history.next.ShortName}
                        </b>
                      </span>
                    )}
                  </span>
                  <span className="operation">
                    {" "}
                    {history.operation === 0
                      ? "Silme"
                      : history.operation === 1
                      ? "Ekleme"
                      : "Düzenleme"}
                  </span>
                </div>
              </div>
              <div className="position">
                <div className="position-day">
                  {Days.find((e) => e.id === position.day).dayTurkish}
                </div>
                <div className="position-hour">
                  {Hours.find((e) => e.id === position.hour).fullHour}
                </div>
                <div className="position-classroom">
                  {classrooms.find((e) => e.Id === position.classroom).Name}
                </div>
              </div>
              <div className="process-tools">
                <div
                  className="tool undo"
                  onClick={() => undoClickHandler(history)}
                >
                  <FontAwesomeIcon icon={faRotateLeft} />
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default History;
