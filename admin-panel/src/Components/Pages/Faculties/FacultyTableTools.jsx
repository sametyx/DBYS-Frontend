import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPen,faXmark} from "@fortawesome/free-solid-svg-icons";

function FacultyTableTools() {
    return (
        <td>
            <FontAwesomeIcon icon={faPen} className="toolIcon"/>
            <FontAwesomeIcon icon={faXmark} className="toolIcon"/>
        </td>
    );
}

export default FacultyTableTools;