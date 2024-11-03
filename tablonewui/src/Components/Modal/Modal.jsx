import React from "react";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch } from "react-redux";
import { modal } from "../../Redux/Actions/actions";

function Modal({ content, title }) {
  const dispatch = useDispatch();
  return (
    <>
      <div
        className="modal-overlay"
        onClick={() => dispatch(modal.unshow())}
      ></div>
      <div className="modal">
        <div className="modal-header">
          <h1 className="title">{title}</h1>
          <i
            className="bi bi-x close-icon"
            onClick={() => dispatch(modal.unshow())}
          ></i>
        </div>
        <div className="content">{content}</div>
      </div>
    </>
  );
}

export default Modal;
