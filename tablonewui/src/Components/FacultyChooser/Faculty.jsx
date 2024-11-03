import React from "react";
import { useDispatch } from "react-redux";
import { setFaculty } from "../../Redux/Actions/actions";

function Faculty({ faculty }) {
  const dispatch = useDispatch();
  const clickHandler = () => {
    dispatch(setFaculty.set({ id: faculty.Id, name: faculty.Name }));
  };
  return (
    <div className="card" onClick={clickHandler}>
      <img
        src="https://www.wsu.ac.za/images/2024/06/21/department-of-mechanical-engineering.jpg"
        alt=""
        className="card-image"
      />
      <h3 className="card-title">{faculty.Name}</h3>
    </div>
  );
}

export default Faculty;
