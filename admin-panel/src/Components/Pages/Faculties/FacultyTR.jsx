import React, {useState} from 'react';
import FacultyTableTools from "./FacultyTableTools";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPen, faXmark} from "@fortawesome/free-solid-svg-icons";
import Toggle from 'react-toggle'
import toast from "react-hot-toast";
import Tools from "../../Tools";

function FacultyTr({faculty}) {
    const [isToolsOpen,setIsToolsOpen] = useState(false)
    const [isEditOpen,setIsEditOpen] = useState(false)
    const [isDeleteOpen,setIsDeleteOpen] = useState(false)

    const [changes,setChanges] = useState({
        name: faculty.name,
        shortName:faculty.shortName,
        isActive: faculty.isActive
    })

    const section = {
        page:0,
        selectedElementID:faculty.id,
        changes:changes
    }

    const handleChange = evt => {
        const name = evt.target.name;
        const value =
            evt.target.type === "checkbox" ? evt.target.checked : evt.target.value;
        setChanges({
            ...changes,
            [name]: value
        })
    }

    return (
        <>
            <tr onMouseEnter={()=> setIsToolsOpen(true)} onMouseLeave={()=> !(isEditOpen||isDeleteOpen) ? setIsToolsOpen(false):""} className={isEditOpen ? "row-edit-open": isDeleteOpen ? "row-delete-open":""}>
                <td>
                    {isEditOpen ? <input type="text" value={changes.shortName} className="input-sm" name="shortName" onChange={handleChange}></input>: <span>{faculty.shortName}</span>}
                </td>
                <td>{isEditOpen ? <input type="text" value={changes.name} className="input-sm" name="name" onChange={handleChange}></input>: <span>{faculty.name}</span>}</td>
                <td>
                    {isEditOpen ? <Toggle defaultChecked={changes.isActive}/> : faculty.isActive ? (<label className="active">AKTIF</label>) : (
                        <label className="passive">PASIF</label>)}
                    {}
                </td>
            </tr>
            <Tools isToolsOpen={isToolsOpen} setIsToolsOpen={setIsToolsOpen} isEditOpen={isEditOpen} isDeleteOpen={isDeleteOpen} setIsEditOpen={setIsEditOpen} setIsDeleteOpen={setIsDeleteOpen} section={section}/>

        </>

    );
}

export default FacultyTr;