import React from 'react';

function TableTr({data}) {
    return (
        <tr>
            {data.map((e)=> <td>{e}</td>)}
        </tr>
    );
}

export default TableTr;