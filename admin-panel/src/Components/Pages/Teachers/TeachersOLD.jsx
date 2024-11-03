import React, {useEffect, useState} from 'react';
import Select from "react-select";
import profile from "../../../Images/unknown-profile.jpeg"
import TeachersTR from "./TeachersTR";
import axios, {get} from "axios";
import api from "../../../apiURL";
import toast from "react-hot-toast";

function Teachers() {
    const [teachers,setTeachers] = useState([])
    const [ranks,setRanks] = useState([])
    const [faculties,setFaculties] = useState([])
    const [rankOptions,setRankOptions] = useState([])
    const [facultyOptions,setFacultyOptions] = useState([])

    const getAllTeachers= ()=>{
        axios.get(api.teacher.getAll)
            .then(res=> {
                setTeachers(res.data);
            })
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
        getAllTeachers()
        getAllRanks()
        getAllFaculties()
    }, []);

    const [newObject,setNewObject] = useState({
        rankId: undefined,
        name:"",
        shortName:"",
        facultyId: undefined
    })

    const handleChange = evt => {
        const name = evt.target.name;
        const value =
            evt.target.type === "checkbox" ? evt.target.checked : evt.target.value;
        setNewObject({
            ...newObject,
            [name]: value
        })
    }
    const selectRankChangeHandler = (evt)=>{
        setNewObject({
            ...newObject,
            rankId: evt.value
        })
    }
    const selectFacultyChangeHandler = (evt)=>{
        setNewObject({
            ...newObject,
            facultyId: evt.value
        })
    }

    const addHandle = ()=>{
        if(newObject.name===""||newObject.shortName===""||newObject.rankId===undefined||newObject.facultyId===undefined){
            toast.error("Herhangi bir alan bos birakilamaz!");
        }else{
            axios.post(api.teacher.add,newObject)
            toast.success("Basariyla eklendi!")
        }
    }
    return (
        <div className="teachers">
            <h1 className="title title-xlg">
                Eğitmenler
                <hr/>
            </h1>
            <div className="teachers-wrapper">
                <div className="add-table container">
                    <div className="add">
                        <h2 className="title title-lg">Eğitmen Ekle</h2>
                        <form onSubmit={(event)=>event.preventDefault()}>
                            <div className="input-group">
                                <span className="title title-sm">Unvanı</span>
                                <Select options={rankOptions} className="react-select-container" onChange={selectRankChangeHandler}/>
                            </div>
                            <div className="input-group">
                                <span className="title title-sm">Adı Soyadi</span>
                                <input type="text" name="name" value={newObject.name} onChange={handleChange}/>
                            </div>

                            <div className="input-group">
                                <span className="title title-sm">Kısa Adı</span>
                                <input type="text" name="shortName" value={newObject.shortName} onChange={handleChange}/>
                            </div>
                            <div className="input-group">
                                <span className="title title-sm">Fakültesi</span>
                                <Select options={facultyOptions} className="react-select-container" onChange={selectFacultyChangeHandler}/>
                            </div>
                            <button className="btn btn-md btn-blue" onClick={addHandle}>Ekle</button>
                        </form>
                    </div>
                </div>
                <div className="teachers-table container">
                    <div className="teachers-table-wrapper">
                        <h2 className="title title-lg">Eğitmenler</h2>
                        <table>
                            <tr>
                                <th>Unvanı</th>
                                <th>Tam Adı</th>
                                <th>Kısa Adı</th>
                                <th>Fakültesi</th>
                            </tr>
                            {teachers.map((teacher)=> <TeachersTR teacher={teacher}/>)}
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Teachers;