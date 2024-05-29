import React, { memo } from "react";
import { Handle, Position } from "reactflow";

const MessageNode = memo(({ data, isConnectable }) => {
  return (
    <div className="message-custom-node">
      <Handle
        type="target"
        position={Position.Left}
        style={{ background: "#555" }}
        isConnectable={isConnectable}
      />
      <div className="send-message-title">
        <span>Send Message</span>
      </div>
      <div className="send-message-label">
        <span>{data.label}</span>
      </div>
      <Handle
        type="source"
        position={Position.Right}
        id="b"
        style={{ background: "#555" }}
        isConnectable={isConnectable}
      />
    </div>
  );
});

export default MessageNode;
