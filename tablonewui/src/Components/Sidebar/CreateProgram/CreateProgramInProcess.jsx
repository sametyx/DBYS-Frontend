import React, { useEffect, useState } from "react";
import DatePicker from "react-date-picker";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import Modal from "../../Modal/Modal";
import ProgramSelectorModal from "./ProgramSelectorModal";
import { useDispatch, useSelector } from "react-redux";
import {
  approveModal,
  clearTable,
  createNewProgram,
  creatingMode,
  fetchCourseProgram,
  fetchCourseProgramById,
  modal,
  set_week,
  set_week_readable,
  setProgramsToBeAdded,
} from "../../../Redux/Actions/actions";
import toast from "react-hot-toast";
import ApproveModal from "../../Modal/ApproveModal";

function CreateProgramInProcess() {
  const [value, onChange] = useState(new Date());
  const [formattedDate, setFormattedDate] = useState("");
  const [selectedProgram, setSelectedProgram] = useState(undefined);
  const { readable: weekReadable } = useSelector((state) => state.week);
  const dispatch = useDispatch();
  useEffect(() => {
    const day = String(value.getDate()).padStart(2, "0");
    const month = String(value.getMonth() + 1).padStart(2, "0"); //
    const year = value.getFullYear();

    setFormattedDate(`${day}-${month}-${year}`);
  }, [value]);

  const sendForApprovalClickHandler = () => {
    const message = "Hazırlanan program onaya gönderilecek, onaylıyor musun?";
    const approveFunc = () => {
      dispatch(createNewProgram(formattedDate));
      dispatch(fetchCourseProgram(formattedDate));
    };
    dispatch(
      modal.show(
        <ApproveModal message={message} approveFunc={approveFunc} />,
        "ONAY",
      ),
    );
  };

  const applyClickHandler = () => {
    const message =
      "Seçilen program tabloya uygulanırken aynı zamanda tabloda yapılan değişiklikler de sıfırlanacak, onaylıyor musun?";
    const approveFunc = () => {
      if (selectedProgram) {
        if (weekReadable === selectedProgram.date.replace(/-/g, ".")) {
          toast.error("Zaten mevcut program tabloda.");
        } else {
          dispatch(fetchCourseProgramById(selectedProgram.id));
          dispatch(setProgramsToBeAdded.reset());
          toast.success("Tabloya seçilen program uygulandı.");
        }
      } else toast.error("Lütfen bir program seçin.");
    };
    dispatch(
      modal.show(
        <ApproveModal message={message} approveFunc={approveFunc} />,
        "ONAY",
      ),
    );
  };

  return (
    <div className="create-program in-process">
      <div className="card">
        <label htmlFor="program-selector">Mevcut bir programı getir:</label>
        <div
          className="program-selector"
          style={{ backgroundColor: selectedProgram && "#a0ff8b" }}
          onClick={() =>
            dispatch(
              modal.show(
                <>
                  <ProgramSelectorModal
                    setSelectedProgram={setSelectedProgram}
                  />
                </>,
                "Program Seçme",
              ),
            )
          }
        >
          {selectedProgram ? (
            <span className="selected-program">{selectedProgram.date}</span>
          ) : (
            "Bir program seçmek için tıklayın"
          )}
        </div>
        <button className="btn btn-md btn-blue" onClick={applyClickHandler}>
          Tabloya Uygula
        </button>
        <button
          className="btn btn-md btn-red"
          onClick={() => {
            const message = "Tablo sıfırlanacak, onaylıyor musun?";
            const approveFunc = () => {
              dispatch(clearTable());
              toast.success("Tablo sıfırlandı.");
            };
            dispatch(
              modal.show(
                <ApproveModal message={message} approveFunc={approveFunc} />,
                "ONAY",
              ),
            );
          }}
        >
          Tabloyu Sıfırla
        </button>
      </div>
      <div className="options">
        <span>Programın yayına gireceği tarih:</span>
        <DatePicker
          onChange={onChange}
          value={value}
          className="date-pick"
          format="dd/MM/yy"
        />
      </div>
      <div className="buttons">
        <button
          className="btn btn-md btn-green"
          onClick={sendForApprovalClickHandler}
        >
          Onaya Gönder
        </button>
        <button
          className="btn btn-md btn-red"
          onClick={() => {
            const message = "Değişiklikler kaydedilmeyecek, onaylıyor musun?";
            const approveFunc = () => {
              toast.error("Değişiklikler kaydedilmedi.");
              toast.success("Oluşturma modundan çıkıldı.");
              dispatch(creatingMode.disable());
              dispatch(setProgramsToBeAdded.reset());
              dispatch(fetchCourseProgram(weekReadable));
            };
            dispatch(
              modal.show(
                <ApproveModal message={message} approveFunc={approveFunc} />,
                "ONAY",
              ),
            );
          }}
        >
          Vazgeç
        </button>
      </div>
    </div>
  );
}

export default CreateProgramInProcess;
