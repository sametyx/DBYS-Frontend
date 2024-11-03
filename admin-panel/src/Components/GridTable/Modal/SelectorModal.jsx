import React from "react";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function SelectorModal({ children, closer }) {
  return (
    <div className="selector-modal">
      {children}{" "}
      <FontAwesomeIcon
        icon={faXmark}
        className="closer"
        onClick={() => closer(false)}
      />
    </div>
  );
}

export default SelectorModal;
