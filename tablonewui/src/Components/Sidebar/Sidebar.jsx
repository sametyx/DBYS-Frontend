import React, { useState } from "react";
import Section from "./Section";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBook,
  faCalendarPlus,
  faClock,
  faGear,
  faTimeline,
  faToolbox,
} from "@fortawesome/free-solid-svg-icons";
import Lessons from "./Lessons/Lessons";
import CreateProgram from "./CreateProgram/CreateProgram";
import { useSelector } from "react-redux";
import History from "./History/History";
import StatusBar from "./StatusBar/StatusBar";

function Sidebar() {
  const creatingMode = useSelector((state) => state.creatingMode);
  return (
    <div className="sidebar-wrapper">
      <div className="title">
        <FontAwesomeIcon icon={faToolbox} className="icon" />
        <span>Araçlar</span>
      </div>
      <ul className="sections">
        <Section title="Dersler" icon={<FontAwesomeIcon icon={faBook} />}>
          <Lessons />
        </Section>
        <Section
          title="Program Oluştur"
          icon={<FontAwesomeIcon icon={faCalendarPlus} />}
        >
          <CreateProgram isInProcess={creatingMode} />
        </Section>
        {creatingMode && (
          <Section
            icon={<FontAwesomeIcon icon={faClock} />}
            title="İşlem Geçmişi"
          >
            <History />
          </Section>
        )}
      </ul>
      <StatusBar />
    </div>
  );
}

export default Sidebar;
