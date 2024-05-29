import { useCallback, useContext, useState } from "react";
import ReactFlow, {
  Controls,
  Background,
  applyEdgeChanges,
  applyNodeChanges,
  useEdgesState,
  addEdge,
} from "reactflow";
import "reactflow/dist/style.css";
import { v4 as uuidv4 } from "uuid";
import { AppContext } from "../context/AppContext";
import MessageNode from "./MessageNode";

const nodeTypes = {
  message: MessageNode,
};

function Flow({ setActiveTab, setSelectedNode }) {
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const { setNodes, nodes, edges, setEdges } = useContext(AppContext);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  const onElementClick = (event, element) => {
    setSelectedNode(element);
    setActiveTab("settings"); // open settings onlick of node
  };

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const type = event.dataTransfer.getData("application/reactflow"); // get the data of dragged item

      if (typeof type === "undefined" || !type) {
        return;
      }

      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      let newNode;

      if (type === "message") {
        newNode = {
          id: uuidv4(),
          position,
          type,
          data: { label: `Test message 1` },
        };
      }

      if (newNode) {
        setNodes((nds) => nds.concat(newNode));
      }
    },
    [reactFlowInstance]
  );

  return (
    <div style={{ height: "100%", width: "75%" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        fitView
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onElementClick}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onInit={setReactFlowInstance}
        nodeTypes={nodeTypes}
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}

export default Flow;
