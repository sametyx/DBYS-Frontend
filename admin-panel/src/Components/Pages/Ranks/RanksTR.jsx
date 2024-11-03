import React, {useState} from 'react';
import Tools from "../../Tools";

function RanksTr({rank}) {
    const [isToolsOpen,setIsToolsOpen] = useState(false)
    const [isEditOpen,setIsEditOpen] = useState(false)
    const [isDeleteOpen,setIsDeleteOpen] = useState(false)
    const [changes,setChanges] = useState({
        id:rank.id,
        name: rank.name,
        shortName:rank.shortName
    })
    const section = {
        page:4,
        selectedElementID:rank.id,
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
                <td>{isEditOpen ? <input type="text" value={changes.name} className="input-sm" name="name"
                                         onChange={handleChange}></input> : <span>{rank.name}</span>}</td>
                <td>{isEditOpen ? <input type="text" value={changes.shortName} className="input-sm" name="shortName"
                                         onChange={handleChange}></input> : <span>{rank.shortName}</span>}</td>
            </tr>
            <Tools isToolsOpen={isToolsOpen} setIsToolsOpen={setIsToolsOpen} isEditOpen={isEditOpen}
                   isDeleteOpen={isDeleteOpen} setIsEditOpen={setIsEditOpen} setIsDeleteOpen={setIsDeleteOpen} section={section}/>
        </>
    );
}

export default RanksTr;