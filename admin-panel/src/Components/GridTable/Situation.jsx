import React from "react";

function Situation({ sit }) {
  const sitStyle = {
    position: "absolute",
    top: "0",
    right: "0",
    margin: "0.5rem",
    padding: "0.2rem 0.5rem",
    border: sit ? ".1rem solid #8FBC8B" : ".1rem solid #bc8b8b",
    display: "flex",
    alignItems: "center",
    columnGap: "0.5rem",
    borderRadius: "1rem",
    fontSize: "1.2rem",
  };

  const ballStyle = {
    width: "1rem",
    height: "1rem",
    backgroundColor: sit ? "green" : "red",
    borderRadius: "50%",
  };

  return (
    <div className="sit" style={sitStyle}>
      <div className="ball" style={ballStyle}></div>
      <span>{sit ? "Aktif" : "Pasif"}</span>
    </div>
  );
}

export default Situation;
