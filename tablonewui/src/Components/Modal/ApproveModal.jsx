import React from "react";
import Modal from "./Modal";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { modal } from "../../Redux/Actions/actions";

function ApproveModal({ message, approveFunc }) {
  const dispatch = useDispatch();
  return (
    <div className="approve-modal">
      <span>{message}</span>
      <div className="buttons">
        <button
          className="btn btn-sm btn-red"
          onClick={() => {
            dispatch(modal.unshow());
          }}
        >
          Vazgeç
        </button>
        <button
          className="btn btn-sm btn-green"
          onClick={() => {
            approveFunc();
            dispatch(modal.unshow());
          }}
        >
          Onayla
        </button>
      </div>
    </div>
  );
}

export default ApproveModal;
