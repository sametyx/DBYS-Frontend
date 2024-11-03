import React, {useEffect, useState} from 'react';
import profile from "../../../Images/unknown-profile.jpeg";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPen, faXmark} from "@fortawesome/free-solid-svg-icons";
import toast from "react-hot-toast";
import Tools from "../../Tools";
import Toggle from "react-toggle";
import Select from "react-select";
import axios, {get} from "axios";
import api from "../../../apiURL";

function LessonsTr({lesson}) {
    const [teacherOptions,setTeacherOptions] = useState([])
    const [departmentOptions,setDepartmentOptions] = useState([])
    const [teachers,setTeachers] = useState([])
    const [departments,setDepartments] = useState([])
    const [isToolsOpen,setIsToolsOpen] = useState(false)
    const [isEditOpen,setIsEditOpen] = useState(false)
    const [isDeleteOpen,setIsDeleteOpen] = useState(false)


    const [changes,setChanges] = useState({
        id:lesson.id,
        name: lesson.name,
        shortName:lesson.shortName,
        capacity:lesson.capacity,
        teacherId:lesson.teacherId,
        departmentId:lesson.departmentId
    })



    const section = {
        page:1,
        selectedElementID:lesson.id,
        changes:changes
    }

    const getAllTeachers= ()=>{
        axios.get(api.teacher.getAll)
            .then(res=> {
                setTeachers(res.data);
                res.data.forEach(e=> setTeacherOptions(prevState => [...prevState,{value:e.id, label:e.name}]))
            })
    }
    const getAllDepartment= ()=>{
        axios.get(api.department.getAll)
            .then(res=> {
                setDepartments(res.data);
                res.data.forEach(e=> setDepartmentOptions(prevState => [...prevState,{value:e.id, label:e.name}]))
            })
    }

    useEffect(() => {
        getAllTeachers();
        getAllDepartment()
    }, []);

    const handleChange = evt => {
        const name = evt.target.name;
        const value =
            evt.target.type === "checkbox" ? evt.target.checked : evt.target.value;
        setChanges({
            ...changes,
            [name]: value
        })
    }

    const selectTeacherHandler = (evt)=>{
        setChanges({
            ...changes,
            teacherId: evt.value
        })
    }

    const selectDepartmentHandler = (evt)=>{
        setChanges({
            ...changes,
            departmentId: evt.value
        })
    }

    return (
        <>
            <tr onMouseEnter={()=> setIsToolsOpen(true)} onMouseLeave={()=> !(isEditOpen||isDeleteOpen) ? setIsToolsOpen(false):""} className={isEditOpen ? "row-edit-open": isDeleteOpen ? "row-delete-open":""}>
                <td>{isEditOpen ? <input type="text" value={changes.name} className="input-sm" name="name" onChange={handleChange}></input>: <span>{lesson.name}</span>}</td>
                <td>{isEditOpen ? <input type="text" value={changes.shortName} className="input-sm" name="shortName" onChange={handleChange}></input>: <span>{lesson.shortName}</span>}</td>
                <td>{isEditOpen ? <input type="number" value={changes.capacity} className="input-sm" name="capacity" onChange={handleChange}></input>: <span>{lesson.capacity}</span>}</td>
                <td className="table-teacher">
                    {isEditOpen ? <Select options={teacherOptions} className="react-select-container" defaultValue={{value: lesson.teacherId,label: lesson.teacherName}} onChange={selectTeacherHandler}/> : (
                            <div className="table-teacher-wrapper">
                                <img src={profile} alt=""/>
                                <span>{lesson.teacherName}</span>
                            </div>
                    )}
                </td>
                <td>
                    {isEditOpen ? <Select options={departmentOptions} className="react-select-container" defaultValue={{value: lesson.departmentId,label: lesson.departmentName}} onChange={selectDepartmentHandler}/> : (
                            <span>{lesson.departmentName}</span>
                    )}
                </td>
            </tr>
            <Tools isToolsOpen={isToolsOpen} setIsToolsOpen={setIsToolsOpen} isEditOpen={isEditOpen} isDeleteOpen={isDeleteOpen} setIsEditOpen={setIsEditOpen} setIsDeleteOpen={setIsDeleteOpen} section={section}/>

        </>
    );
}

export default LessonsTr;