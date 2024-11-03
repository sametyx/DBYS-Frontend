import React, {useEffect, useState} from 'react';
import profile from "../../../Images/unknown-profile.jpeg";
import Tools from "../../Tools";
import Select from "react-select";
import axios from "axios";
import api from "../../../apiURL";

function TeachersTr({teacher}) {
    const [isToolsOpen,setIsToolsOpen] = useState(false)
    const [isEditOpen,setIsEditOpen] = useState(false)
    const [isDeleteOpen,setIsDeleteOpen] = useState(false)
    const [ranks,setRanks] = useState([])
    const [faculties,setFaculties] = useState([])
    const [rankOptions,setRankOptions] = useState([])
    const [facultyOptions,setFacultyOptions] = useState([])

    const [changes,setChanges] = useState({
        id:teacher.id,
        rankId: teacher.rankId,
        name: teacher.name,
        shortName: teacher.shortName,
        facultyId: teacher.facultyId
    })

    const section = {
        page:2,
        selectedElementID:teacher.id,
        changes:changes
    }

    const getAllRanks= ()=>{
        axios.get(api.rank.getAll)
            .then(res=> {
                setRanks(res.data);
                res.data.forEach(e=> setRankOptions(prevState => [...prevState,{value:e.id, label:e.shortName}]))
            })
    }
    const getAllFaculties= ()=>{
        axios.get(api.faculty.getAll)
            .then(res=> {
                setFaculties(res.data);
                res.data.forEach(e=> setFacultyOptions(prevState => [...prevState,{value:e.id, label:e.name}]))
            })
    }

    useEffect(() => {
        getAllFaculties()
        getAllRanks()
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
    const selectRankChangeHandler = (evt)=>{
        setChanges({
            ...changes,
            rankId: evt.value
        })
    }
    const selectFacultyChangeHandler = (evt)=>{
        setChanges({
            ...changes,
            facultyId: evt.value
        })
    }

    return (
        <>
            <tr onMouseEnter={()=> setIsToolsOpen(true)} onMouseLeave={()=> !(isEditOpen||isDeleteOpen) ? setIsToolsOpen(false):""} className={isEditOpen ? "row-edit-open": isDeleteOpen ? "row-delete-open":""}>
                <td>{isEditOpen ? <Select options={rankOptions} className="react-select-container" defaultValue={{value:teacher.rankId,label:teacher.shortRank}} onChange={selectRankChangeHandler}/>: <span>{teacher.shortRank}</span>}</td>
                <td className="table-teacher">
                    <div className="table-teacher-wrapper">
                        <img src={profile} alt=""/>
                        {isEditOpen ? <input type="text" value={changes.name} className="input-sm" name="name" onChange={handleChange}></input> : <span>{teacher.name}</span> }
                    </div>
                </td>
                <td>{isEditOpen ? <input type="text" value={changes.shortName} className="input-sm" name="shortName"
                                         onChange={handleChange}></input> : <span>{teacher.shortName}</span>}</td>
                <td>{isEditOpen ? <Select options={facultyOptions} className="react-select-container" defaultValue={{value:teacher.facultyId,label:teacher.facultyName}} onChange={selectFacultyChangeHandler}/>: <span>{teacher.facultyName}</span>}</td>
            </tr>
            <Tools isToolsOpen={isToolsOpen} setIsToolsOpen={setIsToolsOpen} isEditOpen={isEditOpen} isDeleteOpen={isDeleteOpen} setIsEditOpen={setIsEditOpen} setIsDeleteOpen={setIsDeleteOpen} section={section}/>
        </>
    );
}

export default TeachersTr;