import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPen, faXmark} from "@fortawesome/free-solid-svg-icons";
import toast from "react-hot-toast";
import axios from "axios";
import api from "../apiURL";

function Tools({isToolsOpen,isDeleteOpen,isEditOpen,setIsEditOpen,setIsDeleteOpen,setIsToolsOpen,section}) {
    const deleteHandler = ()=>{
        switch (section.page){
            case 0:
                axios.delete(api.faculty.delete(section.selectedElementID))
                    .then(()=> toast.success("Silme Basarili!"))
                    .catch(err=> toast.error("Bir hata meydana geldi."))
                break;
            case 1:
                axios.delete(api.lesson.delete(section.selectedElementID))
                    .then(()=> toast.success("Silme Basarili!"))
                    .catch(err=> toast.error("Bir hata meydana geldi."))
                break;
            case 2:
                axios.delete(api.teacher.delete(section.selectedElementID))
                    .then(()=> toast.success("Silme Basarili!"))
                    .catch(err=> toast.error("Bir hata meydana geldi."))
                break;
            case 3:
                axios.delete(api.department.delete(section.selectedElementID))
                    .then(()=> toast.success("Silme Basarili!"))
                    .catch(err=> toast.error("Bir hata meydana geldi."))
                break;
            case 4:
                axios.delete(api.rank.delete(section.selectedElementID))
                    .then(()=> toast.success("Silme Basarili!"))
                    .catch(err=> toast.error("Bir hata meydana geldi."))
                break;
            case 5:
                axios.delete(api.classroom.delete(section.selectedElementID))
                    .then(()=> toast.success("Silme Basarili!"))
                    .catch(err=> toast.error("Bir hata meydana geldi."))
                break;

        }
        setIsDeleteOpen(false)
        setIsToolsOpen(false)
    }

    const changeHandler= ()=>{
        switch (section.page){
            case 0:
                axios.put(api.faculty.update, {id:section.selectedElementID,name:section.changes.name,shortName:section.changes.shortName})
                    .then(()=> toast.success("Degistirme basarili!"))
                    .catch(err=> toast.error("Bir hata meydana geldi."))
                break;
            case 1:
                axios.put(api.lesson.update, section.changes)
                    .then(()=> toast.success("Degistirme basarili!"))
                    .catch(err=> toast.error("Bir hata meydana geldi."))
                break;
            case 2:
                axios.put(api.teacher.update, section.changes)
                    .then(()=> toast.success("Degistirme basarili!"))
                    .catch(err=> toast.error("Bir hata meydana geldi."))
                break;
            case 3:
                axios.put(api.department.update, section.changes)
                    .then(()=> toast.success("Degistirme basarili!"))
                    .catch(err=> toast.error("Bir hata meydana geldi."))
                break;
            case 4:
                axios.put(api.rank.update, section.changes)
                    .then(()=> toast.success("Degistirme basarili!"))
                    .catch(err=> toast.error("Bir hata meydana geldi."))
                break;
            case 5:
                axios.put(api.classroom.update, section.changes)
                    .then(()=> toast.success("Degistirme basarili!"))
                    .catch(err=> toast.error("Bir hata meydana geldi."))
                break;

        }
        setIsEditOpen(false)
        setIsToolsOpen(false)
    }



    return (
        <>
            {isToolsOpen ? <div className="tools" onMouseEnter={()=> setIsToolsOpen(true)} onMouseLeave={()=> !(isEditOpen||isDeleteOpen) ? setIsToolsOpen(false):""}>
                {!(isEditOpen||isDeleteOpen) ? (
                    <>
                        <FontAwesomeIcon icon={faPen} className="toolIcon" onClick={()=> {
                            setIsEditOpen(true)
                        }}/>
                        <FontAwesomeIcon icon={faXmark} className="toolIcon" onClick={()=> {
                            setIsDeleteOpen(true)
                        }}/>
                    </>
                ):""}
                {isEditOpen ? (
                    <div className="alert">
                        <button className="btn btn-sm btn-green" onClick={changeHandler}>Değişiklikleri Kaydet</button>
                        <button className="btn btn-sm btn-red" onClick={()=>{
                            setIsEditOpen(false)
                            setIsToolsOpen(false)
                            toast.error("Değişiklikler kaydedilmedi.")
                        }}>Vazgeç</button>
                    </div>
                ) : ""}
                {isDeleteOpen ? (
                    <div className="alert">
                        <span className="title-sm">Bu satır silinecek, onaylıyor musun?</span>
                        <button className="btn btn-sm btn-red" onClick={deleteHandler}>Sil</button>
                        <button className="btn btn-sm btn-red" onClick={() => {
                            setIsDeleteOpen(false)
                            setIsToolsOpen(false)
                            toast.error("Değişiklikler kaydedilmedi.")
                        }}>Vazgeç</button>
                    </div>
                ) : ""}
            </div> : ""}</>
    );
}

export default Tools;