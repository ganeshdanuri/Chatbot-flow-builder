import React from "react";
import MessageSVG from "/comment-alt.svg";

const NodePanel = () => {
  const onDragStart = (event, nodeType) => {
    // nodeType - Identity which type of node is dragged

    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div>
      <div
        onDragStart={(event) => onDragStart(event, "message")}
        draggable
        className="message-node"
      >
        <img src={MessageSVG} alt="message" />
        Message
      </div>
    </div>
  );
};

export default NodePanel;
