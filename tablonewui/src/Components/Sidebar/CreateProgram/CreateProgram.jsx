import React from "react";
import CreateProgramInProcess from "./CreateProgramInProcess";
import { useDispatch, useSelector } from "react-redux";
import { creatingMode } from "../../../Redux/Actions/actions";
import toast from "react-hot-toast";

function CreateProgram({ isInProcess }) {
  const dispatch = useDispatch();
  if (isInProcess) return <CreateProgramInProcess />;
  else
    return (
      <div className="create-program">
        <button
          className="btn btn-md btn-green"
          onClick={() => {
            dispatch(creatingMode.enable());
            toast.success("Program oluşturma moduna geçildi.");
          }}
        >
          Yeni Program Oluştur
        </button>
      </div>
    );
}

export default CreateProgram;
