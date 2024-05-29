import React, { useContext, useState } from "react";
import NodePanel from "./NodePanel";
import Settings from "./Settings";
import { AppContext } from "../context/AppContext";

const Sidebar = ({ setActiveTab }) => {
  const { activeTab } = useContext(AppContext);
  return (
    <div className="sidebar-container">
      {activeTab === "panel" ? (
        <NodePanel />
      ) : (
        <Settings setActiveTab={setActiveTab} />
      )}
    </div>
  );
};

export default Sidebar;
