import React, {useEffect, useState} from 'react';
import Tools from "../../Tools";
import axios, {get} from "axios";
import api from "../../../apiURL";
import Select from "react-select";

function ClassroomsTr({classroom}) {
    const [isToolsOpen,setIsToolsOpen] = useState(false)
    const [isEditOpen,setIsEditOpen] = useState(false)
    const [isDeleteOpen,setIsDeleteOpen] = useState(false)
    const [faculties,setFaculties] = useState([])
    const [options,setOptions] = useState([])
    const [changes,setChanges] = useState({
        id:classroom.id,
        name: classroom.name,
        capacity:classroom.capacity,
        examCapacity:classroom.examCapacity,
        planUrl:classroom.planUrl,
        facultyId:classroom.facultyId
    })
    const section = {
        page:5,
        selectedElementID:classroom.id,
        changes:changes
    }
    const getAllFaculties = ()=> {
        axios.get(api.faculty.getAll)
            .then(res => {
                setFaculties(res.data);
                res.data.forEach(e=> setOptions(prevState => [...prevState,{value:e.id, label:e.shortName}]))
            })
    }

    useEffect(() => {
        getAllFaculties()
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
    const selectChangeHandler = (evt)=>{
        setChanges({
            ...changes,
            facultyId: evt.value
        })
    }
    return (
        <>
            <tr onMouseEnter={()=> setIsToolsOpen(true)} onMouseLeave={()=> !(isEditOpen||isDeleteOpen) ? setIsToolsOpen(false):""} className={isEditOpen ? "row-edit-open": isDeleteOpen ? "row-delete-open":""}>
                <td>{isEditOpen ? <input type="text" value={changes.name} className="input-sm" name="name"
                                         onChange={handleChange}></input> : <span>{classroom.name}</span>}</td>
                <td>{isEditOpen ? <input type="text" value={changes.capacity} className="input-sm" name="capacity"
                                         onChange={handleChange}></input> : <span>{classroom.capacity}</span>}</td>
                <td>{isEditOpen ? <input type="text" value={changes.examCapacity} className="input-sm" name="examCapacity"
                                         onChange={handleChange}></input> : <span>{classroom.examCapacity}</span>}</td>
                <td>{isEditOpen ? <Select options={options} defaultValue={{value:classroom.facultyId,label:classroom.facultyShortName}} onChange={selectChangeHandler}/>: <span>{classroom.facultyShortName}</span>}</td>
                <td>{classroom.planUrl}</td>
            </tr>
            <Tools isToolsOpen={isToolsOpen} setIsToolsOpen={setIsToolsOpen} isEditOpen={isEditOpen}
                   isDeleteOpen={isDeleteOpen} setIsEditOpen={setIsEditOpen} setIsDeleteOpen={setIsDeleteOpen} section={section}/>
        </>
    );
}

export default ClassroomsTr;