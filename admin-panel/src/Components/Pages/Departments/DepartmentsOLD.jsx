import React, {useEffect, useState} from 'react';
import Select from "react-select";
import axios from "axios";
import apiURL from "../../../apiURL";
import DepartmentsTR from "./DepartmentsTR";
import api from "../../../apiURL";
import toast from "react-hot-toast";

function Departments() {
    const [departments,setDepartments] = useState([])
    const [faculties,setFaculties] = useState([])
    const [options,setOptions] = useState([])
    const [newObject,setNewObject] = useState({
        facultyId:undefined,
        name:"",
        shortName:"",
        color:"#000000"
    })

    const getAllDepartments= ()=>{
        axios.get(api.department.getAll)
            .then(res=> {
                setDepartments(res.data);
            })
    }
    const getAllFaculties = ()=> {
        axios.get(api.faculty.getAll)
            .then(res => {
                setFaculties(res.data);
                res.data.forEach(e=> setOptions(prevState => [...prevState,{value:e.id, label:e.name}]))
            })
    }

    useEffect(() => {
        getAllDepartments()
        getAllFaculties()
    }, []);
    const handleChange = evt => {
        const name = evt.target.name;
        const value =
            evt.target.type === "checkbox" ? evt.target.checked : evt.target.value;
        setNewObject({
            ...newObject,
            [name]: value
        })
    }
    const selectChangeHandler = (evt)=>{
        setNewObject({
            ...newObject,
            facultyId: evt.value
        })
    }

    const addHandle = ()=>{
        if(newObject.name===""||newObject.shortName===""||newObject.color===""||newObject.facultyId===undefined){
            toast.error("Herhangi bir alan bos birakilamaz!");
        }else{
            axios.post(api.department.add,newObject)
            toast.success("Basariyla eklendi!")
        }

    }

    return (
        <div className="departments">
            <h1 className="title title-xlg">
                Bölümler
                <hr/>
            </h1>
            <div className="departments-wrapper">
                <div className="add-table container">
                    <div className="add">
                        <h2 className="title title-lg">Bölüm Ekle</h2>
                        <form onSubmit={(event)=>event.preventDefault()}>
                            <div className="input-group">
                                <span className="title title-sm">Fakülte</span>
                                <Select options={options} className="react-select-container" onChange={selectChangeHandler}/>
                            </div>
                            <div className="input-group">
                                <span className="title title-sm">Bölüm Adi</span>
                                <input type="text" name="name" value={newObject.name} onChange={handleChange}/>
                            </div>
                            <div className="input-group">
                                <span className="title title-sm">Kisa Ad</span>
                                <input type="text" name="shortName" value={newObject.shortName} onChange={handleChange}/>
                            </div>
                            <div className="input-group">
                                <span className="title title-sm">Renk</span>
                                <input type="color" name="color" value={newObject.color} onChange={handleChange}/>
                            </div>
                            <button className="btn btn-md btn-blue" onClick={addHandle}>Ekle</button>
                        </form>
                    </div>
                </div>
                <div className="departments-table container">
                    <div className="departments-table-wrapper">
                        <h2 className="title title-lg">Bölümler</h2>
                        <table>
                            <tr>
                                <th>Fakülte</th>
                                <th>Adi</th>
                                <th>Kisa Ad</th>
                                <th>Renk</th>
                            </tr>
                            {departments.map((department)=> <DepartmentsTR department={department}/>)}
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Departments;