import "./CSS/main.scss";
import Header from "./Components/Header/Header";
import Tools from "./Components/Tools/Tools";
import Sidebar from "./Components/Sidebar/Sidebar";
import Content from "./Components/Content/Content";
import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import {
  fetchClassrooms,
  fetchCourses,
  fetchDepartments,
  fetchFaculties,
  modal,
  setFaculty,
} from "./Redux/Actions/actions";
import Modal from "./Components/Modal/Modal";
import ProgramSelectorModal from "./Components/Sidebar/CreateProgram/ProgramSelectorModal";
import FacultyChooser from "./Components/FacultyChooser/FacultyChooser";

function App() {
  const dispatch = useDispatch();
  const modal = useSelector((state) => state.modal);
  const faculty = useSelector((state) => state.faculty);
  const facultyData = JSON.parse(sessionStorage.getItem("faculty"));
  useEffect(() => {
    /*if (facultyData !== null) {
      dispatch(setFaculty.set(facultyData.faculty));
    }*/

    sessionStorage.setItem("faculty", JSON.stringify({ faculty: 1 }));

    dispatch(fetchClassrooms());
    dispatch(fetchDepartments());
    dispatch(fetchCourses());
    dispatch(fetchFaculties());
  }, []);
  if (!facultyData) return <FacultyChooser />;
  return (
    <div className="app-wrapper">
      <div className="sidebar">
        <Sidebar />
      </div>
      <div className="app">
        {modal.isOpen && <Modal content={modal.content} title={modal.title} />}
        <Header />
        <Content />
      </div>

      <Toaster
        position="bottom-right"
        reverseOrder={false}
        toastOptions={{
          style: {
            fontSize: "1.6rem",
            fontFamily: '"Rubik", sans-serif',
          },
        }}
      />
    </div>
  );
}

export default App;
