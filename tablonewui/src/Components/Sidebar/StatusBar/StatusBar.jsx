import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";

function StatusBar() {
  return (
    <div className="status-bar">
      <div className="warnings">
        <FontAwesomeIcon icon={faCircleExclamation} className="icon" />
        <span className="num">0</span>
      </div>
    </div>
  );
}

export default StatusBar;
