import React, {useEffect, useState} from 'react';
import Select from 'react-select'
import profile from "../../../Images/unknown-profile.jpeg"
import LessonsTR from "./LessonsTR";
import axios from "axios";
import api from "../../../apiURL";
import toast from "react-hot-toast";

function LessonsOLD() {
    const [lessons,setLessons] = useState([])
    const [teachers,setTeachers] = useState([])
    const [departments,setDepartments] = useState([])
    const [teacherOptions,setTeacherOptions] = useState([])
    const [departmentOptions,setDepartmentOptions] = useState([])

    const getAllLessons = ()=>{
        axios.get(api.lesson.getAll)
            .then(res=>{
                setLessons(res.data)
            })
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

    useEffect(()=>{
        getAllTeachers()
        getAllDepartment()
        getAllLessons()
    }, []);
    const [newObject,setNewObject] = useState({
        name: "",
        shortName:"",
        capacity: undefined,
        teacherId: undefined,
        departmentId: undefined
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

    const selectTeacherHandler = (evt)=>{
        setNewObject({
            ...newObject,
            teacherId: evt.value
        })
    }
    const selectDepartmentHandler = (evt)=>{
        setNewObject({
            ...newObject,
            departmentId: evt.value
        })
    }

    const addHandle = ()=>{
        if(newObject.name===""||newObject.shortName===""||newObject.capacity===undefined||newObject.teacherId===undefined||newObject.departmentId===undefined){
            toast.error("Herhangi bir alan bos birakilamaz!");
        }else{
            axios.post(api.lesson.add,newObject)
            toast.success("Basariyla eklendi!")
            getAllLessons()
        }
    }

    return (
        <div className="lessons">
            <h1 className="title title-xlg">
                Dersler
                <hr/>
            </h1>
            <div className="lessons-wrapper">
                <div className="add-table container">
                    <div className="add">
                        <h2 className="title title-lg">Ders Ekle</h2>
                        <form onSubmit={(event)=>event.preventDefault()}>
                            <div className="input-group">
                                <span className="title title-sm">Ders Adı</span>
                                <input type="text" name="name" value={newObject.name} onChange={handleChange}/>
                            </div>
                            <div className="input-group">
                                <span className="title title-sm">Ders Kisa Adı</span>
                                <input type="text" name="shortName" value={newObject.shortName} onChange={handleChange}/>
                            </div>
                            <div className="input-group">
                                <span className="title title-sm">Dersi Alan Kişi Sayısı</span>
                                <input type="number" name="capacity" value={newObject.capacity} onChange={handleChange}/>
                            </div>
                            <div className="input-group">
                                <span className="title title-sm">Dersin Eğitmeni</span>
                                <Select options={teacherOptions} className="react-select-container" onChange={selectTeacherHandler} name="teacherId"/>
                            </div>
                            <div className="input-group">
                                <span className="title title-sm">Dersin Bölümü</span>
                                <Select options={departmentOptions} className="react-select-container" onChange={selectDepartmentHandler} name="teacherId"/>
                            </div>
                            <button className="btn btn-md btn-blue" onClick={addHandle}>Ekle</button>
                        </form>
                    </div>
                </div>
                <div className="lessons-table container">
                    <div className="lessons-table-wrapper">
                        <h2 className="title title-lg">Dersler</h2>
                        <table>
                            <tr>
                                <th>Ad</th>
                                <th>Kisa Ad</th>
                                <th className="number-column">Kişi Sayısı</th>
                                <th className="table-teacher-head">Eğitmen</th>
                                <th>Bölümü</th>
                            </tr>
                            {lessons.map(lesson=> <LessonsTR lesson={lesson}/>)}
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LessonsOLD;