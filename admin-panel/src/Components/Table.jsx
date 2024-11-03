import React from 'react';
import TableTR from "./TableTR";

function Table({columns,data}) {
    const columnName=Array.from(columns.keys());
    const columnDataName=Array.from(columns.values());
    const editedData = data.map(item => {
        const newItem = [];
        columnDataName.forEach(key => {
            if (item.hasOwnProperty(key)) {
                newItem.push(item[key]);
            }else{
                newItem.push("Invalid data")
            }
        });
        return newItem;
    });
    console.log(editedData)
    return (
        <table>
            <thead>
                <tr>
                    {columnName.map((e)=> <th>{e}</th>)}
                </tr>
            </thead>
            <tbody>
                {editedData.map((e)=> <TableTR data={e}/>)}
            </tbody>
        </table>
    );
}

export default Table;