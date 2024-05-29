import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import BackArrowSVG from "/back.svg";

const Settings = ({ setActiveTab }) => {
  const { selectedNode, setEditedNode } = useContext(AppContext);
  const [value, setValue] = useState("");

  useEffect(() => {
    if (selectedNode?.id) {
      setValue(selectedNode.data.label);
    }
  }, [selectedNode]);

  const handleChage = (e) => {
    setValue(e.target.value);
    setEditedNode({
      id: selectedNode.id,
      label: e.target.value,
    });
  };

  return (
    <div className="settings-container">
      <div className="d-flex title-container">
        <img
          onClick={() => setActiveTab("panel")}
          src={BackArrowSVG}
          className="back-arrow"
        />
        <p className="title">Message</p>
      </div>
      <div className="text-area-container">
        <p>Text</p>
        <textarea className="text-area" onChange={handleChage} value={value} />
      </div>
    </div>
  );
};

export default Settings;
