import React, { useState } from 'react';

const DragTry = () => {
    const [draggedItem, setDraggedItem] = useState(null);

    const handleDragStart = (e, item) => {
        setDraggedItem(item);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDrop = (e) => {
        e.preventDefault();
        // Burada bırakılan öğeyi işleyebilirsiniz.
        console.log('Bırakılan öğe:', draggedItem);
        setDraggedItem(null);
    };

    return (
        <div>
            <div
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                style={{ border: '1px solid black', padding: '20px', minHeight: '200px' }}
            >
                <h2>Buraya sürükleyip bırakın</h2>
                {/* Sürüklenen öğe */}
                {draggedItem && <p>{draggedItem}</p>}
            </div>
            <div
                draggable
                onDragStart={(e) => handleDragStart(e, 'Sürüklenen Öğe')}
                style={{ marginTop: '20px', padding: '10px', border: '1px solid black' }}
            >
                Sürüklenen Öğe
            </div>
        </div>
    );
};

export default DragTry;
