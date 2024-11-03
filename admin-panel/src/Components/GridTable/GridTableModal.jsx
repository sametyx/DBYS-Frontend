import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faCircleChevronRight,
} from "@fortawesome/free-solid-svg-icons";

function GridTableModal({ children, isModalOpen, setIsModalOpen }) {
  return (
    <div className="grid-table-modal">
      <div className="slide" onClick={() => setIsModalOpen(false)}>
        <FontAwesomeIcon icon={faChevronRight} />
      </div>
      <div className="grid-table-modal-wrapper">{children}</div>
    </div>
  );
}

export default GridTableModal;
