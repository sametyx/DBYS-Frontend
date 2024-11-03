import React, {useEffect, useState} from 'react';
import Tools from "../../Tools";
import Select from "react-select";
import axios from "axios";
import api from "../../../apiURL";

function DepartmentsTr({department}) {
    const [isToolsOpen,setIsToolsOpen] = useState(false)
    const [isEditOpen,setIsEditOpen] = useState(false)
    const [isDeleteOpen,setIsDeleteOpen] = useState(false)
    const [faculties,setFaculties] = useState([])
    const [options,setOptions] = useState([])
    const [changes,setChanges] = useState({
        id:department.id,
        name: department.name,
        shortName:department.shortName,
        color: department.color,
        facultyId: department.facultyId
    })

    const section = {
        page:3,
        selectedElementID:department.id,
        changes:changes
    }

    const getAllFaculties = ()=> {
        axios.get(api.faculty.getAll)
            .then(res => {
                setFaculties(res.data);
                res.data.forEach(e=> setOptions(prevState => [...prevState,{value:e.id, label:e.name}]))
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
                <td>{isEditOpen ? <Select options={options} defaultValue={{value:department.facultyId,label:department.facultyShortName}} onChange={selectChangeHandler}/>: <span>{department.facultyShortName}</span>}</td>
                <td>{isEditOpen ? <input type="text" value={changes.name} className="input-sm" name="name" onChange={handleChange}></input>: <span>{department.name}</span>}</td>
                <td>{isEditOpen ? <input type="text" value={changes.shortName} className="input-sm" name="shortName" onChange={handleChange}></input>: <span>{department.shortName}</span>}</td>
                {isEditOpen ? <td><input type="color" value={changes.color} onChange={handleChange} name="color"/></td> :
                    <td className="table-cell-color" style={{backgroundColor: department.color, border: ".1rem solid black"}}></td>}
            </tr>
            <Tools isToolsOpen={isToolsOpen} setIsToolsOpen={setIsToolsOpen} isEditOpen={isEditOpen} isDeleteOpen={isDeleteOpen} setIsEditOpen={setIsEditOpen} setIsDeleteOpen={setIsDeleteOpen} section={section}/>
        </>
    );
}

export default DepartmentsTr;