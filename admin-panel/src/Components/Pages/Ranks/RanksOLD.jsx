import React, {useEffect, useState} from 'react';
import Select from "react-select";
import profile from "../../../Images/unknown-profile.jpeg";
import axios from "axios";
import api from "../../../apiURL";
import RanksTR from "./RanksTR";
import toast from "react-hot-toast";

function RanksOLD() {
    const [ranks,setRanks] = useState([])
    const [newObject,setNewObject] = useState({
        name:"",
        shortName:""
    })
    const getAllRanks= ()=>{
        axios.get(api.rank.getAll)
            .then(res=> {
                setRanks(res.data);
            })
    }
    useEffect(() => {
        getAllRanks()
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

    const addHandle = ()=>{
        if(newObject.name===""||newObject.shortName===""){
            toast.error("Herhangi bir alan bos birakilamaz!");
        }else{
            axios.post(api.rank.add,newObject)
            toast.success("Basariyla eklendi!")
        }
    }

    return (
        <div className="ranks">
            <h1 className="title title-xlg">
                Unvanlar
                <hr/>
            </h1>
            <div className="ranks-wrapper">
                <div className="add-table container">
                    <div className="add">
                        <h2 className="title title-lg">Unvan Ekle</h2>
                        <form onSubmit={(event)=>event.preventDefault()}>
                            <div className="input-group">
                                <span className="title title-sm">Unvan Adi</span>
                                <input type="text" name="name" value={newObject.name} onChange={handleChange}/>
                            </div>
                            <div className="input-group">
                                <span className="title title-sm">Kisa Ad</span>
                                <input type="text" name="shortName" value={newObject.shortName} onChange={handleChange}/>
                            </div>
                            <button className="btn btn-md btn-blue" onClick={addHandle}>Ekle</button>
                        </form>
                    </div>
                </div>
                <div className="ranks-table container">
                    <div className="ranks-table-wrapper">
                        <h2 className="title title-lg">Unvanlar</h2>
                        <table>
                            <tr>
                                <th>Ad</th>
                                <th>Kisa Ad</th>
                            </tr>
                            {ranks.map(rank=> <RanksTR rank={rank}/>)}
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RanksOLD;