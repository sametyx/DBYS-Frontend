import React, {useEffect, useState} from 'react';
import Select from "react-select";
import axios from "axios";
import api from "../../../apiURL";
import ClassroomsTR from "./ClassroomsTR";
import toast from "react-hot-toast";

function Classrooms() {
    const [classrooms,setClassrooms] = useState([])
    const [faculties,setFaculties] = useState([])
    const [options,setOptions] = useState([])
    const [newObject,setNewObject] = useState({
        name: "",
        examCapacity:undefined,
        capacity: undefined,
        facultyId: undefined,
        planUrl: "http"
    })

    const getAllClassrooms= ()=>{
        axios.get(api.classroom.getAll)
            .then(res=> {
                setClassrooms(res.data);
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
        getAllClassrooms()
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
        if(newObject.name===""||newObject.planUrl===""||newObject.capacity===undefined||newObject.examCapacity===undefined||newObject.facultyId===undefined){
            toast.error("Herhangi bir alan bos birakilamaz!");
        }else{
            axios.post(api.classroom.add,newObject)
            toast.success("Basariyla eklendi!")
        }
    }

    return (
        <div className="classrooms">
            <h1 className="title title-xlg">
                Derslikler
                <hr/>
            </h1>
            <div className="classrooms-wrapper">
                <div className="add-table container">
                    <div className="add">
                        <h2 className="title title-lg">Unvan Ekle</h2>
                        <form onSubmit={(event)=>event.preventDefault()}>
                            <div className="input-group">
                                <span className="title title-sm">Derslik Adi</span>
                                <input type="text" name="name" value={newObject.name} onChange={handleChange}/>
                            </div>
                            <div className="input-group">
                                <span className="title title-sm">Kapasite</span>
                                <input type="number" name="capacity" value={newObject.capacity} onChange={handleChange}/>
                            </div>
                            <div className="input-group">
                                <span className="title title-sm">Sinav Kapasitesi</span>
                                <input type="number" name="examCapacity" value={newObject.examCapacity} onChange={handleChange}/>
                            </div>
                            <div className="input-group">
                                <span className="title title-sm">Fakülte</span>
                                <Select options={options} className="react-select-container" onChange={selectChangeHandler}/>
                            </div>

                            <div className="input-group">
                                <span className="title title-sm">Derslik Plani</span>
                                <input type="file" id="files" value="" title=" "/>
                            </div>
                            <button className="btn btn-md btn-blue" onClick={addHandle}>Ekle</button>
                        </form>
                    </div>
                </div>
                <div className="classrooms-table container">
                    <div className="classrooms-table-wrapper">
                        <h2 className="title title-lg">Derslikler</h2>
                        <table>
                            <tr>
                                <th>Ad</th>
                                <th className="number-column">Kapasite</th>
                                <th className="number-column">Sinav Kapasitesi</th>
                                <th>Fakülte</th>
                                <th>Derslik Plani</th>
                            </tr>
                            {classrooms.map(classroom => <ClassroomsTR classroom={classroom}/>)}
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Classrooms;