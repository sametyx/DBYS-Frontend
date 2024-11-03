import React, {useEffect, useRef, useState} from 'react';

function Department({department}) {
    const [isDetailOpen,setIsDetailOpen] = useState(false)

    return (
        <div className="department" onMouseEnter={()=>setIsDetailOpen(true)} onMouseLeave={()=>setIsDetailOpen(false)}>
            <span style={{visibility:isDetailOpen ? "visible":"hidden",opacity:isDetailOpen ? "1":"0"}} className="detail">{department.Name}</span>
            <label style={{backgroundColor:department.Color}} className="colored-box"></label>
            <span>{department.ShortName}</span>
        </div>
    );
}

export default Department;