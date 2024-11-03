import React from "react";
import "../../../CSS/components/_cellTools.scss";
import { faPen, faTrash, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function CellTools({
  setEvent,
  setIsModalOpen,
  isModalOpen,
  selectedCell,
  setSelectedCell,
  data,
}) {
  return (
    <div className="cell-tools">
      <div
        className="cell-tool remove"
        onClick={() => {
          setIsModalOpen(true);
          setEvent(2);
          setSelectedCell(data);
        }}
      >
        <FontAwesomeIcon icon={faTrash} />
      </div>
      <div
        className="cell-tool edit"
        onClick={() => {
          setIsModalOpen(true);
          setEvent(1);
          setSelectedCell(data);
        }}
      >
        <FontAwesomeIcon icon={faPen} />
      </div>
    </div>
  );
}

export default CellTools;
