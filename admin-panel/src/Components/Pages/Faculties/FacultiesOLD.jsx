import React, {useEffect, useState} from 'react';
import FacultyTR from "./FacultyTR";
import {faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import axios from "axios";
import api from "../../../apiURL";
import toast from "react-hot-toast";
import Table from "../../Table";

function FacultiesOLD() {
    const [faculties, setFaculties] = useState([])
    const [newObject, setNewObject] = useState({
        name: "",
        shortName: ""
    })
    const columns = new Map([
        ["Fakülte Kısa Ad","shortName"],
        ["Fakülte Ad","name"],
        ["Durum","isActive"]
    ])

    const getAllFaculties = () => {
        axios.get(api.faculty.getAll, {
            params: {
                PageNumber: 1,
                PageSize: 5
            }
        })
            .then(res => {
                setFaculties(res.data);
            })
    }

    useEffect(() => {
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

    const addHandle = () => {
        if (newObject.name === "" || newObject.shortName === "") {
            toast.error("Herhangi bir alan bos birakilamaz!");
        } else {
            axios.post(api.faculty.add, newObject)
            toast.success("Basariyla eklendi!")
            setFaculties((prevState) => [...prevState, {
                name: newObject.name,
                shortName: newObject.shortName,
                isActive: true
            }])
        }

    }

    return (
        <div className="faculties">
            <h1 className="title title-xlg">
                Fakülteler
                <hr/>
            </h1>
            <div className="faculties-wrapper">
                <div className="add-table container">
                    <div className="add">
                        <h2 className="title title-lg">Fakülte Ekle</h2>
                        <form onSubmit={(event) => event.preventDefault()}>
                            <div className="input-group">
                                <span className="title title-sm">Fakülte Adı</span>
                                <input type="text" name="name" value={newObject.name} onChange={handleChange}/>
                            </div>
                            <div className="input-group">
                                <span className="title title-sm">Fakülte Kısa Adı</span>
                                <input type="text" name="shortName" value={newObject.shortName}
                                       onChange={handleChange}/>
                            </div>
                            <button className="btn btn-md btn-blue" onClick={addHandle}>Ekle</button>
                        </form>
                    </div>
                    <div className="table"></div>
                </div>
                <div className="faculties-table container">
                    <div className="faculties-table-wrapper">
                        <h2 className="title title-lg">Fakülteler</h2>

                        <Table columns={columns} data={faculties}/>
                        {/*<table draggable>
                            <tr>
                                <th>
                                    <span>Fakülte Kısa Ad</span>
                                    <FontAwesomeIcon icon={faMagnifyingGlass} className="searchIcon"/>
                                </th>
                                <th>
                                    <span>Fakülte Ad</span>
                                    <FontAwesomeIcon icon={faMagnifyingGlass} className="searchIcon"/>
                                </th>
                                <th>
                                    <span>Durum</span>
                                    <FontAwesomeIcon icon={faMagnifyingGlass} className="searchIcon"/>
                                </th>
                            </tr>
                            {faculties.map(faculty => <FacultyTR faculty={faculty}/>)}
                        </table>*/}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FacultiesOLD;