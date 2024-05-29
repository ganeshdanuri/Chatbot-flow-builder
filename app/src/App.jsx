import { useState } from "react";
import Flow from "./components/Flow";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import { AppContext } from "./context/AppContext";
import "./App.css";
import { useEdgesState, useNodesState } from "reactflow";

function App() {
  const [nodes, setNodes] = useNodesState([]);
  const [edges, setEdges] = useEdgesState([]);
  const [activeTab, setActiveTab] = useState("panel");
  const [selectedNode, setSelectedNode] = useState("");
  const [editedNode, setEditedNode] = useState({});
  const [error, setError] = useState(""); // for now connected error

  const handleSave = () => {
    if (editedNode.id) {
      setNodes((prevNodes) => {
        const updatedNodes = prevNodes.map((node) => {
          if (node.id === editedNode.id) {
            return {
              ...node,
              data: {
                label: editedNode.label,
              },
            };
          }
          return node; // if not edited. return as it is
        });

        return updatedNodes;
      });
      // Reset After Saving
      setEditedNode({});
      setActiveTab("panel");
    }

    // Validating edges connections on save button click
    if (edges && nodes) {
      setError(""); // reset on every validation
      const connectedIds = new Set();
      edges.forEach((edge) => {
        connectedIds.add(edge.source);
        connectedIds.add(edge.target);
      });

      for (let i = 0; i < nodes.length; i++) {
        if (!connectedIds.has(nodes[i].id)) {
          setError("Not connected");
          break;
        }
      }
    }
  };

  return (
    <div className="main-container">
      <AppContext.Provider
        value={{
          activeTab,
          selectedNode,
          editedNode,
          setEditedNode,
          handleSave,
          setNodes,
          nodes,
          edges,
          setEdges,
        }}
      >
        <nav>
          <Header error={error} />
        </nav>
        <div className="content-container">
          <Flow setActiveTab={setActiveTab} setSelectedNode={setSelectedNode} />
          <Sidebar setActiveTab={setActiveTab} />
        </div>
      </AppContext.Provider>
    </div>
  );
}

export default App;
